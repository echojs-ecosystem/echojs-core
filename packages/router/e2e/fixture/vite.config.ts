import { resolve } from "node:path";
import { defineConfig } from "vite";

const fixtureDir = resolve(import.meta.dirname);
const packagesDir = resolve(fixtureDir, "../../..");

export default defineConfig({
  root: fixtureDir,
  // Only this tsconfig — avoids picking up e2e/tests Playwright types in Vite.
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "bundler",
        strict: true,
        skipLibCheck: true,
      },
    },
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
  },
  resolve: {
    alias: [
      {
        find: "@echojs/router/hyperdom",
        replacement: resolve(packagesDir, "router/src/hyperdom/index.ts"),
      },
      { find: "@echojs/router", replacement: resolve(packagesDir, "router/src/index.ts") },
      { find: "@echojs/reactivity", replacement: resolve(packagesDir, "reactivity/src/index.ts") },
      { find: "@echojs/hyperdom", replacement: resolve(packagesDir, "hyperdom/src/index.ts") },
      { find: "@echojs/url-state", replacement: resolve(packagesDir, "url-state/src/index.ts") },
    ],
  },
  optimizeDeps: {
    exclude: ["@echojs/reactivity", "@echojs/hyperdom", "@echojs/router", "@echojs/url-state"],
  },
});
