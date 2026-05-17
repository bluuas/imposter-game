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

const it: Translations = {
  appName: "🕵️ Imposter",
  playersCount: (n) => `Giocatori (${n})`,
  addPlayer: "+ Aggiungi",
  playerNamePlaceholder: "Nome giocatore",
  chooseEmoji: "Scegli un'emoji",
  cancel: "Annulla",
  add: "Aggiungi",
  atLeast3Players: "Aggiungi almeno 3 giocatori",
  morePlayersNeeded: (n) => `Ancora ${n} giocator${n > 1 ? "i" : "e"} necessari`,
  wordSource: "Fonte parole",
  categories: "Categorie",
  customWords: "Parole personalizzate",
  allCategories: "Tutte le categorie",
  addAWord: "Aggiungi una parola...",
  addAtLeast1Word: "Aggiungi almeno 1 parola",
  startGame: "Inizia partita",
  makePrivate: "Assicurati che nessuno veda il tuo schermo",
  holdToReveal: "Tieni premuto per rivelare",
  playerXofY: (x, y) => `Giocatore ${x} di ${y}`,
  imposter: "IMPOSTORE",
  imposterHint: "Mimetizzati — non tradire te stesso!",
  secretWordIs: "La parola segreta è",
  wordHint: "Non far indovinare l'impostore!",
  passToNext: "Passa al prossimo giocatore →",
  startDiscussion: "Inizia la discussione →",
  vote: "Voto",
  voteHint: "Chi è l'impostore? Tocca un giocatore per votarlo.",
  votesCast: (n) => `${n} vot${n !== 1 ? "i" : "o"} espressi`,
  revealImposter: "Rivela l'impostore →",
  results: "Risultati",
  imposterCaught: "Impostore catturato!",
  imposterWins: "L'impostore vince!",
  groupWorkedItOut: "Il gruppo ha capito.",
  blendedIn: "Si è mimetizzato alla perfezione.",
  secretWordWas: "La parola segreta era",
  theImposterWas: "L'impostore era",
  votes: "Voti",
  playAgain: "Gioca ancora",
};

const fr: Translations = {
  appName: "🕵️ Imposter",
  playersCount: (n) => `Joueurs (${n})`,
  addPlayer: "+ Ajouter",
  playerNamePlaceholder: "Nom du joueur",
  chooseEmoji: "Choisir un emoji",
  cancel: "Annuler",
  add: "Ajouter",
  atLeast3Players: "Ajoute au moins 3 joueurs pour commencer",
  morePlayersNeeded: (n) => `Encore ${n} joueur${n > 1 ? "s" : ""} nécessaire${n > 1 ? "s" : ""}`,
  wordSource: "Source des mots",
  categories: "Catégories",
  customWords: "Mots personnalisés",
  allCategories: "Toutes les catégories",
  addAWord: "Ajouter un mot...",
  addAtLeast1Word: "Ajoute au moins 1 mot",
  startGame: "Lancer la partie",
  makePrivate: "Assure-toi que personne ne voit ton écran",
  holdToReveal: "Maintenir pour révéler",
  playerXofY: (x, y) => `Joueur ${x} sur ${y}`,
  imposter: "IMPOSTEUR",
  imposterHint: "Fonds-toi dans la masse — ne te trahis pas !",
  secretWordIs: "Le mot secret est",
  wordHint: "Ne laisse pas l'imposteur deviner !",
  passToNext: "Passer au joueur suivant →",
  startDiscussion: "Commencer la discussion →",
  vote: "Vote",
  voteHint: "Qui est l'imposteur ? Appuie sur un joueur pour voter.",
  votesCast: (n) => `${n} vote${n !== 1 ? "s" : ""} exprimé${n !== 1 ? "s" : ""}`,
  revealImposter: "Révéler l'imposteur →",
  results: "Résultats",
  imposterCaught: "Imposteur démasqué !",
  imposterWins: "L'imposteur gagne !",
  groupWorkedItOut: "Le groupe a trouvé.",
  blendedIn: "Il s'est parfaitement fondu dans la masse.",
  secretWordWas: "Le mot secret était",
  theImposterWas: "L'imposteur était",
  votes: "Votes",
  playAgain: "Rejouer",
};

