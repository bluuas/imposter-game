import { Player, SetupData, LocalGameData } from "./types";
import type { Locale } from "./i18n";
import { getRandomWord } from "../data/words";

export function startGame(setup: SetupData, locale: Locale = "en"): LocalGameData {
  let word: string;
  if (setup.wordSource === "custom" && setup.customWords.length > 0) {
    word =
      setup.customWords[Math.floor(Math.random() * setup.customWords.length)];
  } else {
    word = getRandomWord(
      setup.category !== "all" ? setup.category : undefined,
      locale,
    );
  }

  const imposterId =
    setup.players[Math.floor(Math.random() * setup.players.length)].id;

  const revealOrder = [...setup.players].sort(() => Math.random() - 0.5);

  return { word, imposterId, revealOrder, currentRevealIndex: 0, votes: {}, currentVoterIndex: 0 };
}
