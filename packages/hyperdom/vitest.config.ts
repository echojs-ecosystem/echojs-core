import { defineConfig } from "vitest/config";
import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "jsdom",
      include: ["__tests__/**/*.test.ts"],
    },
  }),
);
