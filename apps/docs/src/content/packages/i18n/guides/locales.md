---
title: Locales
description: Locale maps, browser detect, switching, and document sync.
package: "@echojs-ecosystem/i18n"
---

# Locales

Define supported locales in a `locales` map and switch at runtime with `setLocale`.

## Locales map

```ts
import ru from "./locales/ru.json";

const appLocales = {
  ru,
  en: () => import("./locales/en.json"),
} as const;

const i18n = createI18n({
  defaultLocale: "ru",
  fallbackLocale: "en",
  locales: appLocales,
});
```

## Browser auto-detect

Omit `defaultLocale` when using browser options — initial locale is detected:

```ts
createI18nProvider({
  fallbackLocale: "en",
  locales: { en, ru },
  storageKey: "app-locale",
  navigatorRules: [{ prefix: "ru", locale: "ru" }],
  documentTitleKey: "shell.documentTitle",
  syncDocument: true,
});
```

Priority: `localStorage[storageKey]` → `navigatorRules` → `fallbackLocale`.

Call **`i18n.start()`** (via provider `setup`) to apply detect, sync `document.documentElement.lang`, optional `document.title`, and persist locale changes.

## Switching locale

```ts
await i18n.setLocale("en");
i18n.locale();
i18n.$locale.value();
i18n.$pending.value(); // true while lazy import runs
i18n.$error.value();
```

## Standalone detect

```ts
import { detectLocale } from "@echojs-ecosystem/i18n";

const locale = detectLocale({
  supported: ["en", "ru"],
  fallback: "en",
  storageKey: "app-locale",
  navigatorRules: [{ prefix: "ru", locale: "ru" }],
});
```

## See also

- [detectLocale API](/docs/packages/i18n/api/detect-locale)
- [Locale Switcher example](/docs/packages/i18n/examples/locale-switcher)
