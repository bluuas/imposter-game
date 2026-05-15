"use client";

import { useState, useRef, useCallback } from "react";
import { LocalGameData } from "@/lib/types";
import { getEmojiColor } from "@/lib/themes";

const HOLD_DURATION = 1500; // ms

type Props = {
  gameData: LocalGameData;
  onNext: () => void;
  onDone: () => void;
};

export default function RevealPhase({ gameData, onNext, onDone }: Props) {
  const { word, imposterId, revealOrder, currentRevealIndex } = gameData;
  const currentPlayer = revealOrder[currentRevealIndex];
  const isLast = currentRevealIndex === revealOrder.length - 1;
  const isImposter = currentPlayer.id === imposterId;

  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const startHold = useCallback(() => {
    if (revealed) return;
    startTimeRef.current = Date.now();
    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / HOLD_DURATION) * 100, 100));
    }, 16);
    holdTimer.current = setTimeout(() => {
      clearInterval(progressTimer.current!);
      setProgress(100);
      setRevealed(true);
    }, HOLD_DURATION);
  }, [revealed]);

  const cancelHold = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (progressTimer.current) clearInterval(progressTimer.current);
    holdTimer.current = null;
    progressTimer.current = null;
    setProgress(0);
  }, []);

  function handleNext() {
    setRevealed(false);
    setProgress(0);
    if (isLast) {
      onDone();
    } else {
      onNext();
    }
  }

  const circumference = 2 * Math.PI * 44;
  const total = revealOrder.length;
  const emojiColor = getEmojiColor(currentPlayer.emoji);

  return (
    <div className="flex flex-col flex-1 min-h-dvh items-center justify-between p-6">
      {/* Progress dots */}
      <div className="w-full flex gap-1 pt-2">
        {revealOrder.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors"
            style={{
              backgroundColor:
                i < currentRevealIndex
                  ? 'var(--accent)'
                  : i === currentRevealIndex
                  ? 'var(--accent)'
                  : '#334155',
              opacity: i > currentRevealIndex ? 1 : i < currentRevealIndex ? 0.5 : 1,
            }}
          />
        ))}
      </div>

      {/* Player identity */}
      <div
        className="flex flex-col items-center gap-3 text-center rounded-3xl px-8 py-6 w-full"
        style={{ backgroundColor: emojiColor.bg, border: `1px solid ${emojiColor.border}33` }}
      >
        <span className="text-7xl">{currentPlayer.emoji}</span>
        <h2 className="text-2xl font-bold" style={{ color: emojiColor.text }}>{currentPlayer.name}</h2>
        <p className="text-sm" style={{ color: emojiColor.border }}>
          Make sure no one else can see your screen
        </p>
      </div>

      {!revealed ? (
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Hold-to-reveal ring button */}
          <div className="relative select-none">
            <svg
              className="w-40 h-40 -rotate-90"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                strokeWidth="6"
                style={{ stroke: 'var(--card-2)' }}
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke={emojiColor.border}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress / 100)}
                strokeLinecap="round"
              />
            </svg>
            <button
              onPointerDown={startHold}
              onPointerUp={cancelHold}
              onPointerLeave={cancelHold}
              onPointerCancel={cancelHold}
              className="absolute inset-0 flex flex-col items-center justify-center touch-none"
              aria-label="Hold to reveal your word"
            >
              <span className="text-3xl">👁️</span>
              <span className="text-xs mt-1 text-[var(--text-muted)]">Hold to reveal</span>
            </button>
          </div>
          <p className="text-[var(--text-muted)] text-xs">
            Player {currentRevealIndex + 1} of {total}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full">
          <div
            className={`w-full rounded-3xl p-8 text-center ${
              isImposter
                ? "bg-red-950 border border-red-700"
                : "bg-emerald-950 border border-emerald-700"
            }`}
          >
            {isImposter ? (
              <>
                <p className="text-5xl mb-3">🕵️</p>
                <p className="text-3xl font-bold text-red-300">IMPOSTER</p>
                <p className="text-red-300 text-sm mt-2">
                  Try to blend in — don&apos;t reveal yourself!
                </p>
              </>
            ) : (
              <>
                <p className="text-emerald-300 text-sm mb-2">
                  The secret word is
                </p>
                <p className="text-3xl font-bold text-emerald-300">{word}</p>
                <p className="text-emerald-300 text-sm mt-2">
                  Don&apos;t let the imposter figure it out!
                </p>
              </>
            )}
          </div>
          <button
            onClick={handleNext}
            className="w-full text-[var(--card)] text-lg font-bold py-5 rounded-2xl"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {isLast ? "Start Discussion →" : "Pass to next player →"}
          </button>
          <p className="text-[var(--text-muted)] text-xs">
            Player {currentRevealIndex + 1} of {total}
          </p>
        </div>
      )}
    </div>
  );
}
