import { NextRequest, NextResponse } from "next/server";
import { getRoom, updateRoom } from "@/lib/roomStore";
import { getRandomWord } from "@/data/words";
import type { Locale } from "@/lib/i18n";
import type { RoomPlayer } from "@/lib/types";

type Params = { params: Promise<{ id: string }> };

// GET /api/rooms/[id] — poll for current room state
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const room = await getRoom(id.toUpperCase());
    if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });
    return NextResponse.json({ room });
  } catch (err: any) {
    console.error(`/api/rooms/${(await params).id} GET error:`, err?.stack ?? err?.message ?? err);
    return NextResponse.json({ error: err?.message ?? "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/rooms/[id] — update room (join, start, ready, vote)
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action } = body as { action: string };

    const room = await updateRoom(id.toUpperCase(), (room) => {
    switch (action) {
      // ── Join ───────────────────────────────────────────────────────────────
      case "join": {
        const { player } = body as { player: RoomPlayer };
        if (room.phase !== "lobby") return room; // late join not allowed
        const exists = room.players.some((p) => p.id === player.id);
        if (!exists) room.players.push({ ...player, isHost: false, ready: false });
        return room;
      }

      // ── Leave ──────────────────────────────────────────────────────────────
      case "leave": {
        const { playerId } = body as { playerId: string };
        room.players = room.players.filter((p) => p.id !== playerId);
        return room;
      }

      // ── Start ──────────────────────────────────────────────────────────────
      case "start": {
        const { playerId } = body as { playerId: string };
        if (room.hostId !== playerId) return room;
        if (room.players.length < 3) return room;

        const locale = (room.locale ?? "en") as Locale;
        room.word = getRandomWord(room.category, locale);
        const imposterIndex = Math.floor(Math.random() * room.players.length);
        room.imposterId = room.players[imposterIndex].id;
        room.phase = "reveal";
        room.players = room.players.map((p) => ({ ...p, ready: false }));
        return room;
      }

      // ── Ready (done reading reveal card) ──────────────────────────────────
      case "ready": {
        const { playerId } = body as { playerId: string };
        room.players = room.players.map((p) =>
          p.id === playerId ? { ...p, ready: true } : p
        );
        // Advance to vote when everyone is ready
        if (room.players.every((p) => p.ready)) {
          room.phase = "vote";
        }
        return room;
      }

      // ── Vote ───────────────────────────────────────────────────────────────
      case "vote": {
        const { voterId, targetId } = body as { voterId: string; targetId: string };
        room.votes[voterId] = targetId;
        // Advance to result when everyone has voted
        if (Object.keys(room.votes).length >= room.players.length) {
          room.phase = "result";
        }
        return room;
      }

      default:
        return room;
    }
  });

    if (!room) return NextResponse.json({ error: "Room not found" }, { status: 404 });
    return NextResponse.json({ room });
  } catch (err: any) {
    console.error(`/api/rooms/${(await params).id} PATCH error:`, err?.stack ?? err?.message ?? err);
    return NextResponse.json({ error: err?.message ?? "Internal server error" }, { status: 500 });
  }
}
