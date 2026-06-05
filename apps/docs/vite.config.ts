import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

const src = resolve(__dirname, "src");
const packages = resolve(__dirname, "../../packages");

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: [
      { find: "@app", replacement: resolve(src, "app") },
      { find: "@pages", replacement: resolve(src, "pages") },
      { find: "@entities", replacement: resolve(src, "entities") },
      { find: "@widgets", replacement: resolve(src, "widgets") },
      { find: "@core", replacement: resolve(src, "core") },
      { find: "@content", replacement: resolve(src, "content") },
      {
        find: /^@echojs\/reactivity$/,
        replacement: resolve(packages, "reactivity/src/index.ts"),
      },
      {
        find: /^@echojs\/hyperdom$/,
        replacement: resolve(packages, "hyperdom/src/index.ts"),
      },
      {
        find: /^@echojs\/hyperdom\/lifecycle\/mount$/,
        replacement: resolve(packages, "hyperdom/src/lifecycle/mount.ts"),
      },
      {
        find: /^@echojs\/hyperdom\/lifecycle\/reactive$/,
        replacement: resolve(packages, "hyperdom/src/lifecycle/reactive.ts"),
      },
      {
        find: /^@echojs\/router\/hyperdom$/,
        replacement: resolve(packages, "router/src/hyperdom/index.ts"),
      },
      {
        find: /^@echojs\/router$/,
        replacement: resolve(packages, "router/src/index.ts"),
      },
      {
        find: /^@echojs\/store$/,
        replacement: resolve(packages, "store/src/index.ts"),
      },
      {
        find: /^@echojs\/persist$/,
        replacement: resolve(packages, "persist/src/index.ts"),
      },
      {
        find: /^@echojs\/url-state$/,
        replacement: resolve(packages, "url-state/src/index.ts"),
      },
      {
        find: /^@echojs\/query$/,
        replacement: resolve(packages, "query/src/index.ts"),
      },
      {
        find: /^@echojs\/i18n$/,
        replacement: resolve(packages, "i18n/src/index.ts"),
      },
      {
        find: /^@echojs\/framework\/app$/,
        replacement: resolve(packages, "framework/src/app/index.ts"),
      },
      {
        find: /^@echojs\/framework$/,
        replacement: resolve(packages, "framework/src/index.ts"),
      },
      {
        find: /^@echojs\/ui$/,
        replacement: resolve(packages, "ui/src/index.ts"),
      },
    ],
  },
  server: {
    port: 3001,
    open: true,
  },
  optimizeDeps: {
    exclude: [
      "@echojs/reactivity",
      "@echojs/hyperdom",
      "@echojs/router",
      "@echojs/store",
      "@echojs/url-state",
      "@echojs/query",
      "@echojs/i18n",
      "@echojs/framework",
      "@echojs/ui",
    ],
  },
});
