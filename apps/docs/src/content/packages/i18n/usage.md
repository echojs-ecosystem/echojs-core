---
title: Usage
description: Locales map, translations, plural, Intl helpers, browser detect, and HyperDOM.
package: "@echojs/i18n"
---

# Usage

## `createI18n` / `createI18nProvider`

```ts
import { createI18n } from "@echojs/i18n";
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

type AppLocale = keyof typeof appLocales;
```

| `locales` value | Behavior |
| --- | --- |
| **Object** (JSON import) | Eager — loaded at init |
| **Function** `() => import(...)` | Lazy — loaded on first `setLocale` / `start` |

## Browser auto-detect

Omit `defaultLocale` when using any browser option — initial locale is detected:

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

## Translation

```ts
i18n.t("common.save");
i18n.exists("common.save");

i18n.t("greeting", { name: "Vova" }); // "Hello, {name}"
```

Use `i18n.t()` inside **`effect` / `computed`** — reads `$locale` and re-runs when locale changes.

## Nested messages

```json
{
  "shell": {
    "documentTitle": "EchoJS Docs"
  },
  "locale": {
    "en": "English",
    "ru": "Русский"
  }
}
```

```ts
i18n.t("shell.documentTitle");
i18n.t("locale.ru");
```

## Plural

Message value can be a plural bucket:

```json
{
  "items": {
    "one": "{count} item",
    "few": "{count} items",
    "many": "{count} items",
    "other": "{count} items"
  }
}
```

```ts
i18n.t("items", { count: 5 });
```

Uses `Intl.PluralRules` for the active locale.

## Intl formatting

Locale-aware helpers (not stored in JSON):

```ts
i18n.number(123456.78);
i18n.currency(1000, "USD");
i18n.date(new Date(), { dateStyle: "medium" });
i18n.relativeTime(-1, "day");
```

## Switching locale

```ts
await i18n.setLocale("en");
i18n.locale();
i18n.$locale.value();
i18n.$pending.value(); // true while lazy import runs
i18n.$error.value();
```

## Runtime message patches

```ts
i18n.addMessages("en", { feature: { title: "New" } });
await i18n.loadLocale("de");
i18n.removeLocale("de");
```

## Missing keys

`missingKeyStrategy`:

| Value | Behavior |
| --- | --- |
| `"key"` (default) | Return the key path |
| `"empty"` | Return `""` |

Fallback chain: active locale → `fallbackLocale`.

## HyperDOM / models

```ts
import { i18n } from "@core/providers/i18n.js";

const label = () => i18n.t("locale.en");

button({ onClick: () => void i18n.setLocale("ru") }, () => i18n.t("shell.locale"));
```

Docs locale dropdown: `widgets/locale-dropdown` → `setAppLocale(id)`.

## Standalone `detectLocale`

```ts
import { detectLocale } from "@echojs/i18n";

const locale = detectLocale({
  supported: ["en", "ru"],
  fallback: "en",
  storageKey: "app-locale",
  navigatorRules: [{ prefix: "ru", locale: "ru" }],
});
```

## Guidelines

| Do | Avoid |
| --- | --- |
| One eager locale for `TranslationKey` inference | All lazy locales (keys become loose) |
| Nested keys `section.title` | Flat duplicated prefixes |
| Provider + `i18n.start()` in apps | Manual locale without sync in browser |
| Params for interpolation | String concat in views |

## Related

- API — `/docs/packages/i18n/api`
- Architecture → Providers
