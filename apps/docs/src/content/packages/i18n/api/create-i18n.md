---
title: createI18n
description: createI18n(options) — standalone I18n instance.
package: '@echojs-ecosystem/i18n'
---

# createI18n

```ts
function createI18n<TLocales>(
  options: CreateI18nOptions<TLocales>
): I18n<TLocale, TMessages>
```

Creates a standalone `I18n` instance for scripts, tests, or non-Echo apps.

## CreateI18nOptions

| Field                | Description                                     |
| -------------------- | ----------------------------------------------- |
| `locales`            | `Record<locale, Messages \| () => import(...)>` |
| `fallbackLocale`     | Required fallback id                            |
| `defaultLocale`      | Required unless browser options set             |
| `missingKeyStrategy` | `"key"` \| `"empty"`                            |
| `storageKey`         | `localStorage` persist + enables detect         |
| `navigatorRules`     | `{ prefix, locale }[]` vs `navigator.language`  |
| `syncDocument`       | Set `document.documentElement.lang`             |
| `documentTitleKey`   | Update `document.title` from `t(key)`           |

## I18n instance

| Member                                          | Description                 |
| ----------------------------------------------- | --------------------------- |
| `supportedLocales`                              | Readonly locale ids         |
| `locale()`                                      | Current locale              |
| `setLocale(locale)`                             | Switch; lazy-load if needed |
| `start()`                                       | Browser detect + effects    |
| `t(key, params?)`                               | Translate                   |
| `exists(key)`                                   | Key in active or fallback   |
| `addMessages` / `removeLocale` / `loadLocale`   | Runtime locale management   |
| `number` / `currency` / `date` / `relativeTime` | Intl helpers                |
| `$locale` / `$pending` / `$error`               | Reactive status             |

## See also

- [Important Defaults](/docs/packages/i18n/guides/important-defaults)
- [createI18nProvider](/docs/packages/i18n/api/create-i18n-provider)
