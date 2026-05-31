import type { Messages } from "../types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Resolves a dot-separated path against nested message objects.
 */
export const getMessageByPath = (
  messages: Messages | undefined,
  path: string,
): unknown => {
  if (!messages || path.length === 0) {
    return undefined;
  }

  const segments = path.split(".");
  let current: unknown = messages;

  for (const segment of segments) {
    if (!isRecord(current) || !(segment in current)) {
      return undefined;
    }
    current = current[segment];
  }

  return current;
};
