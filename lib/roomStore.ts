import type { Room, RoomPlayer } from "./types";
import {
  getRoom as _getRoom,
  saveRoom as _saveRoom,
  createRoom as _createRoom,
  updateRoom as _updateRoom,
  addWordSecret as _addWordSecret,
  removeWordSecret as _removeWordSecret,
  getWordSecrets as _getWordSecrets,
  clearWordSecrets as _clearWordSecrets,
} from "./roomStoreMemory";

export const getRoom = _getRoom;
export const saveRoom = _saveRoom;
export const createRoom = _createRoom;
export const updateRoom = _updateRoom;
export const addWordSecret = _addWordSecret;
export const removeWordSecret = _removeWordSecret;
export const getWordSecrets = _getWordSecrets;
export const clearWordSecrets = _clearWordSecrets;

