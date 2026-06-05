import type { Child } from "@echojs-ecosystem/hyperdom";

import type { HyperdomStoryOptions } from "./render-story";
import { renderHyperdomStory } from "./render-story";

/** Reads theme/headless from `.storybook/preview.ts` decorators. */
export const hyperdomFromContext = (context: {
  parameters?: Record<string, unknown>;
}): HyperdomStoryOptions => ({
  theme: context.parameters?.hyperdomTheme as HyperdomStoryOptions["theme"],
  headless: Boolean(context.parameters?.hyperdomHeadless),
});

export const hyperdomRender =
  (view: (args: Record<string, unknown>) => Child) =>
  (args: Record<string, unknown>, context: { parameters?: Record<string, unknown> }) =>
    renderHyperdomStory(() => view(args), hyperdomFromContext(context));
