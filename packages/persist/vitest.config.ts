import { defineConfig, mergeConfig } from "vitest/config";
import { resolve } from "path";
import shared from "@echojs-ecosystem/oxc-config/vitest";

export default mergeConfig(
  shared,
  defineConfig({
    resolve: {
      alias: {
        "@echojs-ecosystem/reactivity": resolve(__dirname, "../reactivity/src/index.ts"),
        "@echojs/store": resolve(__dirname, "../store/src/index.ts"),
      },
    },
    test: {
      environment: "node",
      include: ["tests/**/*.test.ts"],
      environmentMatchGlobs: [
        ["tests/local-storage.test.ts", "jsdom"],
        ["tests/session-storage.test.ts", "jsdom"],
        ["tests/cookie.test.ts", "jsdom"],
        ["tests/sync-tabs.test.ts", "jsdom"],
        ["tests/indexed-db.test.ts", "jsdom"],
      ],
    },
  }),
);
