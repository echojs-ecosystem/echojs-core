import type { Preview } from "@storybook/html";

import { createTheme, type UITheme } from "../src/theme";
import { disposeActiveHyperdomStory } from "../src/storybook/render-story";

import "../src/storybook/storybook.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  globalTypes: {
    themePreset: {
      name: "Theme",
      description: "UIProvider theme preset",
      defaultValue: "default",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "compact", title: "Compact" },
        ],
      },
    },
    headless: {
      name: "Headless",
      description: "Skip visual classes globally",
      defaultValue: "false",
      toolbar: {
        icon: "eye",
        items: [
          { value: "false", title: "Styled" },
          { value: "true", title: "Headless" },
        ],
      },
    },
  },
  decorators: [
    (story, context) => {
      disposeActiveHyperdomStory();

      const preset = context.globals.themePreset as string;
      const headless = context.globals.headless === "true";

      context.parameters.hyperdomTheme = resolveThemePreset(preset);
      context.parameters.hyperdomHeadless = headless;

      const node = story();
      const wrap = document.createElement("div");
      wrap.className = "echo-sb-story";
      wrap.append(node);
      return wrap;
    },
  ],
};

export default preview;

const resolveThemePreset = (preset: string): Partial<UITheme> | undefined => {
  if (preset === "compact") {
    return createTheme({
      components: {
        button: { defaultVariants: { size: "sm", variant: "outline" } },
        input: { defaultVariants: { size: "sm" } },
      },
    });
  }
  return undefined;
};
