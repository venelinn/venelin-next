"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import styles from "./ThemeSwitcher.module.scss";

type ThemeSwitcherVariant = "icon" | "text" | "icon+text";
type Theme = "light" | "dark";

interface ThemeSwitcherProps {
  variant?: ThemeSwitcherVariant;
}

const ThemeSwitcher = ({ variant = "icon" }: ThemeSwitcherProps) => {
  const getLocalStorageTheme = (): Theme | undefined => {
    if (typeof localStorage !== "undefined") {
      try {
        const localTheme = localStorage.getItem("theme");
        if (localTheme && (localTheme === "light" || localTheme === "dark")) {
          return localTheme as Theme;
        }
      } catch (err: any) {
        console.warn("Can’t access local storage:", err.message);
      }
    }
    return undefined;
  };

  const setLocalStorageTheme = (theme: Theme): void => {
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("theme", theme);
      } catch (err: any) {
        console.warn("Can’t write to local storage:", err.message);
      }
    }
  };

  const [theme, setTheme] = useState<Theme>(getLocalStorageTheme() || "light");

  useEffect(() => {
    const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!getLocalStorageTheme()) {
      // Check again if theme is NOT in local storage
      setTheme(defaultDark ? "dark" : "light");
    }
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const switchTheme = (): void => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setLocalStorageTheme(newTheme);
  };

  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  const renderIcon = () => (
    <span aria-hidden="true" className={styles.icon}>
      <Icon name={isDark ? "SunMoon" : "Moon"} size="1.2em" />
    </span>
  );

  const renderText = () => <span className={styles.text}>{nextTheme} Theme</span>;

  return (
    <button
			type="button"
      onClick={switchTheme}
      title={`Switch to ${nextTheme} theme`}
      // className={`${styles.themeToggle} ${styles[variant]}`}
      data-theme={theme}
    >
      <span className="sr-only">Switch to {nextTheme} theme</span>
      {(variant === "icon" || variant === "icon+text") && renderIcon()}
      {(variant === "text" || variant === "icon+text") && renderText()}
    </button>
  );
};

export default ThemeSwitcher;
export { ThemeSwitcher };
