import { defineConfig } from 'vitest/config'

/**
 * Shared Vitest configuration for EchoJS packages.
 * Extend in your package:
 *
 * ```ts
 * import { defineConfig, mergeConfig } from "vitest/config";
 * import shared from "@echojs/oxc-config/vitest";
 *
 * export default mergeConfig(shared, defineConfig({
 *   test: {
 *     environment: "node",
 *   },
 * }));
 * ```
 */
export default defineConfig({
  test: {
    globals: true,
    include: ['__tests__/**/*.test.ts', 'src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
