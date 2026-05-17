"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { DEFAULT_THEME, LOCALE_THEMES } from "@/lib/themes";
import { useLanguage } from "./LanguageProvider";

type ThemeContextType = {
  funMode: boolean;
  toggleFunMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  funMode: false,
  toggleFunMode: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [funMode, setFunMode] = useState(false);
  const { locale } = useLanguage();

  // Reset fun mode whenever the locale changes
  useEffect(() => {
    setFunMode(false);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.fish = funMode && locale === "en" ? "true" : "";
    document.documentElement.dataset.locale = funMode && locale !== "en" ? locale : "";
  }, [funMode, locale]);

  function toggleFunMode() {
    setFunMode((v) => !v);
  }

  const base = DEFAULT_THEME;
  const localeOverride = funMode ? LOCALE_THEMES[locale] : undefined;
  const colors = localeOverride ? { ...base, ...localeOverride } : base;

  return (
    <ThemeContext.Provider value={{ funMode, toggleFunMode }}>
      <style>{`
        :root {
          --accent: ${colors.accent};
          --accent-dark: ${colors.accentDark};
          --page-bg: ${colors.pageBg};
          --foreground: ${colors.foreground};
          --card: ${colors.card};
          --card-2: ${colors.card2};
          --text-muted: ${colors.textMuted};
        }
      `}</style>
      {children}
    </ThemeContext.Provider>
  );
}
