export type Player = {
  id: string;
  name: string;
  emoji: string;
};

export type CustomWordEntry = {
  word: string;
  maskEmoji: string; // random emoji shown publicly instead of the word
  addedBy?: string;  // player id who added this word (excluded from being imposter)
};

export type SetupData = {
  players: Player[];
  wordSource: "category" | "custom";
  category: string;
  customWords: CustomWordEntry[];
};

// Phase 1: single-device local game state
export type LocalGameData = {
  word: string;
  imposterId: string;
  revealOrder: Player[];
  currentRevealIndex: number;
  votes: Record<string, string>; // voterId -> targetId
  currentVoterIndex: number;     // index into revealOrder for whose turn to vote
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
  // Custom words added in the lobby (no word text — kept server-side privately)
  customWords: Array<{ maskEmoji: string; addedBy: string }>;
  createdAt: number;
};