const es: Translations = {
  appName: "🕵️ Imposter",
  playersCount: (n) => `Jugadores (${n})`,
  addPlayer: "+ Añadir",
  playerNamePlaceholder: "Nombre del jugador",
  chooseEmoji: "Elige un emoji",
  cancel: "Cancelar",
  add: "Añadir",
  atLeast3Players: "Añade al menos 3 jugadores para empezar",
  morePlayersNeeded: (n) => `Faltan ${n} jugador${n > 1 ? "es" : ""}`,
  wordSource: "Fuente de palabras",
  categories: "Categorías",
  customWords: "Palabras personalizadas",
  allCategories: "Todas las categorías",
  addAWord: "Añadir una palabra...",
  addAtLeast1Word: "Añade al menos 1 palabra",
  startGame: "Iniciar partida",
  makePrivate: "Asegúrate de que nadie vea tu pantalla",
  holdToReveal: "Mantén para revelar",
  playerXofY: (x, y) => `Jugador ${x} de ${y}`,
  imposter: "IMPOSTOR",
  imposterHint: "Camúflate — ¡no te delates!",
  secretWordIs: "La palabra secreta es",
  wordHint: "¡No dejes que el impostor lo adivine!",
  passToNext: "Pasar al siguiente jugador →",
  startDiscussion: "Iniciar discusión →",
  vote: "Votación",
  voteHint: "¿Quién es el impostor? Toca a un jugador para votarlo.",
  votesCast: (n) => `${n} voto${n !== 1 ? "s" : ""} emitido${n !== 1 ? "s" : ""}`,
  revealImposter: "Revelar al impostor →",
  results: "Resultados",
  imposterCaught: "¡Impostor atrapado!",
  imposterWins: "¡El impostor gana!",
  groupWorkedItOut: "El grupo lo descubrió.",
  blendedIn: "Se camuflò perfectamente.",
  secretWordWas: "La palabra secreta era",
  theImposterWas: "El impostor era",
  votes: "Votos",
  playAgain: "Jugar de nuevo",
};

const sv: Translations = {
  appName: "🕵️ Imposter",
  playersCount: (n) => `Spelare (${n})`,
  addPlayer: "+ Lägg till",
  playerNamePlaceholder: "Spelarnamn",
  chooseEmoji: "Välj en emoji",
  cancel: "Avbryt",
  add: "Lägg till",
  atLeast3Players: "Lägg till minst 3 spelare för att börja",
  morePlayersNeeded: (n) => `${n} spelare till behövs`,
  wordSource: "Ordkälla",
  categories: "Kategorier",
  customWords: "Egna ord",
  allCategories: "Alla kategorier",
  addAWord: "Lägg till ett ord...",
  addAtLeast1Word: "Lägg till minst 1 ord",
  startGame: "Starta spelet",
  makePrivate: "Se till att ingen annan ser din skärm",
  holdToReveal: "Håll inne för att avslöja",
  playerXofY: (x, y) => `Spelare ${x} av ${y}`,
  imposter: "BEDRAGARE",
  imposterHint: "Smälte in — avslöja dig inte!",
  secretWordIs: "Det hemliga ordet är",
  wordHint: "Låt inte bedragaren lista ut det!",
  passToNext: "Skicka till nästa spelare →",
  startDiscussion: "Starta diskussion →",
  vote: "Röstning",
  voteHint: "Vem är bedragaren? Tryck på en spelare för att rösta.",
  votesCast: (n) => `${n} röst${n !== 1 ? "er" : ""} avlagd${n !== 1 ? "a" : ""}`,
  revealImposter: "Avslöja bedragaren →",
  results: "Resultat",
  imposterCaught: "Bedragaren avslöjad!",
  imposterWins: "Bedragaren vinner!",
  groupWorkedItOut: "Gruppen räknade ut det.",
  blendedIn: "De smälte in perfekt.",
  secretWordWas: "Det hemliga ordet var",
  theImposterWas: "Bedragaren var",
  votes: "Röster",
  playAgain: "Spela igen",
};

export const TRANSLATIONS: Record<Locale, Translations> = { en, de, it, fr, es, sv };

