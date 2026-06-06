---
title: Important Defaults
description: createI18n vs provider, lazy locales, and missing key behavior.
package: "@echojs-ecosystem/i18n"
---

# Important Defaults

`@echojs-ecosystem/i18n` provides typed messages, lazy locale loading, and browser auto-detect. These defaults shape key inference and runtime behavior.

## `createI18n` vs `createI18nProvider`

| API | Use when |
| --- | --- |
| `createI18n` | Standalone scripts, tests, non-Echo apps |
| `createI18nProvider` | Echo apps — wires `i18n.start()` in provider `setup` |

```ts
const i18n = createI18n({
  defaultLocale: "ru",
  fallbackLocale: "en",
  locales: appLocales,
});
```

## Eager vs lazy locales

| `locales` value | Behavior |
| --- | --- |
| **Object** (JSON import) | Eager — loaded at init |
| **Function** `() => import(...)` | Lazy — loaded on first `setLocale` / `start` |

Keep **one eager locale** for `TranslationKey` inference. All-lazy locales make keys loose.

## Missing keys

`missingKeyStrategy`:

| Value | Behavior |
| --- | --- |
| `"key"` (default) | Return the key path |
| `"empty"` | Return `""` |

Fallback chain: active locale → `fallbackLocale`.

## Reactive reads

Use `i18n.t()` inside **`effect` / `computed`** or HyperDOM reactive children — reads `$locale` and re-runs when locale changes.

## Guidelines

| Do | Avoid |
| --- | --- |
| One eager locale for key inference | All lazy locales |
| Nested keys `section.title` | Flat duplicated prefixes |
| Provider + `i18n.start()` in apps | Manual locale without document sync |
| Params for interpolation | String concat in views |

## See also

- [Locales](/docs/packages/i18n/guides/locales)
- [createI18nProvider](/docs/packages/i18n/api/create-i18n-provider)
