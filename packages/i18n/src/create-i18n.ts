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
import { createLocaleState } from "./core/locale";
import { createTranslator } from "./core/translator";
import type {
  CreateI18nOptions,
  I18n,
  LocaleSource,
  LocalesMap,
  MessageSchema,
  Messages,
} from "./types";

const registerEagerLocales = <TLocale extends string, TMessages extends MessageSchema>(
  locales: LocalesMap<TLocale, TMessages>,
  messageStore: Record<string, Messages>,
  loadedLocales: Set<string>,
): void => {
  for (const locale of Object.keys(locales) as TLocale[]) {
    const source = locales[locale];
    const eager = resolveLocaleModuleSync(source);
    if (eager !== undefined) {
      messageStore[locale] = deepMerge({}, eager);
      loadedLocales.add(locale);
    }
  }
};

export function createI18n<
  TLocale extends string,
  TMessages extends MessageSchema,
>(options: CreateI18nOptions<TLocale, TMessages>): I18n<TLocale, TMessages> {
  const {
    defaultLocale,
    fallbackLocale,
    locales,
    missingKeyStrategy = "key",
  } = options;

  const supportedLocales = Object.keys(locales) as TLocale[];

  if (!supportedLocales.includes(defaultLocale)) {
    throw new RangeError(
      `createI18n: defaultLocale "${defaultLocale}" is not listed in locales`,
    );
  }

  if (!supportedLocales.includes(fallbackLocale)) {
    throw new RangeError(
      `createI18n: fallbackLocale "${fallbackLocale}" is not listed in locales`,
    );
  }

  const state = createLocaleState(defaultLocale, fallbackLocale);
  const messageStore = cloneLocaleMessages({});
  const loadedLocales = new Set<string>();

  registerEagerLocales(locales, messageStore, loadedLocales);

  const { translate } = createTranslator({
    getLocale: () => state.$locale.value(),
    fallbackLocale,
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

    const source = locales[locale] as LocaleSource<TMessages> | undefined;
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
    if (!loadedLocales.has(locale) && isLocaleImporter(locales[locale])) {
      await loadLocale(locale);
    }

    state.$locale.set(locale);
  };

  return {
    supportedLocales,

    locale: (): TLocale => state.$locale.peek() as TLocale,
    setLocale,

    fallbackLocale: () => fallbackLocale,

    t: translate,

    exists: (key) =>
      hasMessage(messageStore, state.$locale.peek(), fallbackLocale, key),

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
