import { defineConfig, mergeConfig } from "vitest/config";
import { resolve } from "path";
import shared from "@echojs-ecosystem/oxc-config/vitest";

export default mergeConfig(
  shared,
  defineConfig({
    resolve: {
      alias: {
        "@echojs-ecosystem/reactivity": resolve(__dirname, "../reactivity/src/index.ts"),
        "@echojs/hyperdom": resolve(__dirname, "../hyperdom/src/index.ts"),
      },
    },
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
