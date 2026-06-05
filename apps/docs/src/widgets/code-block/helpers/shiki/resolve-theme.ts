import { $themeMode } from "@core/providers/index.js";

export type ShikiThemeName = "github-light" | "github-dark";

export const resolveShikiTheme = (): ShikiThemeName => {
  const mode = $themeMode.value();
  if (mode === "dark") return "github-dark";
  if (mode === "light") return "github-light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "github-dark" : "github-light";
};
