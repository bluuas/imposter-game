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

export type GamePhase = "lobby" | "reveal" | "discussion" | "vote" | "result";

// Phase 2: multi-device room state (future)
export type Room = {
  id: string;
  players: Player[];
  phase: GamePhase;
  word: string;
  imposterId: string;
  votes: Record<string, string>; // voterId -> targetId
  createdAt: number;
};
