"use client";

import { useState } from "react";
import { Player } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";

type Props = {
  players: Player[];
  currentVoter: Player | null; // null = all votes cast
  votes: Record<string, string>;
  onVote: (targetId: string) => void;
  onReveal: () => void;
};

export default function VotePhase({ players, currentVoter, votes, onVote, onReveal }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useLanguage();
  const votedCount = Object.keys(votes).length;

  // All votes cast — show reveal button
  if (!currentVoter) {
    return (
      <div className="flex flex-col flex-1 min-h-dvh p-6 max-w-md mx-auto w-full items-center justify-center gap-6">
        <p className="text-5xl">🗳️</p>
        <h1 className="text-2xl font-bold text-center">{t.allVotesCast}</h1>
        <p className="text-[var(--text-muted)] text-sm text-center">
          {t.votedXofY(votedCount, players.length)}
        </p>
        <button
          onClick={onReveal}
          className="w-full bg-red-700 active:bg-red-800 text-white text-lg font-bold py-5 rounded-2xl mt-4"
        >
          {t.revealImposter}
        </button>
      </div>
    );
  }

  function handleConfirm() {
    if (!selected) return;
    onVote(selected);
    setSelected(null);
  }

  return (
    <div className="flex flex-col flex-1 min-h-dvh p-6 max-w-md mx-auto w-full">
      <h1 className="text-2xl font-bold text-center pt-4 mb-1">{t.vote}</h1>
      <p className="text-[var(--text-muted)] text-xs text-center mb-4">
        {t.votedXofY(votedCount, players.length)}
      </p>

      {/* Current voter indicator */}
      <div className="rounded-2xl px-4 py-3 mb-6 text-center bg-[var(--card)]">
        <p className="text-[var(--text-muted)] text-xs mb-1">{t.votingNow(currentVoter.name)}</p>
        <p className="text-2xl font-bold">
          {currentVoter.emoji} {t.voteHint}
        </p>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {players.map((p) => {
          const isSelected = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(isSelected ? null : p.id)}
              className="rounded-2xl px-4 py-4 flex items-center gap-4 w-full text-left active:opacity-80 transition-all"
              style={{
                backgroundColor: isSelected ? "var(--accent)" : "var(--card)",
                color: isSelected ? "var(--card)" : "var(--foreground)",
                outline: isSelected ? "2px solid var(--accent)" : "none",
              }}
            >
              <span className="text-3xl">{p.emoji}</span>
              <span className="flex-1 font-medium text-lg">{p.name}</span>
              {isSelected && <span className="text-xl font-bold">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="mt-6 pb-8">
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="w-full disabled:opacity-40 text-white text-lg font-bold py-5 rounded-2xl"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {t.confirmVote}
        </button>
      </div>
    </div>
  );
}

