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
  const { locale, t } = useLanguage();
  const router = useRouter();

  async function handleCreateRoom(data: SetupData, host?: { name?: string; emoji?: string }) {
    const playerId = localStorage.getItem("imposter-player-id") ?? crypto.randomUUID();
    localStorage.setItem("imposter-player-id", playerId);

    const hostName = host?.name && host.name.trim().length > 0 ? host.name.trim() : "Host";
    const hostEmoji = host?.emoji ?? "👑";

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
    if (!res.ok) {
      let err = null;
      try {
        err = await res.json();
      } catch (_) {
        // ignore
      }
      console.error("Create room failed:", err ?? res.statusText);
      alert(err?.error ?? `Failed to create room: ${res.status} ${res.statusText}`);
      return;
    }

    const { room } = await res.json();
    if (!room || !room.id) {
      console.error("Create room returned invalid payload:", room);
      alert("Failed to create room: invalid response from server");
      return;
    }

    router.push(`/room/${room.id}`);
  }

  function handleJoinRoom(code: string) {
    router.push(`/room/${code.toUpperCase()}`);
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
    setGameData((prev) => {
      if (!prev) return prev;
      const voter = prev.revealOrder[prev.currentVoterIndex];
      return {
        ...prev,
        votes: { ...prev.votes, [voter.id]: targetId },
        currentVoterIndex: prev.currentVoterIndex + 1,
      };
    });
  }

  function handleReset() {
    setGameData(null);
    setPhase("setup");
  }

  return (
    <main className="min-h-dvh flex flex-col" style={{ backgroundColor: 'var(--page-bg)', color: 'var(--foreground)' }}>
      {phase === "setup" && (
        <SetupPhase initialData={setupData} onStart={handleStart} onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
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
          currentVoter={gameData.revealOrder[gameData.currentVoterIndex] ?? null}
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
