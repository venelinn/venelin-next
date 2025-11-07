"use client";
import { useEffect, useState } from "react";
import type { Theme } from "@/types/types";
import styles from "./ThemeSwitcher.module.scss";

export const ThemeSwitcher = () => {
  const getLocalStorageTheme = (): Theme | undefined => {
    if (typeof window !== "undefined") {
      try {
        const localTheme = localStorage.getItem("theme");
        if (localTheme === "light" || localTheme === "dark") {
          return localTheme as Theme;
        }
      } catch (err: any) {
        console.warn("Can’t access local storage:", err.message);
      }
    }
    return undefined;
  };

  const setLocalStorageTheme = (theme: Theme): void => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", theme);
      } catch (err: any) {
        console.warn("Can’t write to local storage:", err.message);
      }
    }
  };

  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const localTheme = getLocalStorageTheme();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = localTheme || (prefersDark ? "dark" : "light");
    setTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) document.body.dataset.theme = theme;
  }, [theme, mounted]);

  const switchTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setLocalStorageTheme(newTheme);
  };

  if (!mounted) {
    // Don’t render text depending on client-only state during SSR
    return <button type="button" title="Switch theme" className={styles.themeToggle} aria-label="Switch theme" />;
  }

  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={switchTheme}
      title={`Switch to ${nextTheme} theme`}
      className={styles.themeToggle}
      data-theme={theme}
    >
      <span className="sr-only" aria-hidden="true">
        Switch to {nextTheme} theme
      </span>
    </button>
  );
};
