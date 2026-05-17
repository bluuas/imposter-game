"use client";

import type { Locale } from "@/lib/i18n";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";

const LOCALE_EMOJI: Record<Locale, string> = {
  en: "🎣",
  de: "🍺",
  it: "🍕",
  fr: "🥖",
  es: "💃",
  sv: "🫎",
};

export default function FunModePicker() {
  const { funMode, toggleFunMode } = useTheme();
  const { locale } = useLanguage();
  const emoji = LOCALE_EMOJI[locale];
  const label = funMode ? "Disable fun mode" : "Enable fun mode";

  return (
    <button
      onPointerDown={(e) => { e.preventDefault(); toggleFunMode(); }}
      className={`text-xl p-2 rounded-xl bg-[var(--card)] active:opacity-70 transition-opacity ${funMode ? "opacity-100 ring-2 ring-[var(--accent)]" : "opacity-60"}`}
      aria-label={label}
      title={label}
    >
      {emoji}
    </button>
  );
}

