"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SetupData, LocalGameData } from "@/lib/types";
import { startGame } from "@/lib/game";
import SetupPhase from "./components/SetupPhase";
import RevealPhase from "./components/RevealPhase";
import VotePhase from "./components/VotePhase";
import ResultPhase from "./components/ResultPhase";
import { useLanguage } from "./components/LanguageProvider";

type Phase = "setup" | "reveal" | "vote" | "result";

const DEFAULT_SETUP: SetupData = {
  players: [],
  wordSource: "category",
  category: "all",
  customWords: [],
};

export default function Home() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [setupData, setSetupData] = useState<SetupData>(DEFAULT_SETUP);
  const [gameData, setGameData] = useState<LocalGameData | null>(null);
  const { locale } = useLanguage();
  const router = useRouter();

  async function handleCreateRoom(data: SetupData) {
    const playerId = localStorage.getItem("imposter-player-id") ?? crypto.randomUUID();
    localStorage.setItem("imposter-player-id", playerId);

    const hostName = "Host";
    const hostEmoji = "👑";

    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerName: hostName,
        playerEmoji: hostEmoji,
        playerId,
        locale,
        category: data.category !== "all" ? data.category : undefined,
      }),
    });
    const { room } = await res.json();
    router.push(`/room/${room.id}`);
  }

  function handleStart(data: SetupData) {
    setSetupData(data);
    setGameData(startGame(data, locale));
    setPhase("reveal");
  }

  function handleRevealNext() {
    setGameData((prev) =>
      prev ? { ...prev, currentRevealIndex: prev.currentRevealIndex + 1 } : prev
    );
  }

  function handleVote(targetId: string) {
    setGameData((prev) =>
      prev
        ? {
            ...prev,
            votes: {
              ...prev.votes,
              [targetId]: (prev.votes[targetId] ?? 0) + 1,
            },
          }
        : prev
    );
  }

  function handleReset() {
    setGameData(null);
    setPhase("setup");
  }

  return (
    <main className="min-h-dvh flex flex-col" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--foreground)' }}>
      {phase === "setup" && (
        <SetupPhase initialData={setupData} onStart={handleStart} onCreateRoom={handleCreateRoom} />
      )}
      {phase === "reveal" && gameData && (
        <RevealPhase
          gameData={gameData}
          onNext={handleRevealNext}
          onDone={() => setPhase("vote")}
        />
      )}
      {phase === "vote" && gameData && (
        <VotePhase
          players={setupData.players}
          votes={gameData.votes}
          onVote={handleVote}
          onReveal={() => setPhase("result")}
        />
      )}
      {phase === "result" && gameData && (
        <ResultPhase
          players={setupData.players}
          gameData={gameData}
          onPlayAgain={handleReset}
        />
      )}
    </main>
  );
}
