import { defineConfig } from "vitest/config";
import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
      include: ["__tests__/**/*.test.ts"],
      environmentMatchGlobs: [
        ["__tests__/local-storage.test.ts", "jsdom"],
        ["__tests__/session-storage.test.ts", "jsdom"],
        ["__tests__/cookie.test.ts", "jsdom"],
        ["__tests__/sync-tabs.test.ts", "jsdom"],
        ["__tests__/indexed-db.test.ts", "jsdom"],
      ],
    },
  }),
);
