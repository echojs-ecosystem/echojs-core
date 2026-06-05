import { createModel } from "@echojs-ecosystem/hyperdom";
import { $themeMode, toggleTheme } from "@core/providers/index.js";

export type ThemeToggleVM = {
  isDarkMode: () => boolean;
  toggle: () => void;
};

export const createThemeToggleModel = createModel((): ThemeToggleVM => {
  return {
    isDarkMode: () => {
      if ($themeMode.value() === "dark") return true;
      if ($themeMode.value() === "light") return false;
      return (
        typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    },
    toggle: toggleTheme,
  };
}, "ThemeToggleModel");
