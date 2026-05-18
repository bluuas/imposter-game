import { NextRequest, NextResponse } from "next/server";
import { createRoom } from "@/lib/roomStore";
import { getRandomWord } from "@/data/words";
import type { RoomPlayer } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

// POST /api/rooms — create a new room
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { playerName, playerEmoji, playerId, locale = "en", category } = body as {
      playerName: string;
      playerEmoji: string;
      playerId: string;
      locale?: Locale;
      category?: string;
    };

    if (!playerName || !playerEmoji || !playerId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const host: RoomPlayer = {
      id: playerId,
      name: playerName,
      emoji: playerEmoji,
      isHost: true,
      ready: false,
    };

    const room = await createRoom(host, locale);
    if (category) room.category = category;

    return NextResponse.json({ room }, { status: 201 });
  } catch (err: any) {
    // log the error server-side for diagnostics
    console.error("/api/rooms POST error:", err?.stack ?? err?.message ?? err);
    const message = err?.message ?? "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
