import redis from "./redis";
import type { Room, RoomPlayer } from "./types";

const ROOM_TTL = 60 * 60 * 2; // 2 hours

function roomKey(id: string) {
  return `room:${id}`;
}

export async function getRoom(id: string): Promise<Room | null> {
  const raw = await redis.get(roomKey(id));
  if (!raw) return null;
  return JSON.parse(raw) as Room;
}

export async function saveRoom(room: Room): Promise<void> {
  await redis.set(roomKey(room.id), JSON.stringify(room), "EX", ROOM_TTL);
}

export async function createRoom(hostPlayer: RoomPlayer, locale: string): Promise<Room> {
  const id = generateCode();
  const room: Room = {
    id,
    hostId: hostPlayer.id,
    players: [hostPlayer],
    phase: "lobby",
    votes: {},
    locale,
    createdAt: Date.now(),
  };
  await saveRoom(room);
  return room;
}

export async function updateRoom(
  id: string,
  updater: (room: Room) => Room
): Promise<Room | null> {
  const room = await getRoom(id);
  if (!room) return null;
  const updated = updater(room);
  await saveRoom(updated);
  return updated;
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous O/0/1/I
  return Array.from({ length: 3 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}
