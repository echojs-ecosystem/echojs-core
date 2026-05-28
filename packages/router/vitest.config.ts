import { defineConfig } from "vitest/config";
import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
      include: ["tests/**/*.test.ts"],
      environmentMatchGlobs: [
        ["tests/hyperdom-*.test.ts", "jsdom"],
        ["tests/browser-history.test.ts", "jsdom"],
        ["tests/hash-history.test.ts", "jsdom"],
      ],
    },
  }),
);
