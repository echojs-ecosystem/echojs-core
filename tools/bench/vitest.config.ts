import { defineConfig } from "vitest/config";
import { echoVitestConfig } from "../../packages/.configs/vitest.config";

export default defineConfig(
  echoVitestConfig(__dirname, {
    test: {
      environment: "node",
    },
  }),
);

