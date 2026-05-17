export type Locale = "en" | "de" | "it" | "fr" | "es" | "sv";

export const LOCALES: { code: Locale; flag: string; name: string }[] = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "sv", flag: "🇸🇪", name: "Svenska" },
];

export type Translations = {
  // Setup
  appName: string;
  playersCount: (n: number) => string;
  addPlayer: string;
  playerNamePlaceholder: string;
  chooseEmoji: string;
  cancel: string;
  add: string;
  atLeast3Players: string;
  morePlayersNeeded: (n: number) => string;
  wordSource: string;
  categories: string;
  customWords: string;
  allCategories: string;
  addAWord: string;
  addAtLeast1Word: string;
  startGame: string;
  // Reveal
  makePrivate: string;
  holdToReveal: string;
  playerXofY: (x: number, y: number) => string;
  imposter: string;
  imposterHint: string;
  secretWordIs: string;
  wordHint: string;
  passToNext: string;
  startDiscussion: string;
  // Vote
  vote: string;
  voteHint: string;
  votesCast: (n: number) => string;
  revealImposter: string;
  // Result
  results: string;
  imposterCaught: string;
  imposterWins: string;
  groupWorkedItOut: string;
  blendedIn: string;
  secretWordWas: string;
  theImposterWas: string;
  votes: string;
  playAgain: string;
};

const en: Translations = {
  appName: "🕵️ Imposter",
  playersCount: (n) => `Players (${n})`,
  addPlayer: "+ Add",
  playerNamePlaceholder: "Player name",
  chooseEmoji: "Choose an emoji",
  cancel: "Cancel",
  add: "Add",
  atLeast3Players: "Add at least 3 players to start",
  morePlayersNeeded: (n) => `${n} more player${n > 1 ? "s" : ""} needed`,
  wordSource: "Word source",
  categories: "Categories",
  customWords: "Custom words",
  allCategories: "All categories",
  addAWord: "Add a word...",
  addAtLeast1Word: "Add at least 1 word",
  startGame: "Start Game",
  makePrivate: "Make sure no one else can see your screen",
  holdToReveal: "Hold to reveal",
  playerXofY: (x, y) => `Player ${x} of ${y}`,
  imposter: "IMPOSTER",
  imposterHint: "Try to blend in — don't reveal yourself!",
  secretWordIs: "The secret word is",
  wordHint: "Don't let the imposter figure it out!",
  passToNext: "Pass to next player →",
  startDiscussion: "Start Discussion →",
  vote: "Vote",
  voteHint: "Who is the imposter? Tap a player to vote for them.",
  votesCast: (n) => `${n} vote${n !== 1 ? "s" : ""} cast`,
  revealImposter: "Reveal the imposter →",
  results: "Results",
  imposterCaught: "Imposter caught!",
  imposterWins: "Imposter wins!",
  groupWorkedItOut: "The group worked it out.",
  blendedIn: "They blended in perfectly.",
  secretWordWas: "The secret word was",
  theImposterWas: "The imposter was",
  votes: "Votes",
  playAgain: "Play again",
};

const de: Translations = {
  appName: "🕵️ Imposter",
  playersCount: (n) => `Spieler (${n})`,
  addPlayer: "+ Hinzufügen",
  playerNamePlaceholder: "Spielername",
  chooseEmoji: "Emoji wählen",
  cancel: "Abbrechen",
  add: "Hinzufügen",
  atLeast3Players: "Mindestens 3 Spieler benötigt",
  morePlayersNeeded: (n) => `Noch ${n} Spieler benötigt`,
  wordSource: "Wortquelle",
  categories: "Kategorien",
  customWords: "Eigene Wörter",
  allCategories: "Alle Kategorien",
  addAWord: "Wort eingeben...",
  addAtLeast1Word: "Mindestens 1 Wort hinzufügen",
  startGame: "Spiel starten",
  makePrivate: "Stell sicher, dass niemand deinen Bildschirm sieht",
  holdToReveal: "Halten zum Aufdecken",
  playerXofY: (x, y) => `Spieler ${x} von ${y}`,
  imposter: "IMPOSTER",
  imposterHint: "Tarne dich — verrate dich nicht!",
  secretWordIs: "Das Geheimwort ist",
  wordHint: "Lass den Imposter nicht raten!",
  passToNext: "Weiter zum nächsten Spieler →",
  startDiscussion: "Diskussion starten →",
  vote: "Abstimmung",
  voteHint: "Wer ist der Imposter? Tippe auf einen Spieler.",
  votesCast: (n) => `${n} Stimme${n !== 1 ? "n" : ""} abgegeben`,
  revealImposter: "Imposter enthüllen →",
  results: "Ergebnis",
  imposterCaught: "Imposter gefasst!",
  imposterWins: "Imposter gewinnt!",
  groupWorkedItOut: "Die Gruppe hat es herausgefunden.",
  blendedIn: "Er hat sich perfekt getarnt.",
  secretWordWas: "Das Geheimwort war",
  theImposterWas: "Der Imposter war",
  votes: "Stimmen",
  playAgain: "Nochmal spielen",
};

export const TRANSLATIONS: Record<Locale, Translations> = { en, de };
