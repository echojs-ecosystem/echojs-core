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
      {
        find: /^@echojs-ecosystem\/framework\/hyperdom\/lifecycle\/mount$/,
        replacement: resolve(frameworkRoot, "hyperdom-lifecycle-mount.ts"),
      },
      {
        find: /^@echojs-ecosystem\/framework\/ui\/(.+)$/,
        replacement: `${resolve(frameworkRoot, "ui")}/$1.ts`,
      },
      {
        find: /^@echojs-ecosystem\/framework\/app$/,
        replacement: resolve(frameworkRoot, "app/index.ts"),
      },
      {
        find: /^@echojs-ecosystem\/framework\/router\/hyperdom$/,
        replacement: resolve(frameworkRoot, "router.ts"),
      },
      {
        find: /^@echojs-ecosystem\/framework\/(.+)$/,
        replacement: `${frameworkRoot}/$1.ts`,
      },
      {
        find: /^@echojs-ecosystem\/framework$/,
        replacement: resolve(frameworkRoot, "index.ts"),
      },
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
