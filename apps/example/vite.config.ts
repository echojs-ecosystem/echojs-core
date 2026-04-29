import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@echojs-ecosystem\/core$/,
        replacement: resolve(__dirname, "../../packages/core/src/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/core\/jsx-runtime$/,
        replacement: resolve(__dirname, "../../packages/core/src/jsx-runtime.ts"),
      },
      {
        find: /^@echojs-ecosystem\/core\/jsx-dev-runtime$/,
        replacement: resolve(__dirname, "../../packages/core/src/jsx-runtime.ts"),
      },
      {
        find: /^@echojs-ecosystem\/reactivity$/,
        replacement: resolve(__dirname, "../../packages/reactivity/src/index.ts"),
      },
      {
        find: /^@echojs\/hyperdom$/,
        replacement: resolve(__dirname, "../../packages/hyperdom/src/index.ts"),
      },
    ],
  },
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@echojs-ecosystem/core",
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    exclude: ["@echojs-ecosystem/core", "@echojs-ecosystem/reactivity", "@echojs/hyperdom"],
  },
});
