"use client";

import { Player } from "@/lib/types";

type Props = {
  players: Player[];
  votes: Record<string, number>;
  onVote: (targetId: string) => void;
  onReveal: () => void;
};

export default function VotePhase({ players, votes, onVote, onReveal }: Props) {
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col flex-1 min-h-dvh p-6 max-w-md mx-auto w-full">
      <h1 className="text-2xl font-bold text-center pt-4 mb-2">Vote</h1>
      <p className="text-[var(--text-muted)] text-sm text-center mb-6">
        Who is the imposter? Tap a player to vote for them.
      </p>

      <div className="flex flex-col gap-3 flex-1">
        {players.map((p) => (
          <button
            key={p.id}
            onClick={() => onVote(p.id)}
            className="rounded-2xl px-4 py-4 flex items-center gap-4 w-full text-left bg-[var(--card)] active:opacity-80"
          >
            <span className="text-3xl">{p.emoji}</span>
            <span className="flex-1 font-medium text-lg">{p.name}</span>
            <span className="font-bold text-lg px-3 py-1 rounded-xl min-w-[2.5rem] text-center bg-[var(--card-2)] text-[var(--foreground)]">
              {votes[p.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 pb-8">
        <p className="text-[var(--text-muted)] text-xs text-center mb-4">
          {totalVotes} vote{totalVotes !== 1 ? "s" : ""} cast
        </p>
        <button
          onClick={onReveal}
          className="w-full bg-red-700 active:bg-red-800 text-[var(--card)] text-lg font-bold py-5 rounded-2xl"
        >
          Reveal the imposter →
        </button>
      </div>
    </div>
  );
}
