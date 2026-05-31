import { resolveMessageValue } from "./fallback";
import { interpolate } from "./interpolation";
import { resolvePluralMessage } from "./plural";
import type { LocaleMessages, MissingKeyStrategy } from "../types";

export type TranslateContext = {
  getLocale: () => string;
  fallbackLocale: string;
  messages: LocaleMessages;
  missingKeyStrategy: MissingKeyStrategy;
};

const formatMissingKey = (
  key: string,
  strategy: MissingKeyStrategy,
): string => (strategy === "empty" ? "" : key);

export const createTranslator = (context: TranslateContext) => {
  const translate = (
    key: string,
    params?: Record<string, unknown>,
  ): string => {
    const locale = context.getLocale();
    const resolved = resolveMessageValue(
      context.messages,
      locale,
      context.fallbackLocale,
      key,
    );

    if (resolved === undefined) {
      return formatMissingKey(key, context.missingKeyStrategy);
    }

    const plural = resolvePluralMessage(resolved, locale, params);
    if (plural !== undefined) {
      return plural;
    }

    if (typeof resolved === "string") {
      return interpolate(resolved, params);
    }

    return formatMissingKey(key, context.missingKeyStrategy);
  };

  return { translate };
};
