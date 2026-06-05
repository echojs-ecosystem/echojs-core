import { createProvider } from "@echojs/framework/app";
import { initTheme, type ThemeMode } from "@shared/theme/theme-store.js";

export const themeProvider = createProvider({
  name: "theme",
  setup() {
    initTheme();
  },
});

export type { ThemeMode };
