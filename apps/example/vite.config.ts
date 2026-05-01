import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: [
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
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    exclude: ["@echojs-ecosystem/reactivity", "@echojs/hyperdom"],
  },
});
