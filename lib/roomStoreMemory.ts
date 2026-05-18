import type { Room, RoomPlayer } from "./types";

const ROOM_TTL = 60 * 60 * 2; // 2 hours

type Entry = {
  room: Room;
  expiresAt: number;
};

const store = new Map<string, Entry>();

function roomKey(id: string) {
  return id;
}

function cleanup() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.expiresAt <= now) store.delete(key);
  }
}

setInterval(cleanup, 60_000).unref?.();

export async function getRoom(id: string): Promise<Room | null> {
  const entry = store.get(roomKey(id));
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    store.delete(roomKey(id));
    return null;
  }
  return entry.room;
}

export async function saveRoom(room: Room): Promise<void> {
  const expiresAt = Date.now() + ROOM_TTL * 1000;
  store.set(roomKey(room.id), { room, expiresAt });
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
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
