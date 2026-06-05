import type { Child } from "@echojs-ecosystem/hyperdom";

import { UIProvider, type UIProviderProps } from "../providers/UIProvider";

export type UiProviderOptions = Omit<UIProviderProps, "children">;

/** @deprecated Use {@link UiProviderOptions} */
export type UiPluginOptions = UiProviderOptions;

/** Echo app provider that wraps the tree with {@link UIProvider}. */
export type EchoUiProvider = {
  name: "ui";
  wrapRoot: (inner: () => Child) => () => Child;
};

/** @deprecated Use {@link EchoUiProvider} */
export type UiPlugin = EchoUiProvider;

export const createUiProvider = (options: UiProviderOptions = {}): EchoUiProvider => ({
  name: "ui",
  wrapRoot(inner) {
    return () => UIProvider({ ...options, children: inner });
  },
});

/** @deprecated Use {@link createUiProvider} */
export const createUiPlugin = createUiProvider;

/** @deprecated Use {@link createUiProvider} */
export const uiPlugin = createUiProvider;
