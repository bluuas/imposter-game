import type { Room, RoomPlayer } from "./types";

// Delegate to either a Redis-backed store or the in-memory store depending on runtime environment.
const useRedis = Boolean(process.env.REDIS_URL);

async function impl() {
  if ((impl as any)._cached) return (impl as any)._cached;
  const mod = useRedis ? await import("./roomStoreRedis") : await import("./roomStoreMemory");
  (impl as any)._cached = mod;
  return mod;
}

export async function getRoom(id: string): Promise<Room | null> {
  const m = await impl();
  return m.getRoom(id);
}

export async function saveRoom(room: Room): Promise<void> {
  const m = await impl();
  return m.saveRoom(room);
}

export async function createRoom(hostPlayer: RoomPlayer, locale: string): Promise<Room> {
  const m = await impl();
  return m.createRoom(hostPlayer, locale);
}

export async function updateRoom(
  id: string,
  updater: (room: Room) => Room
): Promise<Room | null> {
  const m = await impl();
  return m.updateRoom(id, updater);
}

