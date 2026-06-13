import { defineConfig } from "vitest/config";

import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
      include: ["core/src/**/*.test.ts", "http/src/**/*.test.ts"],
    },
  }),
);
