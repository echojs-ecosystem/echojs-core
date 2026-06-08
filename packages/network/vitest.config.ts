import { defineConfig } from "vitest/config";

import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
      include: ["src/**/*.test.ts", "src/**/*.integration.test.ts"],
      typecheck: {
        enabled: true,
        include: ["src/**/*.test-d.ts", "src/**/*.test-d.tsx"],
        tsconfig: "./tsconfig.typing.json",
      },
    },
  }),
);
