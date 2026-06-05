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
        find: /^@echojs-ecosystem\/reactivity$/,
        replacement: resolve(packages, "reactivity/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/hyperdom$/,
        replacement: resolve(packages, "hyperdom/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/hyperdom\/lifecycle\/mount$/,
        replacement: resolve(packages, "hyperdom/src/lifecycle/mount.ts"),
      },
      {
        find: /^@echojs-ecosystem\/hyperdom\/lifecycle\/reactive$/,
        replacement: resolve(packages, "hyperdom/src/lifecycle/reactive.ts"),
      },
      {
        find: /^@echojs-ecosystem\/router\/hyperdom$/,
        replacement: resolve(packages, "router/src/hyperdom/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/router$/,
        replacement: resolve(packages, "router/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/store$/,
        replacement: resolve(packages, "store/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/persist$/,
        replacement: resolve(packages, "persist/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/url-state$/,
        replacement: resolve(packages, "url-state/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/query$/,
        replacement: resolve(packages, "query/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/i18n$/,
        replacement: resolve(packages, "i18n/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/framework\/app$/,
        replacement: resolve(packages, "framework/src/app/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/framework$/,
        replacement: resolve(packages, "framework/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/ui$/,
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
      "@echojs-ecosystem/reactivity",
      "@echojs-ecosystem/hyperdom",
      "@echojs-ecosystem/router",
      "@echojs-ecosystem/store",
      "@echojs-ecosystem/url-state",
      "@echojs-ecosystem/query",
      "@echojs-ecosystem/i18n",
      "@echojs-ecosystem/framework",
      "@echojs-ecosystem/ui",
    ],
  },
});
