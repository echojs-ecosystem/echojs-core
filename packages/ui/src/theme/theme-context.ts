import { createTheme } from "./create-theme";
import { defaultTheme } from "./default-theme";
import type { UITheme } from "./types";

/** Resolved runtime configuration from {@link UIProvider}. */
export type UIContextValue = {
  theme: UITheme;
  headless: boolean;
};

const stack: UIContextValue[] = [];

/** Returns the active UI context or `undefined` outside a provider. */
export const getUIContext = (): UIContextValue | undefined => stack[stack.length - 1];

/** Returns the active UI context, falling back to defaults. */
export const getUIContextOrDefault = (): UIContextValue => getUIContext() ?? createUIContextValue({});

export type CreateUIContextInput = {
  theme?: Partial<UITheme>;
  headless?: boolean;
};

/** Builds a fully resolved context value from partial provider props. */
export const createUIContextValue = (
  input: CreateUIContextInput,
  parent: UIContextValue | undefined = getUIContext(),
): UIContextValue => {
  const parentTheme = parent?.theme ?? defaultTheme;
  const theme = createTheme(input.theme ?? {}, parentTheme);

  const headless = input.headless ?? theme.headless ?? parent?.headless ?? false;

  return {
    theme: { ...theme, headless },
    headless,
  };
};

/** Runs `fn` with `value` pushed onto the UI context stack. */
export const runWithUIContext = <T>(value: UIContextValue, fn: () => T): T => {
  stack.push(value);
  try {
    return fn();
  } finally {
    stack.pop();
  }
};

/** @internal Resets the context stack — for tests only. */
export const resetUIContextStack = (): void => {
  stack.length = 0;
};
