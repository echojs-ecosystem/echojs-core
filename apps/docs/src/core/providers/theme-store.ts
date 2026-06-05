import { effect, signal } from "@echojs-ecosystem/framework/reactivity";

export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "echojs-docs-theme";

export const $themeMode = signal<ThemeMode>("system");

const resolveEffective = (mode: ThemeMode): "light" | "dark" => {
  if (mode === "light" || mode === "dark") return mode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyClass = (effective: "light" | "dark"): void => {
  document.documentElement.classList.toggle("dark", effective === "dark");
};

export const initTheme = (): void => {
  const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored === "light" || stored === "dark" || stored === "system") {
    $themeMode.set(stored);
  }

  effect(() => {
    applyClass(resolveEffective($themeMode.value()));
  });

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", () => {
    if ($themeMode.value() === "system") applyClass(resolveEffective("system"));
  });
};

export const setThemeMode = (mode: ThemeMode): void => {
  $themeMode.set(mode);
  localStorage.setItem(STORAGE_KEY, mode);
};

export const toggleTheme = (): void => {
  const next = resolveEffective($themeMode.value()) === "dark" ? "light" : "dark";
  setThemeMode(next);
};
