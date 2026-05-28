import { composeEventHandlers } from "./compose-event-handlers";
import { cn, type ClassValue } from "./cn";

export type MergeableProps = Record<string, unknown>;

const CLASS_KEYS = new Set(["class", "className"]);

const isEventHandlerKey = (key: string): boolean =>
  key.startsWith("on") || key.startsWith("on:");

const mergeClassValues = (...values: unknown[]): string | undefined => {
  const merged = cn(...(values as ClassValue[]));
  return merged || undefined;
};

const mergePair = (target: MergeableProps, source: MergeableProps | undefined): void => {
  if (!source) return;

  for (const [key, value] of Object.entries(source)) {
    if (value === undefined) continue;

    if (CLASS_KEYS.has(key)) {
      target[key] = mergeClassValues(target[key], value);
      continue;
    }

    if (isEventHandlerKey(key)) {
      const existing = target[key];
      target[key] = composeEventHandlers(
        value as (...args: never[]) => void,
        existing as (...args: never[]) => void,
        { checkDefaultPrevented: true },
      );
      continue;
    }

    target[key] = value;
  }
};

/**
 * Merges props with priority (lowest → highest): `defaultProps`, `providerProps`, `componentProps`.
 *
 * `class` / `className` are joined; event handlers are composed.
 */
export const mergeProps = <T extends MergeableProps>(
  defaultProps: MergeableProps | undefined,
  providerProps: MergeableProps | undefined,
  componentProps: T,
): T => {
  const merged: MergeableProps = {};

  mergePair(merged, defaultProps);
  mergePair(merged, providerProps);
  mergePair(merged, componentProps);

  return merged as T;
};
