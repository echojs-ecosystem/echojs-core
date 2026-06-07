---
title: Internationalization
description:
  Locales, lazy messages, browser detect, and translations in models and views
  with @echojs-ecosystem/i18n.
keywords: [i18n, locale, createI18nProvider, translations]
---

# Internationalization

EchoJS i18n is **`@echojs-ecosystem/i18n`**: typed message maps, lazy locale
chunks, browser detection, and HyperDOM-friendly `t()` that tracks the active
locale. The docs site (`apps/docs`) and example app both use the same provider
pattern.

## Provider at bootstrap

```ts
import { createI18nProvider } from '@echojs-ecosystem/i18n'
import en from '../public/locales/en.json'
import ru from '../public/locales/ru.json'

export const i18nProvider = createI18nProvider({
  fallbackLocale: 'en',
  locales: { en, ru },
  storageKey: 'echojs-docs-locale',
  navigatorRules: [{ prefix: 'ru', locale: 'ru' }],
  documentTitleKey: 'shell.documentTitle',
  syncDocument: true,
})

export const i18n = i18nProvider.i18n
export type AppLocale = (typeof i18n.supportedLocales)[number]
```

Register with `createEchoApp().use(i18nProvider)` **before** routes that read
translations in `beforeLoad` if needed.

`setup()` calls `i18n.start()` — applies detect rules, sets
`document.documentElement.lang`, optional `document.title`, and persists locale
changes to `storageKey`.

## Message files

Nested JSON keys map to dot paths:

```json
{
  "shell": {
    "documentTitle": "EchoJS Docs"
  },
  "common": {
    "save": "Save",
    "login": "Sign in"
  },
  "greeting": "Hello, {name}"
}
```

```ts
i18n.t('shell.documentTitle')
i18n.t('common.save')
i18n.t('greeting', { name: 'Alex' })
i18n.exists('common.save')
```

## Lazy locales

Eager import for default; lazy for others:

```ts
const appLocales = {
  en: () => import('./locales/en.json'),
  ru,
} as const

createI18n({ defaultLocale: 'en', fallbackLocale: 'en', locales: appLocales })
```

Function entries load on first `setLocale` / `start`.

## Browser detection

Omit `defaultLocale` when using detection — priority:

1. `localStorage[storageKey]`
2. `navigatorRules` (prefix → locale)
3. `fallbackLocale`

```ts
navigatorRules: [
  { prefix: "ru", locale: "ru" },
  { prefix: "de", locale: "de" },
],
```

## Use in views and models

Call `i18n.t()` inside reactive contexts so UI updates on locale change:

```ts
import { effect } from '@echojs-ecosystem/reactivity'
import { i18n } from '@core/providers/i18n.js'

// In createView — function child re-runs when locale signal updates
p(null, () => i18n.t('common.session'))

// In model effect — SEO, document metadata
effect(() => {
  document.title = i18n.t('shell.documentTitle')
})
```

Do **not** cache translated strings in plain variables outside signals/effects
unless the locale is fixed.

## Switching locale

```ts
await i18n.setLocale('ru')
// or exported helper:
export const setAppLocale = (locale: AppLocale) => i18n.setLocale(locale)
```

Build a locale picker with `i18n.supportedLocales` and labels from
`i18n.t("locale.ru")` keys.

## Plural and Intl

Use built-in plural helpers and `Intl` formatters from the package (dates,
numbers, relative time) — see
[i18n guides](/docs/packages/i18n/guides/messages-and-keys).

## Router and URLs

Locale in the **path** (`/en/docs/...`) is an app choice — combine with route
params or `@echojs-ecosystem/url-state`. The i18n provider does not replace
routing; sync `setLocale` when the URL locale segment changes.

## Testing

- Import a single JSON fixture in tests.
- Call `i18n.setLocale("en")` in `beforeEach` for deterministic snapshots.
- Prefer `exists()` before optional keys in shared components.

## Related

- [i18n package](/docs/packages/i18n/overview)
- [Providers](/docs/architecture/providers)
- Example locales — `apps/example/public/locales/`
- Docs provider — `apps/docs/src/core/providers/i18n.ts`
