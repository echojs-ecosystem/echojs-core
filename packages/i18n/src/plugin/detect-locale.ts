export type DetectLocaleOptions<TLocale extends string> = {
  supported: readonly TLocale[];
  fallback: TLocale;
  storageKey?: string;
  /** e.g. `{ prefix: "ru", locale: "ru" }` when `navigator.language` matches. */
  navigatorRules?: ReadonlyArray<{ prefix: string; locale: TLocale }>;
};

export const detectLocale = <TLocale extends string>(
  options: DetectLocaleOptions<TLocale>,
): TLocale => {
  const { supported, fallback, storageKey, navigatorRules } = options;
  const isSupported = (value: string): value is TLocale =>
    (supported as readonly string[]).includes(value);

  if (storageKey && typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(storageKey);
    if (stored && isSupported(stored)) {
      return stored;
    }
  }

  if (navigatorRules?.length && typeof navigator !== "undefined") {
    const lang = navigator.language.toLowerCase();
    for (const rule of navigatorRules) {
      if (lang.startsWith(rule.prefix)) {
        return rule.locale;
      }
    }
  }

  return fallback;
};
