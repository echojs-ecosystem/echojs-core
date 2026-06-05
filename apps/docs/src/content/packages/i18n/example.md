---
title: Example
description: i18n provider and locale switcher from apps/docs.
package: "@echojs/i18n"
---

# Example — i18n

## Provider (`apps/docs`)

```ts
import { createI18nProvider } from "@echojs/i18n";
import en from "../../../public/locales/en.json";
import ru from "../../../public/locales/ru.json";

export const i18nProvider = createI18nProvider({
  fallbackLocale: "en",
  locales: { en, ru },
  storageKey: "echojs-docs-locale",
  navigatorRules: [{ prefix: "ru", locale: "ru" }],
  documentTitleKey: "shell.documentTitle",
});

export const i18n = i18nProvider.i18n;

export type AppLocale = (typeof i18n.supportedLocales)[number];
export const setAppLocale = (locale: AppLocale) => i18n.setLocale(locale);
```

```json
// public/locales/en.json
{
  "shell": {
    "documentTitle": "EchoJS Documentation",
    "locale": "Language"
  },
  "locale": {
    "en": "English",
    "ru": "Русский"
  }
}
```

## HyperDOM view

```ts
import { i18n, setAppLocale } from "@app/providers/i18n.js";

button({ onClick: () => void setAppLocale("ru") }, () => i18n.t("locale.ru"));
span(null, () => i18n.t("shell.documentTitle"));
```

## Locale dropdown widget

```ts
// widgets/locale-dropdown/model/locale-dropdown.model.ts
import { i18n, setAppLocale, type AppLocale } from "@app/providers/i18n.js";

export const createLocaleDropdownModel = createModel(() => ({
  locale: () => i18n.locale(),
  options: () =>
    i18n.supportedLocales.map((id) => ({
      id,
      label: i18n.t(`locale.${id}` as const),
    })),
  onSelect: (id: string) => void setAppLocale(id as AppLocale),
}), "LocaleDropdownModel");
```

## Lazy locale

```ts
const i18n = createI18n({
  defaultLocale: "en",
  fallbackLocale: "en",
  locales: {
    en: () => import("./locales/en.json"),
    ru: () => import("./locales/ru.json"),
  },
});
```

## Live app

| Resource | Path |
| --- | --- |
| Provider | `apps/docs/src/app/providers/i18n.ts` |
| Locales | `apps/docs/public/locales/*.json` |
| Switcher | `apps/docs/src/widgets/locale-dropdown/` |
| Example lab | `apps/example` — counter uses `i18n.t("counter.title")` |

## See also

- Usage — `/docs/packages/i18n/usage`
- Framework Example — `/docs/packages/framework/example`
