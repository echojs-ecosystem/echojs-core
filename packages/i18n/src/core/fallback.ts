import { getMessageByPath } from "./path";
import type { LocaleMessages } from "../types";

export const resolveMessageValue = (
  store: LocaleMessages,
  locale: string,
  fallbackLocale: string,
  key: string,
): unknown => {
  const primary = getMessageByPath(store[locale], key);
  if (primary !== undefined) {
    return primary;
  }

  if (locale === fallbackLocale) {
    return undefined;
  }

  return getMessageByPath(store[fallbackLocale], key);
};

export const hasMessage = (
  store: LocaleMessages,
  locale: string,
  fallbackLocale: string,
  key: string,
): boolean => resolveMessageValue(store, locale, fallbackLocale, key) !== undefined;
