import { createI18nProvider } from "@echojs-ecosystem/i18n";

import en from "../../../public/locales/en.json";
import ru from "../../../public/locales/ru.json";

export type AppMessages = typeof en;

export const i18nProvider = createI18nProvider({
  fallbackLocale: "en",
  locales: { en, ru },
  storageKey: "echojs-docs-locale",
  navigatorRules: [{ prefix: "ru", locale: "ru" }],
  documentTitleKey: "shell.documentTitle",
});

export const i18n = i18nProvider.i18n;

export type AppLocale = (typeof i18n.supportedLocales)[number];

export const setAppLocale = (locale: AppLocale): Promise<void> => i18n.setLocale(locale);
