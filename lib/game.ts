import { Player, SetupData, LocalGameData } from "./types";
import type { Locale } from "./i18n";
import { getRandomWord } from "../data/words";

export function startGame(setup: SetupData, locale: Locale = "en"): LocalGameData {
  let word: string;
  let wordAddedBy: string | undefined;

  if (setup.wordSource === "custom" && setup.customWords.length > 0) {
    const entry = setup.customWords[Math.floor(Math.random() * setup.customWords.length)];
    word = entry.word;
    wordAddedBy = entry.addedBy;
  } else {
    word = getRandomWord(
      setup.category !== "all" ? setup.category : undefined,
      locale,
    );
  }

  // Exclude the player who added the chosen word from being imposter (they already know it)
  const imposterPool = wordAddedBy
    ? setup.players.filter((p) => p.id !== wordAddedBy)
    : setup.players;
  const imposterCandidates = imposterPool.length > 0 ? imposterPool : setup.players;
  const imposterId = imposterCandidates[Math.floor(Math.random() * imposterCandidates.length)].id;

  const revealOrder = [...setup.players].sort(() => Math.random() - 0.5);

  return { word, imposterId, revealOrder, currentRevealIndex: 0, votes: {}, currentVoterIndex: 0 };
}
