import { createView, render, type Child } from "@echojs-ecosystem/hyperdom";

import { UIProvider, type UIProviderProps } from "./providers";

/** Mounts UI inside {@link UIProvider} + `createView` (hyperdom strict context). */
export const mountUI = (
  renderFn: () => Child,
  options?: Omit<UIProviderProps, "children">,
): HTMLElement => {
  const container = document.createElement("div");
  const View = createView(renderFn, "UITestView");

  render(
    UIProvider({
      ...options,
      children: () => View(undefined as void),
    }),
    container,
  );

  return container;
};
