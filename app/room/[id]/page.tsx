"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Room, RoomPlayer } from "@/lib/types";
import { getEmojiColor } from "@/lib/themes";
import { useLanguage } from "@/app/components/LanguageProvider";

const EMOJIS = [
  "😀", "😎", "🤩", "🥳", "😈", "👻", "🤠", "🤓",
  "🐱", "🐸", "🦊", "🐼", "🦁", "🐯", "🦋", "🌟",
  "🔥", "⚡", "🎯", "🎮", "🚀", "💎", "🦄", "🎭",
];

const LOBBY_POLL = 1000; // 1s while in lobby/setup
const DEFAULT_POLL = 5000; // 5s afterwards
const HOLD_DURATION = 1500;

// ── Helpers ────────────────────────────────────────────────────────────────

function getOrCreatePlayerId(): string {
  let id = localStorage.getItem("imposter-player-id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("imposter-player-id", id);
  }
  return id;
}

async function patchRoom(roomId: string, body: object) {
  const res = await fetch(`/api/rooms/${roomId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Request failed");
  const data = await res.json();
  return data.room as Room;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function PlayerChip({ player }: { player: RoomPlayer }) {
  const colors = getEmojiColor(player.emoji);
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      <span>{player.emoji}</span>
      <span>{player.name}</span>
      {player.isHost && <span className="opacity-60 text-xs">👑</span>}
    </div>
  );
}

// ── Lobby ──────────────────────────────────────────────────────────────────

function LobbyPhase({ room, playerId, onStart }: {
  room: Room;
  playerId: string;
  onStart: () => void;
}) {
  const { t } = useLanguage();
  const isHost = room.hostId === playerId;
  const canStart = room.players.length >= 3;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-sm text-[var(--text-muted)] mb-1">{t.roomCode}</p>
        <p className="text-5xl font-black tracking-widest text-[var(--accent)]">{room.id}</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">{t.shareCode}</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">
          {t.playersCount(room.players.length)}
        </h2>
        <div className="flex flex-wrap gap-2">
          {room.players.map((p) => <PlayerChip key={p.id} player={p} />)}
        </div>
      </div>

      {isHost && (
        <button
          onClick={onStart}
          disabled={!canStart}
          className="w-full py-4 rounded-2xl font-bold text-lg bg-[var(--accent)] text-white disabled:opacity-40"
        >
          {canStart ? t.startGame : t.needMorePlayers}
        </button>
      )}
      {!isHost && (
        <p className="text-center text-[var(--text-muted)] text-sm">
          {t.waitingForHost}
        </p>
      )}
    </div>
  );
}

// ── Reveal (multi-device) ──────────────────────────────────────────────────

function RevealPhaseMulti({ room, playerId, onReady }: {
  room: Room;
  playerId: string;
  onReady: () => void;
}) {
  const { t } = useLanguage();
  const me = room.players.find((p) => p.id === playerId);
  const isImposter = room.imposterId === playerId;
  const alreadyReady = me?.ready ?? false;

  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = useCallback(() => {
    if (revealed) return;
    const start = Date.now();
    progressTimer.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - start) / HOLD_DURATION) * 100, 100));
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

  const colors = me ? getEmojiColor(me.emoji) : getEmojiColor("😀");
  const readyCount = room.players.filter((p) => p.ready).length;

  return (
    <div className="flex flex-col gap-6 items-center">
      {!revealed ? (
        <>
          <p className="text-center text-[var(--text-muted)]">
            {t.holdToReveal}
          </p>
          <div
            className="w-48 h-48 rounded-3xl flex items-center justify-center text-6xl relative overflow-hidden cursor-pointer select-none"
            style={{ backgroundColor: colors.bg, border: `2px solid ${colors.border}` }}
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-white/20 transition-none"
              style={{ height: `${progress}%` }}
            />
            <span className="relative z-10">{me?.emoji ?? "?"}</span>
          </div>
        </>
      ) : (
        <div
          className="w-full rounded-3xl p-8 text-center"
          style={{
            backgroundColor: isImposter ? "#450a0a" : "#052e16",
            border: `2px solid ${isImposter ? "#b91c1c" : "#16a34a"}`,
          }}
        >
          <p className="text-sm mb-2" style={{ color: isImposter ? "#fca5a5" : "#86efac" }}>
            {isImposter ? t.youAreImposter : t.yourWord}
          </p>
          <p className="text-4xl font-black" style={{ color: isImposter ? "#ef4444" : "#22c55e" }}>
            {isImposter ? "❓" : room.word}
          </p>
          {isImposter && (
            <p className="text-sm mt-2" style={{ color: "#fca5a5" }}>
              {t.imposterHint}
            </p>
          )}
        </div>
      )}

      {revealed && !alreadyReady && (
        <button
          onClick={onReady}
          className="w-full py-4 rounded-2xl font-bold text-lg bg-[var(--accent)] text-white"
        >
          {t.imReady}
        </button>
      )}

      {alreadyReady && (
        <p className="text-center text-[var(--text-muted)] text-sm">
          {t.waitingForOthers}
        </p>
      )}
    </div>
  );
}

// ── Vote (multi-device) ────────────────────────────────────────────────────

function VotePhaseMulti({ room, playerId, onVote }: {
  room: Room;
  playerId: string;
  onVote: (targetId: string) => void;
}) {
  const { t } = useLanguage();
  const hasVoted = playerId in room.votes;
  const voteCount = Object.keys(room.votes).length;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">{t.voteTitle}</h2>

      {!hasVoted ? (
        <div className="flex flex-col gap-3">
          {room.players.filter((p) => p.id !== playerId).map((p) => {
            const colors = getEmojiColor(p.emoji);
            return (
              <button
                key={p.id}
                onClick={() => onVote(p.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-left active:scale-95 transition-transform"
                style={{ backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
              >
                <span className="text-2xl">{p.emoji}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-[var(--text-muted)]">
          {t.waitingForOthers}
        </p>
      )}
    </div>
  );
}

// ── Result (multi-device) ──────────────────────────────────────────────────

function ResultPhaseMulti({ room }: { room: Room }) {
  const { t } = useLanguage();
  const imposter = room.players.find((p) => p.id === room.imposterId);

  // Tally votes
  const tally: Record<string, number> = {};
  for (const targetId of Object.values(room.votes)) {
    tally[targetId] = (tally[targetId] ?? 0) + 1;
  }
  const topVoted = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
  const caught = topVoted?.[0] === room.imposterId;

  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <p className="text-6xl">{caught ? "🎉" : "😈"}</p>
      <h2 className="text-2xl font-black">
        {caught ? t.imposterCaught : t.imposterEscaped}
      </h2>

      {imposter && (
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl">{imposter.emoji}</span>
          <p className="font-bold">{imposter.name}</p>
          <p className="text-sm text-[var(--text-muted)]">{t.wasImposter}</p>
        </div>
      )}

      <div className="w-full rounded-2xl p-4 bg-[var(--card-2)]">
        <p className="text-sm text-[var(--text-muted)] mb-1">{t.theWord}</p>
        <p className="text-3xl font-black text-[var(--accent)]">{room.word}</p>
      </div>

      <div className="w-full">
        <p className="text-sm text-[var(--text-muted)] mb-2 text-left">{t.votes}</p>
        {room.players.map((p) => {
          const votes = tally[p.id] ?? 0;
          return (
            <div key={p.id} className="flex items-center gap-2 mb-2">
              <span>{p.emoji}</span>
              <span className="flex-1 text-sm">{p.name}</span>
              <span className="text-sm font-bold">{votes}</span>
              {p.id === room.imposterId && <span className="text-xs opacity-60">😈</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Join form ──────────────────────────────────────────────────────────────

function JoinForm({ roomId, playerId, onJoined }: {
  roomId: string;
  playerId: string;
  onJoined: (room: Room) => void;
}) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function join() {
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    try {
      const room = await patchRoom(roomId, {
        action: "join",
        player: { id: playerId, name: name.trim(), emoji, isHost: false, ready: false },
      });
      onJoined(room);
    } catch {
        setError(t.roomNotFound);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{t.joinRoom} <span className="text-[var(--accent)]">{roomId}</span></h2>

      <div className="flex flex-wrap gap-2">
        {EMOJIS.map((e) => (
          <button
            key={e}
            onClick={() => setEmoji(e)}
            className={`text-2xl p-2 rounded-xl transition-all ${emoji === e ? "ring-2 ring-[var(--accent)] scale-110" : "opacity-60"}`}
          >
            {e}
          </button>
        ))}
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && join()}
        placeholder={t.yourName}
        maxLength={20}
        className="w-full px-4 py-3 rounded-2xl bg-[var(--card-2)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        onClick={join}
        disabled={!name.trim() || loading}
        className="w-full py-4 rounded-2xl font-bold text-lg bg-[var(--accent)] text-white disabled:opacity-40"
      >
        {loading ? "…" : t.join}
      </button>
    </div>
  );
}

// ── Main room page ─────────────────────────────────────────────────────────

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = (params.id as string).toUpperCase();

  const [room, setRoom] = useState<Room | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [joined, setJoined] = useState(false);
  const [playerId, setPlayerId] = useState("");
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable player ID
  useEffect(() => {
    setPlayerId(getOrCreatePlayerId());
  }, []);

  // Poll room state
  useEffect(() => {
    if (!playerId) return;

    async function poll() {
      const res = await fetch(`/api/rooms/${roomId}`);
      if (res.status === 404) { setNotFound(true); return; }
      const data = await res.json();
      const r: Room = data.room;
      setRoom(r);
      const isInRoom = r.players.some((p) => p.id === playerId);
      if (isInRoom) setJoined(true);
      // Keep polling until result. Use faster polling in lobby, slower afterwards.
      if (r.phase !== "result") {
        const interval = r.phase === "lobby" ? LOBBY_POLL : DEFAULT_POLL;
        pollRef.current = setTimeout(poll, interval);
      }
    }

    poll();
    return () => { if (pollRef.current) clearTimeout(pollRef.current); };
  }, [playerId, roomId]);

  async function handleStart() {
    if (!room) return;
    const updated = await patchRoom(roomId, { action: "start", playerId });
    setRoom(updated);
  }

  async function handleReady() {
    if (!room) return;
    const updated = await patchRoom(roomId, { action: "ready", playerId });
    setRoom(updated);
  }

  async function handleVote(targetId: string) {
    if (!room) return;
    const updated = await patchRoom(roomId, { action: "vote", voterId: playerId, targetId });
    setRoom(updated);
  }

  if (notFound) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "var(--page-bg)" }}>
        <div className="text-center">
          <p className="text-4xl mb-4">🚫</p>
          <p className="text-lg font-bold mb-2">Room not found</p>
          <button onClick={() => router.push("/")} className="text-[var(--accent)] underline">Go home</button>
        </div>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--page-bg)" }}>
        <p className="text-[var(--text-muted)]">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 max-w-md mx-auto" style={{ backgroundColor: "var(--page-bg)", color: "var(--foreground)" }}>
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => router.push("/")} className="text-[var(--text-muted)] text-sm">← Back</button>
      </div>

      {!joined ? (
        <JoinForm
          roomId={roomId}
          playerId={playerId}
          onJoined={(r) => { setRoom(r); setJoined(true); }}
        />
      ) : room.phase === "lobby" ? (
        <LobbyPhase room={room} playerId={playerId} onStart={handleStart} />
      ) : room.phase === "reveal" ? (
        <RevealPhaseMulti room={room} playerId={playerId} onReady={handleReady} />
      ) : room.phase === "vote" ? (
        <VotePhaseMulti room={room} playerId={playerId} onVote={handleVote} />
      ) : (
        <ResultPhaseMulti room={room} />
      )}
    </main>
  );
}
