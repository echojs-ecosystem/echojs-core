import { defineConfig } from "vitest/config";

import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
      environmentMatchGlobs: [
        ["src/extensions/with-local-storage.test.ts", "jsdom"],
        ["src/extensions/with-session-storage.test.ts", "jsdom"],
        ["src/extensions/with-cookie.test.ts", "jsdom"],
        ["src/extensions/with-indexed-db.test.ts", "jsdom"],
      ],
    },
  }),
);
