import { button, div, span } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import { i18n, setAppLocale, type AppLocale } from "@app/i18n/index.js";

const localeLabel: Record<AppLocale, string> = {
  ru: "RU",
  en: "EN",
};

export const LocaleSwitcher = (): Child =>
  div({ class: "locale-switcher" }, [
    span({ class: "locale-switcher__label" }, () => i18n.t("shell.language")),
    ...i18n.supportedLocales.map((locale) =>
      button(
        {
          type: "button",
          class: () =>
            i18n.locale() === locale
              ? "locale-switcher__btn locale-switcher__btn--active"
              : "locale-switcher__btn",
          "on:click": () => void setAppLocale(locale),
        },
        localeLabel[locale],
      ),
    ),
  ]);
