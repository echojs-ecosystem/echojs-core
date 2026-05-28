import type { Child } from "@echojs/hyperdom";
import {
  createUIContextValue,
  runWithUIContext,
  type CreateUIContextInput,
} from "../theme/theme-context";
import type { UITheme } from "../theme/types";

export type UIProviderProps = CreateUIContextInput & {
  theme?: Partial<UITheme>;
  children?: Child | (() => Child);
};

const resolveChildren = (children: UIProviderProps["children"]): Child | undefined => {
  if (typeof children === "function") {
    return children();
  }
  return children;
};

/**
 * Root provider for global UI configuration (theme, headless mode, defaults).
 *
 * Prefer lazy children so descendants render inside context:
 *
 * ```ts
 * UIProvider({ theme, children: () => App() })
 * ```
 */
export const UIProvider = (props: UIProviderProps): Child => {
  const value = createUIContextValue({
    theme: props.theme,
    headless: props.headless,
  });

  return runWithUIContext(value, () => resolveChildren(props.children));
};
