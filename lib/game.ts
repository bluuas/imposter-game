import { Player, SetupData, LocalGameData } from "./types";
import { getRandomWord } from "../data/words";

export function startGame(setup: SetupData): LocalGameData {
  let word: string;
  if (setup.wordSource === "custom" && setup.customWords.length > 0) {
    word =
      setup.customWords[Math.floor(Math.random() * setup.customWords.length)];
  } else {
    word = getRandomWord(
      setup.category !== "all" ? setup.category : undefined
    );
  }

  const imposterId =
    setup.players[Math.floor(Math.random() * setup.players.length)].id;

  const revealOrder = [...setup.players].sort(() => Math.random() - 0.5);

  const votes = Object.fromEntries(setup.players.map((p: Player) => [p.id, 0]));

  return { word, imposterId, revealOrder, currentRevealIndex: 0, votes };
}
