import { defineConfig } from "vitest/config";
import { echoVitestConfig } from "../.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
      coverage: {
        reportsDirectory: "./coverage",
        include: ["src/**/*.ts", "__tests__/**/*.ts"],
        exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  }),
);
