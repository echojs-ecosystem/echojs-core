import { effect } from "@echojs/reactivity";
import { createI18n } from "@echojs/i18n";

import type { AppMessages } from "./messages.js";
import { ru } from "./messages.js";

const LOCALE_STORAGE_KEY = "echojs-lab-locale";

const appLocales = {
  ru,
  en: () => import("../../../public/locales/en.json"),
} as const;

export type AppLocale = keyof typeof appLocales;

const isAppLocale = (value: string): value is AppLocale =>
  (Object.keys(appLocales) as AppLocale[]).includes(value as AppLocale);

export const detectInitialLocale = (): AppLocale => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && isAppLocale(stored)) {
      return stored;
    }
  }

  if (typeof navigator !== "undefined") {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("ru")) return "ru";
  }

  return "en";
};

export const i18n = createI18n<AppLocale, AppMessages>({
  defaultLocale: detectInitialLocale(),
  fallbackLocale: "en",
  locales: {
    ru,
    en: () => import("../../../public/locales/en.json"),
  },
});

export const initI18n = async (): Promise<void> => {
  const locale = detectInitialLocale();
  await i18n.setLocale(locale);

  effect(() => {
    const current = i18n.locale();
    if (typeof document !== "undefined") {
      document.documentElement.lang = current;
      document.title = i18n.t("common.documentTitle");
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, current);
    }
  });
};

export const setAppLocale = async (locale: AppLocale): Promise<void> => {
  await i18n.setLocale(locale);
};

/** @deprecated Use `i18n.supportedLocales` */
export const supportedAppLocales = i18n.supportedLocales;
