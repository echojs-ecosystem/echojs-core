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
        find: /^@echojs-ecosystem\/hyperdom$/,
        replacement: resolve(__dirname, "../../packages/hyperdom/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/form$/,
        replacement: resolve(__dirname, "../../packages/form/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/router(\/hyperdom)?$/,
        replacement: resolve(__dirname, "../../packages/router/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/store$/,
        replacement: resolve(__dirname, "../../packages/store/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/persist$/,
        replacement: resolve(__dirname, "../../packages/persist/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/url-state$/,
        replacement: resolve(__dirname, "../../packages/url-state/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/query$/,
        replacement: resolve(__dirname, "../../packages/query/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/i18n$/,
        replacement: resolve(__dirname, "../../packages/i18n/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/framework\/app$/,
        replacement: resolve(__dirname, "../../packages/framework/src/app/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/framework$/,
        replacement: resolve(__dirname, "../../packages/framework/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/ui$/,
        replacement: resolve(__dirname, "../../packages/ui/src/index.ts"),
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
      "@echojs-ecosystem/hyperdom",
      "@echojs-ecosystem/form",
      "@echojs-ecosystem/router",
      "@echojs-ecosystem/store",
      "@echojs-ecosystem/persist",
      "@echojs-ecosystem/url-state",
      "@echojs-ecosystem/query",
      "@echojs-ecosystem/i18n",
      "@echojs-ecosystem/framework",
      "@echojs-ecosystem/ui",
    ],
  },
});
