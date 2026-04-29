import { defineConfig, mergeConfig } from "vitest/config";
import shared from "@echojs-ecosystem/oxc-config/vitest";

export default mergeConfig(
  shared,
  defineConfig({
    test: {
      environment: "happy-dom",
    },
  }),
);

