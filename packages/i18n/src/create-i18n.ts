import {
  cloneLocaleMessages,
  deepMerge,
  ensureLocaleBucket,
} from "./core/messages";
import { hasMessage } from "./core/fallback";
import {
  formatCurrency,
  formatDate,
  formatNumber,
  formatRelativeTime,
} from "./core/formatter";
import {
  isLocaleImporter,
  resolveLocaleModule,
  resolveLocaleModuleSync,
} from "./core/locale-source";
import { detectLocale } from "./plugin/detect-locale";
import { effect } from "@echojs/reactivity";
import { createLocaleState } from "./core/locale";
import { createTranslator } from "./core/translator";
import type {
  AnyLocalesMap,
  CreateI18nOptions,
  I18n,
  InferLocaleFromLocalesMap,
  InferMessagesFromLocalesMap,
  Messages,
} from "./types";

const registerEagerLocales = (
  locales: AnyLocalesMap,
  messageStore: Record<string, Messages>,
  loadedLocales: Set<string>,
): void => {
  for (const locale of Object.keys(locales)) {
    const source = locales[locale];
    if (source === undefined) {
      continue;
    }
    const eager = resolveLocaleModuleSync(source);
    if (eager !== undefined) {
      messageStore[locale] = deepMerge({}, eager);
      loadedLocales.add(locale);
    }
  }
};

const hasBrowserOptions = <TLocales extends AnyLocalesMap>(
  options: CreateI18nOptions<TLocales>,
): boolean =>
  options.storageKey !== undefined ||
  options.navigatorRules !== undefined ||
  options.documentTitleKey !== undefined;

export function createI18n<const TLocales extends AnyLocalesMap>(
  options: CreateI18nOptions<TLocales>,
): I18n<InferLocaleFromLocalesMap<TLocales>, InferMessagesFromLocalesMap<TLocales>> {
  type TLocale = InferLocaleFromLocalesMap<TLocales>;
  type TMessages = InferMessagesFromLocalesMap<TLocales>;

  const {
    defaultLocale: defaultLocaleOption,
    fallbackLocale,
    locales,
    missingKeyStrategy = "key",
    storageKey,
    navigatorRules,
    syncDocument = true,
    documentTitleKey,
  } = options;

  const browser = hasBrowserOptions(options);
  const supportedLocales = Object.keys(locales) as TLocale[];

  const resolveDetectedLocale = (): TLocale =>
    detectLocale({
      supported: supportedLocales,
      fallback: fallbackLocale as TLocale,
      storageKey,
      navigatorRules,
    });

  const defaultLocale = (defaultLocaleOption ?? (browser ? resolveDetectedLocale() : undefined)) as
    | TLocale
    | undefined;

  if (defaultLocale === undefined) {
    throw new Error(
      "createI18n: `defaultLocale` is required when browser options are not set",
    );
  }

  if (!supportedLocales.includes(defaultLocale as TLocale)) {
    throw new RangeError(
      `createI18n: defaultLocale "${String(defaultLocale)}" is not listed in locales`,
    );
  }

  if (!supportedLocales.includes(fallbackLocale as TLocale)) {
    throw new RangeError(
      `createI18n: fallbackLocale "${String(fallbackLocale)}" is not listed in locales`,
    );
  }

  const state = createLocaleState(defaultLocale as TLocale, fallbackLocale as TLocale);
  const messageStore = cloneLocaleMessages({});
  const loadedLocales = new Set<string>();

  registerEagerLocales(locales, messageStore, loadedLocales);

  const { translate } = createTranslator({
    getLocale: () => state.$locale.value(),
    fallbackLocale: fallbackLocale as TLocale,
    messages: messageStore,
    missingKeyStrategy,
  });

  const addMessages = (locale: TLocale, messages: Messages): void => {
    const bucket = ensureLocaleBucket(messageStore, locale);
    messageStore[locale] = deepMerge(bucket, messages);
    loadedLocales.add(locale);
  };

  const loadLocale = async (locale: TLocale): Promise<void> => {
    if (loadedLocales.has(locale)) {
      return;
    }

    const source = locales[locale];
    if (!source) {
      return;
    }

    if (!isLocaleImporter(source)) {
      addMessages(locale, resolveLocaleModuleSync(source)!);
      return;
    }

    state.$pending.set(true);
    state.$error.set(null);

    try {
      const messages = await resolveLocaleModule(source);
      addMessages(locale, messages);
    } catch (error: unknown) {
      state.$error.set(error);
      throw error;
    } finally {
      state.$pending.set(false);
    }
  };

  const setLocale = async (locale: TLocale): Promise<void> => {
    const source = locales[locale];
    if (!loadedLocales.has(locale) && source !== undefined && isLocaleImporter(source)) {
      await loadLocale(locale);
    }

    state.$locale.set(locale);
  };

  const start = (): Promise<void> => {
    if (!browser) {
      return Promise.resolve();
    }

    const locale = resolveDetectedLocale();
    state.$locale.set(locale);

    effect(() => {
      const current = state.$locale.value();
      if (typeof document !== "undefined" && syncDocument) {
        document.documentElement.lang = current;
        if (documentTitleKey) {
          document.title = translate(documentTitleKey);
        }
      }
      if (storageKey && typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, current);
      }
    });

    const source = locales[locale];
    if (
      !loadedLocales.has(locale) &&
      source !== undefined &&
      isLocaleImporter(source)
    ) {
      void loadLocale(locale);
    }

    return Promise.resolve();
  };

  return {
    supportedLocales,

    locale: (): TLocale => state.$locale.peek() as TLocale,
    setLocale,
    start,

    fallbackLocale: (): TLocale => fallbackLocale as TLocale,

    t: translate,

    exists: (key) =>
      hasMessage(messageStore, state.$locale.peek(), fallbackLocale as TLocale, key),

    addMessages,

    removeLocale: (locale: TLocale) => {
      delete messageStore[locale];
      loadedLocales.delete(locale);
    },

    loadLocale,

    number: (value, formatOptions) =>
      formatNumber(state.$locale.value(), value, formatOptions),

    currency: (value, currencyCode, formatOptions) =>
      formatCurrency(state.$locale.value(), value, currencyCode, formatOptions),

    date: (value, formatOptions) =>
      formatDate(state.$locale.value(), value, formatOptions),

    relativeTime: (value, unit) =>
      formatRelativeTime(state.$locale.value(), value, unit),

    $locale: state.$locale,
    $pending: state.$pending,
    $error: state.$error,
  };
}
