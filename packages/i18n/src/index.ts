export { createI18n } from "./create-i18n";
export { createI18nProvider, type EchoI18nProvider } from "./plugin/i18n-provider";
export { detectLocale } from "./plugin/detect-locale";

export type {
  AnyLocalesMap,
  CreateI18nOptions,
  CreateI18nOptionsLegacy,
  I18n,
  I18nOptions,
  InferLocaleFromLocalesMap,
  InferMessagesFromLocalesMap,
  LocaleImporter,
  LocaleLoader,
  LocaleLoaderResult,
  LocaleLoaders,
  LocaleMessages,
  LocaleModuleResult,
  LocaleSource,
  LocalesMap,
  MessageSchema,
  Messages,
  MissingKeyStrategy,
  PluralMessages,
  TranslationKey,
} from "./types";
