import { NextRequest, NextResponse } from "next/server";
import { createRoom } from "@/lib/roomStore";
import { getRandomWord } from "@/data/words";
import type { RoomPlayer } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

// POST /api/rooms — create a new room
export async function POST(req: NextRequest) {
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
}
