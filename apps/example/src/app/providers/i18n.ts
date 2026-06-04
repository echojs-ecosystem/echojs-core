import { createI18nProvider, type TranslationKey } from "@echojs/i18n";

import en from "../../../public/locales/en.json";
import ru from "../../../public/locales/ru.json";

/** Canonical message tree — keys for `t("common.save")` are inferred from this type. */
export type AppMessages = typeof ru;

export type TKey = TranslationKey<AppMessages>;

export type ReactivityCardBase =
  | "reactivityLab.cards.signal"
  | "reactivityLab.cards.computed"
  | "reactivityLab.cards.batch"
  | "reactivityLab.cards.object"
  | "reactivityLab.cards.todos"
  | "reactivityLab.cards.peek"
  | "reactivityLab.cards.readonly"
  | "reactivityLab.cards.clock"
  | "reactivityLab.cards.cart"
  | "reactivityLab.cards.model";

export type QueryPlaygroundCardBase =
  | "queryDemo.cards.slow"
  | "queryDemo.cards.manual"
  | "queryDemo.cards.route"
  | "queryDemo.cards.cache"
  | "queryDemo.cards.infinite"
  | "queryDemo.cards.mutation";

/** Builds typed keys like `reactivityLab.cards.signal.title` from a card base id. */
export const cardTitleKey = (base: ReactivityCardBase | QueryPlaygroundCardBase): TKey =>
  `${base}.title` as TKey;

export const cardHintKey = (base: ReactivityCardBase | QueryPlaygroundCardBase): TKey =>
  `${base}.hint` as TKey;

export const i18nProvider = createI18nProvider({
  fallbackLocale: "en",
  locales: {
    ru,
    en,
  },
  storageKey: "echojs-lab-locale",
  navigatorRules: [{ prefix: "ru", locale: "ru" }],
  documentTitleKey: "common.documentTitle",
});

export const i18n = i18nProvider.i18n;

export type AppLocale = (typeof i18n.supportedLocales)[number];

export const setAppLocale = (locale: AppLocale): Promise<void> => i18n.setLocale(locale);
