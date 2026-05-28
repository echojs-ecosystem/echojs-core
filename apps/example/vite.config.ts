import { defineConfig } from "vite";
import { resolve } from "path";

const src = resolve(__dirname, "src");

export default defineConfig({
  resolve: {
    alias: [
      { find: "@app", replacement: resolve(src, "app") },
      { find: "@pages", replacement: resolve(src, "pages") },
      { find: "@entities", replacement: resolve(src, "entities") },
      { find: "@features", replacement: resolve(src, "features") },
      { find: "@widgets", replacement: resolve(src, "widgets") },
      { find: "@shared", replacement: resolve(src, "shared") },
      {
        find: /^@echojs-ecosystem\/reactivity$/,
        replacement: resolve(__dirname, "../../packages/reactivity/src/index.ts"),
      },
      {
        find: /^@echojs\/hyperdom$/,
        replacement: resolve(__dirname, "../../packages/hyperdom/src/index.ts"),
      },
      {
        find: /^@echojs\/form$/,
        replacement: resolve(__dirname, "../../packages/form/src/index.ts"),
      },
      {
        find: /^@echojs\/router\/hyperdom$/,
        replacement: resolve(__dirname, "../../packages/router/src/hyperdom/index.ts"),
      },
      {
        find: /^@echojs\/router$/,
        replacement: resolve(__dirname, "../../packages/router/src/index.ts"),
      },
      {
        find: /^@echojs\/store$/,
        replacement: resolve(__dirname, "../../packages/store/src/index.ts"),
      },
      {
        find: /^@echojs\/persist$/,
        replacement: resolve(__dirname, "../../packages/persist/src/index.ts"),
      },
      {
        find: /^@echojs\/url-state$/,
        replacement: resolve(__dirname, "../../packages/url-state/src/index.ts"),
      },
    ],
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    exclude: [
      "@echojs-ecosystem/reactivity",
      "@echojs/hyperdom",
      "@echojs/form",
      "@echojs/router",
      "@echojs/store",
      "@echojs/persist",
      "@echojs/url-state",
    ],
  },
});
