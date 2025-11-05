import type { Theme } from "@/types/types";

export const getLocalStorageTheme = (): Theme | null => {
  try {
    const localTheme = localStorage?.getItem("theme");
    if (localTheme === "light" || localTheme === "dark") {
      return localTheme;
    }
  } catch (err) {
    console.warn("Can’t access local storage:", (err as Error).message);
  }
  return null;
};

export const setLocalStorageTheme = (theme: Theme): void => {
  try {
    localStorage?.setItem("theme", theme);
  } catch (err) {
    console.warn("Can’t write to local storage:", (err as Error).message);
  }
};

export const getBrowserTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const scrollAfterThemeChange = (direction: "up" | "down" = "down"): void => {
  if (typeof window === "undefined") return;

  const scrollDistance = direction === "up" ? -200 : 200;
  window.scrollBy({ top: scrollDistance, behavior: "smooth" });
};
