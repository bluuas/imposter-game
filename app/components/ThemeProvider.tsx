"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Theme, THEMES, DEFAULT_THEME } from "@/lib/themes";

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const saved = localStorage.getItem("imposter-theme");
    if (saved) {
      const found = THEMES.find((t) => t.emoji === saved);
      if (found) setThemeState(found);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.fish = theme.fish ? "true" : "";
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("imposter-theme", t.emoji);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <style>{`
        :root {
          --accent: ${theme.accent};
          --accent-dark: ${theme.accentDark};
          --page-bg: ${theme.pageBg};
          --foreground: ${theme.foreground};
          --card: ${theme.card};
          --card-2: ${theme.card2};
          --text-muted: ${theme.textMuted};
        }
      `}</style>
      {children}
    </ThemeContext.Provider>
  );
}
