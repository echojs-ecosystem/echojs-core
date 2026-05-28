import { defineConfig } from "vitest/config";
import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
      include: ["__tests__/**/*.test.ts", "__tests__/**/*.test-d.ts"],
    },
  }),
);
