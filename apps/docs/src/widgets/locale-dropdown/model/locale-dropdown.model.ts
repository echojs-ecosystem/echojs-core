import { createModel } from "@echojs-ecosystem/framework/hyperdom";
import { i18n, setAppLocale, type AppLocale } from "@core/providers/index.js";
import type { HeaderDropdownProps } from "@widgets/header-dropdown/model/header-dropdown.model.js";

const localeKeys: Record<AppLocale, "locale.en" | "locale.ru"> = {
  en: "locale.en",
  ru: "locale.ru",
};

export type LocaleDropdownVM = {
  dropdownProps: HeaderDropdownProps;
};

export const createLocaleDropdownModel = createModel((): LocaleDropdownVM => {
  return {
    dropdownProps: {
      ariaLabel: () => i18n.t("shell.localeMenu"),
      selectedId: () => i18n.locale(),
      triggerLabel: () => i18n.t(localeKeys[i18n.locale()]),
      options: () =>
        i18n.supportedLocales.map((locale) => ({
          id: locale,
          label: i18n.t(localeKeys[locale]),
        })),
      onSelect: (id) => void setAppLocale(id as AppLocale),
    },
  };
}, "LocaleDropdownModel");
