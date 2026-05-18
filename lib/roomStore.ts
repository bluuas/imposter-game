import type { Room, RoomPlayer } from "./types";
import {
  getRoom as _getRoom,
  saveRoom as _saveRoom,
  createRoom as _createRoom,
  updateRoom as _updateRoom,
} from "./roomStoreMemory";

export const getRoom = _getRoom;
export const saveRoom = _saveRoom;
export const createRoom = _createRoom;
export const updateRoom = _updateRoom;

