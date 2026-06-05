import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

const src = resolve(__dirname, "src");
const frameworkRoot = resolve(__dirname, "../../packages/framework/src");

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
    ],
  },
  server: {
    port: 3001,
    open: true,
  },
  optimizeDeps: {
    exclude: ["@echojs-ecosystem/framework"],
  },
});
