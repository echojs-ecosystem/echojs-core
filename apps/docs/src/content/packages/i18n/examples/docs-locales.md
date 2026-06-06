---
title: Docs Locales
description: i18n provider and message files from apps/docs.
package: "@echojs-ecosystem/i18n"
---

# Docs Locales

## Provider

```ts
import { createI18nProvider } from "@echojs-ecosystem/i18n";
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

## Message file

```json
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

## Lazy locale variant

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

## Live references

| Resource | Path |
| --- | --- |
| Provider | `apps/docs/src/core/providers/i18n.ts` |
| Locales | `apps/docs/public/locales/*.json` |

## See also

- [createI18nProvider](/docs/packages/i18n/api/create-i18n-provider)
