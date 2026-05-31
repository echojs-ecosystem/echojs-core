import { defineConfig } from "vitest/config";

import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
      setupFiles: ["./src/vitest.setup.ts"],
      environmentMatchGlobs: [
        ["src/hyperdom/**/*.test.ts", "jsdom"],
        ["src/histories/browser-history.test.ts", "jsdom"],
        ["src/histories/hash-history.test.ts", "jsdom"],
      ],
    },
  }),
);
