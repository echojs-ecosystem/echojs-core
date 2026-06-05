import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/html-vite";

const storybookDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(storybookDir, "..");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/addon-links"],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    const tailwindcss = (await import("@tailwindcss/vite")).default;

    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@echojs-ecosystem/hyperdom": resolve(packageRoot, "../hyperdom/src/index.ts"),
        },
      },
      optimizeDeps: {
        exclude: ["@echojs-ecosystem/hyperdom"],
      },
    });
  },
};

export default config;
