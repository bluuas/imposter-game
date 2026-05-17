import type { Locale } from "@/lib/i18n";

export type Theme = {
  emoji: string;
  name: string;
  accent: string;
  accentDark: string;
  pageBg: string;
  foreground: string;
  card: string;
  card2: string;
  textMuted: string;
  mode: "dark" | "light";
  unicorn?: boolean;
  fish?: boolean;
};

// Shared light-grey base
const G = {
  pageBg: "#f1f5f9",
  foreground: "#1e293b",
  card: "#ffffff",
  card2: "#e2e8f0",
  textMuted: "#64748b",
  mode: "light" as const,
};

export const THEMES: Theme[] = [
  { emoji: "🫐", name: "Blueberry", accent: "#2563eb", accentDark: "#1d4ed8", ...G },
  // 🎣 Easter egg — animated ocean background + fish parade
  {
    emoji: "🎣", name: "Fishing",
    accent: "#0284c7", accentDark: "#075985",
    pageBg: "transparent",
    foreground: "#0c4a6e",
    card: "#f0f9ff",
    card2: "#bae6fd",
    textMuted: "#0369a1",
    mode: "light",
    fish: true,
  },
];

export const DEFAULT_THEME = THEMES[0];

export type LocaleTheme = {
  accent: string;
  accentDark: string;
  pageBg: string;
  foreground: string;
  card: string;
  card2: string;
  textMuted: string;
};

// Per-locale colour palettes — applied when fun mode is active
export const LOCALE_THEMES: Partial<Record<Locale, LocaleTheme>> = {
  // 🎣 EN — Fishing: ocean blues
  en: {
    accent: "#0284c7", accentDark: "#075985",
    pageBg: "transparent",
    foreground: "#0c4a6e", card: "#f0f9ff", card2: "#bae6fd", textMuted: "#0369a1",
  },
  // 🍺 DE — Oktoberfest: warm amber / wheat
  de: {
    accent: "#d97706", accentDark: "#b45309",
    pageBg: "transparent",
    foreground: "#422006", card: "#fffbeb", card2: "#fef3c7", textMuted: "#78350f",
  },
  // 🍕 IT — La Dolce Vita: terracotta sunset
  it: {
    accent: "#dc2626", accentDark: "#b91c1c",
    pageBg: "transparent",
    foreground: "#431407", card: "#fff7ed", card2: "#fee2e2", textMuted: "#9a3412",
  },
  // 🥖 FR — Magnifique: lavender-blue dusk
  fr: {
    accent: "#7c3aed", accentDark: "#6d28d9",
    pageBg: "transparent",
    foreground: "#1e1b4b", card: "#f5f3ff", card2: "#ede9fe", textMuted: "#5b21b6",
  },
  // 🐂 ES — Fiesta: Spanish gold + red
  es: {
    accent: "#dc2626", accentDark: "#b91c1c",
    pageBg: "transparent",
    foreground: "#450a0a", card: "#fffbeb", card2: "#fef9c3", textMuted: "#7f1d1d",
  },
  // 🫎 SV — Norrsken: pastel northern lights
  sv: {
    accent: "#16a34a", accentDark: "#15803d",
    pageBg: "transparent",
    foreground: "#052e16", card: "#f0fdf4", card2: "#dcfce7", textMuted: "#166534",
  },
};

export type EmojiColor = { bg: string; border: string; text: string };

const EMOJI_COLORS: Record<string, EmojiColor> = {
  "😀": { bg: "#2d2200", border: "#fbbf24", text: "#fde68a" },
  "😎": { bg: "#001a2d", border: "#60a5fa", text: "#bfdbfe" },
  "🤩": { bg: "#2d1a00", border: "#f59e0b", text: "#fde68a" },
  "🥳": { bg: "#2d0a1a", border: "#f472b6", text: "#fbcfe8" },
  "😈": { bg: "#1a0a2d", border: "#c084fc", text: "#e9d5ff" },
  "👻": { bg: "#1a1a2d", border: "#94a3b8", text: "#e2e8f0" },
  "🤠": { bg: "#2d1a05", border: "#fb923c", text: "#fed7aa" },
  "🤓": { bg: "#001a2d", border: "#38bdf8", text: "#bae6fd" },
  "🐱": { bg: "#2d1a05", border: "#fb923c", text: "#fed7aa" },
  "🐸": { bg: "#052d10", border: "#4ade80", text: "#bbf7d0" },
  "🦊": { bg: "#2d1200", border: "#f97316", text: "#fed7aa" },
  "🐼": { bg: "#1a1a1a", border: "#94a3b8", text: "#e2e8f0" },
  "🦁": { bg: "#2d2200", border: "#fbbf24", text: "#fde68a" },
  "🐯": { bg: "#2d1a00", border: "#f97316", text: "#fed7aa" },
  "🦋": { bg: "#1a0a2d", border: "#c084fc", text: "#e9d5ff" },
  "🌟": { bg: "#2d2900", border: "#facc15", text: "#fef08a" },
  "🔥": { bg: "#2d0a00", border: "#f87171", text: "#fecaca" },
  "⚡": { bg: "#1a1a00", border: "#facc15", text: "#fef08a" },
  "🎯": { bg: "#2d0a0a", border: "#f87171", text: "#fecaca" },
  "🎮": { bg: "#0a1a2d", border: "#60a5fa", text: "#bfdbfe" },
  "🚀": { bg: "#0a0a2d", border: "#818cf8", text: "#e0e7ff" },
  "💎": { bg: "#002d2d", border: "#67e8f9", text: "#cffafe" },
  "🦄": { bg: "#2d0a1a", border: "#f472b6", text: "#fbcfe8" },
  "🎭": { bg: "#1a0a2d", border: "#a78bfa", text: "#ede9fe" },
};

export function getEmojiColor(emoji: string): EmojiColor {
  return EMOJI_COLORS[emoji] ?? { bg: "#1e1b4b", border: "#818cf8", text: "#e0e7ff" };
}
