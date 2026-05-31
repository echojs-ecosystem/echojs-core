import type { LocaleMessages, Messages } from "../types";

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const deepMerge = (
  target: Messages,
  source: Messages,
): Messages => {
  const result: Messages = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      result[key] = deepMerge(targetValue, sourceValue);
    } else {
      result[key] = sourceValue;
    }
  }

  return result;
};

export const cloneLocaleMessages = (
  messages: LocaleMessages,
): LocaleMessages => {
  const clone: LocaleMessages = {};

  for (const locale of Object.keys(messages)) {
    const localeMessages = messages[locale];
    if (localeMessages !== undefined) {
      clone[locale] = deepMerge({}, localeMessages);
    }
  }

  return clone;
};

export const ensureLocaleBucket = (
  store: LocaleMessages,
  locale: string,
): Messages => {
  const existing = store[locale];
  if (existing !== undefined) {
    return existing;
  }

  const bucket: Messages = {};
  store[locale] = bucket;
  return bucket;
};
