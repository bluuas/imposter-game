"use client";

import { Player, LocalGameData } from "@/lib/types";

type Props = {
  players: Player[];
  gameData: LocalGameData;
  onPlayAgain: () => void;
};

export default function ResultPhase({ players, gameData, onPlayAgain }: Props) {
  const { word, imposterId, votes } = gameData;
  const imposter = players.find((p) => p.id === imposterId)!;

  const mostVotedId = Object.entries(votes).reduce<[string, number]>(
    (best, [id, count]) => (count > best[1] ? [id, count] : best),
    ["", -1]
  )[0];

  const imposterCaught = mostVotedId === imposterId;
  const maxVotes = Math.max(1, ...Object.values(votes));

  const sortedPlayers = [...players].sort(
    (a, b) => (votes[b.id] ?? 0) - (votes[a.id] ?? 0)
  );

  return (
    <div className="flex flex-col min-h-dvh p-6 max-w-md mx-auto w-full items-center">
      <h1 className="text-2xl font-bold text-center pt-6 mb-6">Results</h1>

      {/* Outcome */}
      <div
        className={`w-full rounded-3xl p-6 text-center mb-6 ${
          imposterCaught
            ? "bg-emerald-950 border border-emerald-700"
            : "bg-red-950 border border-red-700"
        }`}
      >
        <p className="text-5xl mb-2">{imposterCaught ? "🎉" : "😈"}</p>
        <p className="text-2xl font-bold">
          {imposterCaught ? "Imposter caught!" : "Imposter wins!"}
        </p>
        <p className="text-slate-300 mt-1 text-sm">
          {imposterCaught
            ? "The group worked it out."
            : "They blended in perfectly."}
        </p>
      </div>

      {/* Secret word */}
      <div className="w-full rounded-2xl p-4 text-center mb-4 bg-[var(--card)]">
        <p className="text-[var(--text-muted)] text-sm">The secret word was</p>
        <p className="text-2xl font-bold mt-1">{word}</p>
      </div>

      {/* Imposter identity */}
      <div className="w-full rounded-2xl p-4 flex items-center gap-4 mb-6 bg-[var(--card)]">
        <span className="text-4xl">{imposter.emoji}</span>
        <div>
          <p className="text-[var(--text-muted)] text-xs">The imposter was</p>
          <p className="text-xl font-bold">{imposter.name}</p>
        </div>
        <span className="ml-auto text-red-400 font-bold text-sm">🕵️ IMPOSTER</span>
      </div>

      {/* Vote breakdown */}
      <div className="w-full flex flex-col gap-2 mb-8">
        <p className="text-[var(--text-muted)] text-sm font-medium mb-1">Votes</p>
        {sortedPlayers.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <span className="text-xl">{p.emoji}</span>
            <span className="flex-1 text-sm">
              {p.name}
              {p.id === imposterId && (
                <span className="text-red-400 ml-1">🕵️</span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  backgroundColor: 'var(--accent)',
                  width: `${((votes[p.id] ?? 0) / maxVotes) * 80}px`,
                  minWidth: "4px",
                }}
              />
              <span className="text-sm w-4 text-right text-[var(--text-muted)]">
                {votes[p.id] ?? 0}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full text-[var(--card)] text-lg font-bold py-5 rounded-2xl"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        Play again
      </button>
    </div>
  );
}
