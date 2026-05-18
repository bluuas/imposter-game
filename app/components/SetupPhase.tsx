"use client";

import { useState, useRef, useEffect } from "react";
import { Player, SetupData } from "@/lib/types";
import type { Translations } from "@/lib/i18n";
import { getWordCategories } from "@/data/words";
import FunModePicker from "./FunModePicker";
import LanguagePicker from "./LanguagePicker";
import { useLanguage } from "./LanguageProvider";
import { useRouter } from "next/navigation";

const EMOJIS = [
  "😀", "😎", "🤩", "🥳", "😈", "👻", "🤠", "🤓",
  "🐱", "🐸", "🦊", "🐼", "🦁", "🐯", "🦋", "🌟",
  "🔥", "⚡", "🎯", "🎮", "🚀", "💎", "🦄", "🎭",
];

function MultiplayerPicker({
  label,
  onCreate,
  onJoin,
  t,
}: {
  label: string;
  onCreate: () => void;
  onJoin: (code: string) => void;
  t: Translations;
}) {
  const [open, setOpen] = useState(false);
  const [joining, setJoining] = useState(false);
  const [code, setCode] = useState("");

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-[var(--card)] text-[var(--foreground)] text-base font-semibold py-4 rounded-2xl border border-[var(--card-2)]"
      >
        {label}
      </button>
    );
  }

  if (joining) {
    return (
      <div className="w-full bg-[var(--card)] rounded-2xl p-4 flex flex-col gap-3 border border-[var(--card-2)]">
        <p className="text-sm font-semibold text-center">{t.joinRoom}</p>
        <input
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 3))}
          onKeyDown={(e) => e.key === "Enter" && code.length === 3 && onJoin(code)}
          placeholder="ABC"
          className="w-full text-center text-2xl font-black tracking-widest px-4 py-3 rounded-xl bg-[var(--card-2)] text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-[var(--accent)] uppercase"
          maxLength={3}
        />
        <div className="flex gap-2">
          <button
            onClick={() => { setJoining(false); setCode(""); }}
            className="flex-1 py-3 rounded-xl bg-[var(--card-2)] text-[var(--text-muted)] text-sm font-medium"
          >
            {t.cancel}
          </button>
          <button
            onClick={() => onJoin(code)}
            disabled={code.length !== 3}
            className="flex-1 py-3 rounded-xl font-bold text-sm disabled:opacity-40 text-[var(--card)]"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {t.join}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--card)] rounded-2xl p-4 flex flex-col gap-3 border border-[var(--card-2)]">
      <p className="text-sm font-semibold text-center">{label}</p>
      <div className="flex gap-2">
        <button
          onClick={onCreate}
          className="flex-1 py-3 rounded-xl font-bold text-sm text-[var(--card)]"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {t.createRoom}
        </button>
        <button
          onClick={() => setJoining(true)}
          className="flex-1 py-3 rounded-xl bg-[var(--card-2)] text-[var(--foreground)] font-semibold text-sm"
        >
          {t.joinRoom}
        </button>
      </div>
      <button
        onClick={() => setOpen(false)}
        className="text-xs text-[var(--text-muted)] text-center"
      >
        {t.cancel}
      </button>
    </div>
  );
}

type Props = {
  initialData: SetupData;
  onStart: (data: SetupData) => void;
  onCreateRoom?: (data: SetupData) => void;
  onJoinRoom?: (code: string) => void;
};

