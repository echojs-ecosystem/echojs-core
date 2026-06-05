---
title: API Reference
description: Public exports from @echojs/i18n.
package: "@echojs/i18n"
---

# API Reference

## Factories

| Export | Description |
| --- | --- |
| `createI18n(options)` | `I18n<TLocale, TMessages>` |
| `createI18nProvider(options)` | `{ name: "i18n", i18n, setup }` |
| `detectLocale(options)` | Resolve locale from storage / navigator |

## `CreateI18nOptions`

| Field | Description |
| --- | --- |
| `locales` | `Record<locale, Messages \| () => import(...)>` |
| `fallbackLocale` | Required fallback id |
| `defaultLocale` | Required unless browser options set |
| `missingKeyStrategy` | `"key"` \| `"empty"` |
| `storageKey` | `localStorage` persist + enables detect |
| `navigatorRules` | `{ prefix, locale }[]` vs `navigator.language` |
| `syncDocument` | Set `document.documentElement.lang` (default true with browser opts) |
| `documentTitleKey` | Update `document.title` from `t(key)` |

## `I18n` instance

| Member | Description |
| --- | --- |
| `supportedLocales` | Readonly locale ids from `locales` |
| `locale()` | Current locale |
| `setLocale(locale)` | Switch; lazy-load if needed |
| `start()` | Browser detect + effects (provider calls this) |
| `fallbackLocale()` | Fallback id |
| `t(key, params?)` | Translate |
| `exists(key)` | Key present in active or fallback |
| `addMessages(locale, partial)` | Merge messages |
| `removeLocale(locale)` | Drop cached locale |
| `loadLocale(locale)` | Load lazy importer |
| `number` / `currency` / `date` / `relativeTime` | Intl helpers |
| `$locale` | `Signal<TLocale>` |
| `$pending` | Lazy load in progress |
| `$error` | Last load error |

## Types

| Type | Description |
| --- | --- |
| `TranslationKey<TMessages>` | Union of nested key paths |
| `InferMessagesFromLocalesMap<T>` | Schema from eager locales |
| `InferLocaleFromLocalesMap<T>` | `keyof locales` |
| `LocaleSource<T>` | Object or importer |
| `MessageSchema` / `Messages` | JSON tree shape |
| `MissingKeyStrategy` | Missing key behavior |
| `EchoI18nProvider` | Provider type |

## Provider

```ts
const provider = createI18nProvider({ ... });
provider.name;   // "i18n"
provider.i18n;  // I18n instance
provider.setup; // () => i18n.start()
```

## Related

- Usage — `/docs/packages/i18n/usage`
- Overview — `/docs/packages/i18n`
