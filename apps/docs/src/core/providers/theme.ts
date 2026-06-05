import { createProvider } from "@echojs-ecosystem/framework/app";
import { initTheme, type ThemeMode } from "./theme-store.js";

export const themeProvider = createProvider({
  name: "theme",
  setup() {
    initTheme();
  },
});

export type { ThemeMode };