export default function SetupPhase({ initialData, onStart, onCreateRoom, onJoinRoom }: Props) {
  const { locale, t } = useLanguage();
  const wordCategories = getWordCategories(locale);
  const [players, setPlayers] = useState<Player[]>(initialData.players);
  const [wordSource, setWordSource] = useState<"category" | "custom">(
    initialData.wordSource
  );
  const [category, setCategory] = useState(initialData.category);
  const [customWords, setCustomWords] = useState<string[]>(
    initialData.customWords
  );
  const [customWordInput, setCustomWordInput] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState(EMOJIS[0]);
  const addFormRef = useRef<HTMLDivElement>(null);
  const [hostModalOpen, setHostModalOpen] = useState(false);
  const [hostName, setHostName] = useState("");
  const [hostEmoji, setHostEmoji] = useState(EMOJIS[0]);

  useEffect(() => {
    if (showAddForm) {
      setTimeout(() => {
        addFormRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  }, [showAddForm]);

  function addPlayer() {
    const name = newName.trim();
    if (!name) return;
    const id = `${Date.now()}-${Math.random()}`;
    setPlayers((prev) => [...prev, { id, name, emoji: newEmoji }]);
    setNewName("");
    setNewEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
    setShowAddForm(false);
  }

  function removePlayer(id: string) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  function addCustomWord() {
    const word = customWordInput.trim();
    if (!word || customWords.includes(word)) return;
    setCustomWords((prev) => [...prev, word]);
    setCustomWordInput("");
  }

  function removeCustomWord(word: string) {
    setCustomWords((prev) => prev.filter((w) => w !== word));
  }

  const canStart =
    players.length >= 3 &&
    (wordSource === "category" || customWords.length >= 1);

  return (
    <div className="flex flex-col flex-1 p-4 gap-6 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between pt-6">
        <h1 className="text-3xl font-bold">{t.appName}</h1>
        <div className="flex gap-2">
          <LanguagePicker />
          <FunModePicker />
        </div>
      </div>

      {/* Players */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">
            {t.playersCount(players.length)}
          </h2>
          {players.length < 12 && !showAddForm && (
            <button
              onPointerDown={(e) => { e.preventDefault(); setShowAddForm(true); }}
              className="text-[var(--card)] px-4 py-2 rounded-xl text-sm font-medium"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              {t.addPlayer}
            </button>
          )}
        </div>

        {showAddForm && (
          <div ref={addFormRef} className="rounded-2xl p-4 mb-3 flex flex-col gap-3 bg-[var(--card)]">
            <input
              type="text"
              placeholder={t.playerNamePlaceholder}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              className="rounded-xl px-4 py-3 text-base w-full bg-[var(--card-2)] text-[var(--foreground)] placeholder-slate-400"
              maxLength={20}
            />
            <div>
              <p className="text-xs mb-2 text-[var(--text-muted)]">{t.chooseEmoji}</p>
              <div className="grid grid-cols-8 gap-1">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewEmoji(emoji)}
                    className="text-2xl p-1 rounded-lg"
                    style={{ backgroundColor: newEmoji === emoji ? 'var(--accent)' : 'var(--card-2)' }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewName("");
                }}
                className="flex-1 py-3 rounded-xl font-medium bg-[var(--card-2)] text-[var(--foreground)]"
              >
                {t.cancel}
              </button>
              <button
                onClick={addPlayer}
                disabled={!newName.trim()}
                className="flex-1 disabled:opacity-40 text-[var(--card)] py-3 rounded-xl font-medium"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {t.add} {newEmoji}
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {players.map((p) => (
            <div
              key={p.id}
              className="rounded-xl px-4 py-3 flex items-center justify-between bg-[var(--card)]"
            >
              <span className="text-xl">{p.emoji}</span>
              <span className="flex-1 ml-3 font-medium">{p.name}</span>
              <button
                onClick={() => removePlayer(p.id)}
                className="text-[var(--text-muted)] active:text-red-400 text-lg px-1"
                aria-label={`Remove ${p.name}`}
              >
                ✕
              </button>
            </div>
          ))}
          {players.length === 0 && (
            <p className="text-[var(--text-muted)] text-sm text-center py-4">
              {t.atLeast3Players}
            </p>
          )}
          {players.length > 0 && players.length < 3 && (
            <p className="text-[var(--text-muted)] text-xs text-center">
              {t.morePlayersNeeded(3 - players.length)}
            </p>
          )}
        </div>
      </section>

      {/* Word source */}
      <section>
        <h2 className="text-lg font-semibold mb-3">{t.wordSource}</h2>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setWordSource("category")}
            className={`flex-1 py-3 rounded-xl font-medium text-sm ${
              wordSource === "category"
                ? "text-[var(--card)]"
                : "bg-[var(--card)] text-[var(--text-muted)]"
            }`}
            style={wordSource === "category" ? { backgroundColor: 'var(--accent)' } : {}}
          >
            {t.categories}
          </button>
          <button
            onClick={() => setWordSource("custom")}
            className={`flex-1 py-3 rounded-xl font-medium text-sm ${
              wordSource === "custom"
                ? "text-[var(--card)]"
                : "bg-[var(--card)] text-[var(--text-muted)]"
            }`}
            style={wordSource === "custom" ? { backgroundColor: 'var(--accent)' } : {}}
          >
            {t.customWords}
          </button>
        </div>

        {wordSource === "category" && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-[var(--card)] text-[var(--foreground)]"
          >
            <option value="all">{t.allCategories}</option>
            {wordCategories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        {wordSource === "custom" && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.addAWord}
                value={customWordInput}
                onChange={(e) => setCustomWordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomWord()}
                className="flex-1 rounded-xl px-4 py-3 text-base bg-[var(--card)] text-[var(--foreground)]"
                maxLength={30}
              />
              <button
                onClick={addCustomWord}
                disabled={!customWordInput.trim()}
                className="disabled:opacity-40 text-[var(--card)] px-5 py-3 rounded-xl font-medium"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {t.add}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {customWords.map((w) => (
                <span
                  key={w}
                  className="text-sm px-3 py-1 rounded-full flex items-center gap-2 bg-[var(--card)]"
                >
                  {w}
                  <button
                    onClick={() => removeCustomWord(w)}
                    className="text-[var(--text-muted)] active:text-red-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {customWords.length === 0 && (
                <p className="text-[var(--text-muted)] text-sm">{t.addAtLeast1Word}</p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Start buttons */}
      <div className="mt-auto pb-8 flex flex-col gap-3">
        <button
          onClick={() =>
            onStart({ players, wordSource, category, customWords })
          }
          disabled={!canStart}
          className="w-full disabled:opacity-40 disabled:cursor-not-allowed text-[var(--card)] text-lg font-bold py-5 rounded-2xl"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {t.startGame}
        </button>
        {onCreateRoom && onJoinRoom && (
          <>
            <MultiplayerPicker
              label={t.createOnlineRoom}
              onCreate={() => setHostModalOpen(true)}
              onJoin={onJoinRoom}
              t={t}
            />

            {hostModalOpen && (
              <div className="w-full bg-[var(--card)] rounded-2xl p-4 mt-2 border border-[var(--card-2)]">
                <p className="text-sm font-semibold mb-2">{t.createRoom}</p>
                <input
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder={t.playerNamePlaceholder}
                  className="w-full px-3 py-2 rounded-xl mb-3 bg-[var(--card-2)] text-[var(--foreground)]"
                  maxLength={20}
                />

                <div className="flex flex-wrap gap-2 mb-3">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => setHostEmoji(e)}
                      className={`text-2xl p-2 rounded-md ${hostEmoji === e ? "ring-2 ring-[var(--accent)] scale-105" : "opacity-70"}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setHostModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-[var(--card-2)] text-[var(--text-muted)]"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={() => {
                      setHostModalOpen(false);
                      // Call parent with host info as second arg; parent may accept it
                      // @ts-ignore allow optional host param
                      onCreateRoom?.({ players: [], wordSource, category, customWords }, { name: hostName || "Host", emoji: hostEmoji });
                    }}
                    className="flex-1 py-3 rounded-xl font-bold text-[var(--card)]"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    {t.createRoom}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
