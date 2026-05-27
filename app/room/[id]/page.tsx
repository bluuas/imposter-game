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

const WORD_MASK_EMOJIS = [
  "🍕", "🦕", "🌮", "🍔", "🌈", "🎸", "🏄", "🧁",
  "🎯", "🌵", "🐙", "🦈", "🎭", "🌺", "🎪", "🍦",
  "🏆", "🎲", "🦋", "🌊", "🎨", "🧩", "🦜", "🍰",
  "🚂", "🌙", "⭐", "🔮", "🎀", "🍭", "🌶️", "🎃",
];

const LOBBY_POLL = 1000; // 1s while in lobby/setup
const DEFAULT_POLL = 5000; // 5s afterwards
const HOLD_DURATION = 1500;

// ── Helpers ────────────────────────────────────────────────────────────────

function getOrCreatePlayerId(): string {
  let id = localStorage.getItem("imposter-player-id");
  if (!id) {
    id = generateUUIDv4();
    localStorage.setItem("imposter-player-id", id);
  }
  return id;
}

// UUID v4 generator with fallbacks for environments without crypto.randomUUID
function generateUUIDv4(): string {
  // Preferred: native randomUUID if available
  try {
    if (typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function") {
      return (crypto as any).randomUUID();
    }
  } catch {}

  // Use getRandomValues when available
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    buf[6] = (buf[6] & 0x0f) | 0x40; // version 4
    buf[8] = (buf[8] & 0x3f) | 0x80; // variant
    const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  // Fallback: Math.random-based (not cryptographically secure)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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

function LobbyPhase({ room, playerId, onStart, onAddWord, onRemoveWord }: {
  room: Room;
  playerId: string;
  onStart: () => void;
  onAddWord: (word: string, maskEmoji: string) => Promise<void>;
  onRemoveWord: (maskEmoji: string) => Promise<void>;
}) {
  const { t } = useLanguage();
  const isHost = room.hostId === playerId;
  const canStart = room.players.length >= 3;
  const [wordInput, setWordInput] = useState("");
  const [adding, setAdding] = useState(false);

  const myWords = (room.customWords ?? []).filter((e) => e.addedBy === playerId);

  function pickMaskEmoji(): string {
    const used = new Set((room.customWords ?? []).map((e) => e.maskEmoji));
    const available = WORD_MASK_EMOJIS.filter((e) => !used.has(e));
    const pool = available.length > 0 ? available : WORD_MASK_EMOJIS;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  async function handleAdd() {
    const word = wordInput.trim();
    if (!word || adding) return;
    setAdding(true);
    const maskEmoji = pickMaskEmoji();
    try {
      await onAddWord(word, maskEmoji);
      setWordInput("");
    } catch {
      // word won't be added; button re-enables so user can retry
    } finally {
      setAdding(false);
    }
  }

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

      {/* ── Secret words ──────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">
          {t.secretWordsSection}
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={t.addSecretWord}
            maxLength={30}
            className="flex-1 rounded-xl px-4 py-3 text-base bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <button
            onClick={handleAdd}
            disabled={!wordInput.trim() || adding}
            className={`px-5 py-3 rounded-xl font-medium transition-colors ${
              !wordInput.trim() || adding
                ? "bg-[var(--card-2)] text-[var(--text-muted)] cursor-not-allowed"
                : "bg-[var(--accent)] text-white"
            }`}
          >
            {t.add}
          </button>
        </div>

        {/* Hint + word pills */}
        {(room.customWords ?? []).length > 0 && (
          <>
            <p className="text-xs text-[var(--text-muted)] mb-2">{t.wordHiddenHint}</p>
            <div className="flex flex-wrap gap-2">
              {/* My words — with remove button */}
              {myWords.map((entry) => (
                <span
                  key={entry.maskEmoji}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-[var(--card)] ring-1 ring-[var(--accent)]"
                >
                  <span className="text-xl">{entry.maskEmoji}</span>
                  <button
                    onClick={() => onRemoveWord(entry.maskEmoji)}
                    className="text-[var(--text-muted)] active:text-red-400 leading-none"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {/* Other players' words — no label, no remove */}
              {(room.customWords ?? [])
                .filter((e) => e.addedBy !== playerId)
                .map((entry) => (
                  <span
                    key={entry.maskEmoji + entry.addedBy}
                    className="flex items-center px-3 py-1.5 rounded-full text-sm bg-[var(--card)]"
                  >
                    <span className="text-xl">{entry.maskEmoji}</span>
                  </span>
                ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              {t.secretWordsAdded((room.customWords ?? []).length)}
            </p>
          </>
        )}
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
  const myVote = room.votes[playerId]; // currently selected targetId, undefined if not voted yet
  const voteCount = Object.keys(room.votes).length;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">{t.voteTitle}</h2>
      <p className="text-center text-sm text-[var(--text-muted)]">
        {t.votedXofY(voteCount, room.players.length)}
      </p>

      <div className="flex flex-col gap-3">
        {room.players.filter((p) => p.id !== playerId).map((p) => {
          const colors = getEmojiColor(p.emoji);
          const isSelected = myVote === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onVote(p.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-left active:scale-95 transition-transform"
              style={{
                backgroundColor: isSelected ? "var(--accent)" : colors.bg,
                color: isSelected ? "var(--card)" : colors.text,
                border: `2px solid ${isSelected ? "var(--accent)" : colors.border}`,
              }}
            >
              {isSelected && <span className="text-lg">✓</span>}
              <span className="text-2xl">{p.emoji}</span>
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {myVote && (
        <p className="text-center text-xs text-[var(--text-muted)]">{t.waitingForOthers}</p>
      )}
    </div>
  );
}

// ── Result (multi-device) ──────────────────────────────────────────────────

function ResultPhaseMulti({ room, playerId, onStart }: { room: Room; playerId?: string; onStart?: () => void }) {
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

      {/* Host: allow starting a new round */}
      {playerId && room.hostId === playerId && (
        <div className="mt-4">
          <button
            onClick={() => onStart?.()}
            disabled={room.players.length < 3}
            className="w-full py-3 rounded-2xl font-bold text-lg bg-[var(--accent)] text-white disabled:opacity-40"
          >
            {room.players.length >= 3 ? t.startGame : t.needMorePlayers}
          </button>
        </div>
      )}

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
  const roomId = ((params?.id ?? "") as string).toUpperCase();

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
      try {
        const res = await fetch(`/api/rooms/${roomId}`);
        if (res.status === 404) { setNotFound(true); return; }
        if (!res.ok) throw new Error("Poll failed");
        const data = await res.json();
        const r: Room = data.room;
        setRoom(r);
        const isInRoom = r.players.some((p) => p.id === playerId);
        if (isInRoom) setJoined(true);
        // Keep polling so guests see state changes (e.g. host starting a new game).
        // Use faster polling in lobby, slower otherwise (including result).
        const interval = r.phase === "lobby" ? LOBBY_POLL : DEFAULT_POLL;
        pollRef.current = setTimeout(poll, interval);
      } catch {
        // On transient errors, retry after DEFAULT_POLL to keep the loop alive
        pollRef.current = setTimeout(poll, DEFAULT_POLL);
      }
    }

    poll();
    return () => { if (pollRef.current) clearTimeout(pollRef.current); };
  }, [playerId, roomId]);

  async function handleStart() {
    if (!room) return;
    try {
      const updated = await patchRoom(roomId, { action: "start", playerId });
      setRoom(updated);
    } catch (err) {
      console.error("handleStart failed:", err);
    }
  }

  async function handleAddWord(word: string, maskEmoji: string) {
    if (!room) return;
    const updated = await patchRoom(roomId, { action: "addWord", playerId, word, maskEmoji });
    setRoom(updated);
  }

  async function handleRemoveWord(maskEmoji: string) {
    if (!room) return;
    try {
      const updated = await patchRoom(roomId, { action: "removeWord", playerId, maskEmoji });
      setRoom(updated);
    } catch (err) {
      console.error("handleRemoveWord failed:", err);
    }
  }

  async function handleReady() {
    if (!room) return;
    try {
      const updated = await patchRoom(roomId, { action: "ready", playerId });
      setRoom(updated);
    } catch (err) {
      console.error("handleReady failed:", err);
    }
  }

  async function handleVote(targetId: string) {
    if (!room) return;
    try {
      const updated = await patchRoom(roomId, { action: "vote", voterId: playerId, targetId });
      setRoom(updated);
    } catch (err) {
      console.error("handleVote failed:", err);
    }
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
        <LobbyPhase room={room} playerId={playerId} onStart={handleStart} onAddWord={handleAddWord} onRemoveWord={handleRemoveWord} />
      ) : room.phase === "reveal" ? (
        <RevealPhaseMulti room={room} playerId={playerId} onReady={handleReady} />
      ) : room.phase === "vote" ? (
        <VotePhaseMulti room={room} playerId={playerId} onVote={handleVote} />
      ) : (
        <ResultPhaseMulti room={room} playerId={playerId} onStart={handleStart} />
      )}
    </main>
  );
}
