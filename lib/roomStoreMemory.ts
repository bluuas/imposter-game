import type { Room, RoomPlayer } from "./types";

const ROOM_TTL = 60 * 60 * 2; // 2 hours

type Entry = {
  room: Room;
  expiresAt: number;
};

const store = new Map<string, Entry>();

// ── Private word-secrets sidecar ──────────────────────────────────────────
// Word texts are NEVER included in the Room object that gets sent to clients.
// They live here only, server-side, until the game starts.
type WordSecret = { word: string; maskEmoji: string; addedBy: string };
const secretStore = new Map<string, WordSecret[]>();

export function addWordSecret(roomId: string, entry: WordSecret): void {
  const list = secretStore.get(roomId) ?? [];
  list.push(entry);
  secretStore.set(roomId, list);
}

export function removeWordSecret(roomId: string, addedBy: string, maskEmoji: string): void {
  const list = secretStore.get(roomId) ?? [];
  secretStore.set(roomId, list.filter(
    (e) => !(e.addedBy === addedBy && e.maskEmoji === maskEmoji)
  ));
}

export function getWordSecrets(roomId: string): WordSecret[] {
  return secretStore.get(roomId) ?? [];
}

export function clearWordSecrets(roomId: string): void {
  secretStore.delete(roomId);
}

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
    customWords: [],
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
