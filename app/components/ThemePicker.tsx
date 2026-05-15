"use client";

import { THEMES } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

const BLUEBERRY = THEMES[0];
const FISH       = THEMES[1];

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const isFish = theme.fish ?? false;

  return (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        setTheme(isFish ? BLUEBERRY : FISH);
      }}
      className="text-xl p-2 rounded-xl bg-[var(--card)] active:opacity-70"
      aria-label={isFish ? "Disable fishing mode" : "Enable fishing mode"}
      title={isFish ? "Disable fishing mode" : "Enable fishing mode"}
    >
      🎣
    </button>
  );
}

