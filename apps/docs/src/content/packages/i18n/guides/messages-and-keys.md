---
title: Messages & Keys
description: Nested JSON trees, TranslationKey, and runtime patches.
package: '@echojs-ecosystem/i18n'
---

# Messages & Keys

Messages are nested JSON objects. Keys use dot notation.

## Nested structure

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
i18n.t('shell.documentTitle')
i18n.t('locale.ru')
i18n.exists('common.save')
```

## Type-safe keys

With `resolveJsonModule`, eager locale imports infer `TranslationKey<TMessages>`
— autocomplete for nested paths.

## Runtime patches

```ts
i18n.addMessages('en', { feature: { title: 'New' } })
await i18n.loadLocale('de')
i18n.removeLocale('de')
```

## See also

- [Interpolation & Plural](/docs/packages/i18n/guides/interpolation-and-plural)
- [Types](/docs/packages/i18n/api/types)
