import { getUIContextOrDefault } from "../theme/theme-context";

let idCounter = 0;

/** @internal Resets the id counter — for tests only. */
export const resetIdCounter = (): void => {
  idCounter = 0;
};

/**
 * Creates a unique id string.
 *
 * Uses the theme `prefix` from the active {@link UIProvider} when available.
 */
export const createId = (prefix?: string): string => {
  const ctx = getUIContextOrDefault();
  const base = prefix ?? ctx.theme.prefix ?? "echo";
  idCounter += 1;
  return `${base}-${idCounter}`;
};

/**
 * Alias for {@link createId} — hyperdom has no hook runtime; ids are created per call.
 */
export const useId = (prefix?: string): string => createId(prefix);
