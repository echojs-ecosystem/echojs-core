import { createView, render, type Child } from "@echojs/hyperdom";

import { UIProvider } from "../providers";
import { createTheme, type UITheme } from "../theme";

export type HyperdomStoryOptions = {
  theme?: Partial<UITheme>;
  headless?: boolean;
};

let activeDispose: (() => void) | null = null;

/** Tears down the previous story mount (Storybook re-renders on args/globals change). */
export const disposeActiveHyperdomStory = (): void => {
  activeDispose?.();
  activeDispose = null;
};

/**
 * Mounts a hyperdom view for Storybook HTML stories.
 *
 * Uses {@link UIProvider} + {@link createView} (strict context + theme).
 */
export const renderHyperdomStory = (
  view: () => Child,
  options?: HyperdomStoryOptions,
): HTMLElement => {
  disposeActiveHyperdomStory();

  const root = document.createElement("div");
  root.setAttribute("data-echo-story-root", "");

  const View = createView(view, "StorybookView");
  const theme = options?.theme ? createTheme(options.theme) : undefined;

  activeDispose = render(
    UIProvider({
      theme,
      headless: options?.headless,
      children: () => View(undefined as void),
    }),
    root,
  );

  return root;
};
