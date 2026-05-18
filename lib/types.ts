export type Player = {
  id: string;
  name: string;
  emoji: string;
};

export type SetupData = {
  players: Player[];
  wordSource: "category" | "custom";
  category: string;
  customWords: string[];
};

// Phase 1: single-device local game state
export type LocalGameData = {
  word: string;
  imposterId: string;
  revealOrder: Player[];
  currentRevealIndex: number;
  votes: Record<string, number>; // playerId -> vote count
};

export type GamePhase = "lobby" | "reveal" | "vote" | "result";

// Phase 2: multi-device room state
export type RoomPlayer = {
  id: string;     // socket-free UUID, stored in localStorage
  name: string;
  emoji: string;
  isHost: boolean;
  ready: boolean; // has tapped "Ready" on their reveal card
};

export type Room = {
  id: string;           // 6-char uppercase code
  hostId: string;
  players: RoomPlayer[];
  phase: GamePhase;
  // Set when host starts the game
  word?: string;
  imposterId?: string;
  category?: string;
  locale?: string;
  // votes: voterId -> targetId
  votes: Record<string, string>;
  createdAt: number;
};
