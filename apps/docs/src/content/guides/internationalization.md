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
locale. `apps/docs` and `apps/example` use the same provider pattern.

> [!TIP] Call `i18n.t()` inside reactive children (`() => i18n.t('key')`) — same
> rule as [Reactivity](/docs/guides/reactivity) for signal reads.

## Mental model

| Piece            | Role                                      |
| ---------------- | ----------------------------------------- |
| `createI18n`     | Message catalogs, fallback, lazy loaders  |
| `createI18nProvider` | DI + `start()` on app bootstrap       |
| `i18n.t(key)`    | Translate; tracks locale signal         |
| `i18n.setLocale` | Switch language + persist                 |
| `navigatorRules` | Map browser lang → locale                 |

Translations live in **JSON** (or TS maps). Views and models call `t()` — do not
hard-code user-visible strings in production UI.

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

```ts
createEchoApp({ strictContextChecks: true })
  .use(i18nProvider)
  .use(routerProvider)
  .mount('#app')
```

Register **before** routes if `beforeLoad` reads translated metadata. `setup()`
calls `i18n.start()` — detect locale, set `document.documentElement.lang`,
optional `document.title`, persist to `storageKey`.

## Message files

Nested JSON → dot paths:

```json
{
  "shell": {
    "documentTitle": "EchoJS Docs"
  },
  "common": {
    "save": "Save",
    "login": "Sign in"
  },
  "greeting": "Hello, {name}",
  "locale": {
    "en": "English",
    "ru": "Русский"
  }
}
```

```ts
i18n.t('shell.documentTitle')
i18n.t('common.save')
i18n.t('greeting', { name: 'Alex' })
i18n.exists('common.save')
```

Keep keys **stable** — rename keys only with migration or compatibility shims.

## Lazy locales

Eager default; lazy others to shrink initial bundle:

```ts
const appLocales = {
  en: () => import('./locales/en.json'),
  ru,
} as const

createI18n({ defaultLocale: 'en', fallbackLocale: 'en', locales: appLocales })
```

Function entries load on first `setLocale` / `start`. Show loading state in
locale picker while chunk loads.

## Browser detection

Priority when `defaultLocale` omitted:

1. `localStorage[storageKey]` (user choice)
2. `navigatorRules` (prefix match → locale)
3. `fallbackLocale`

```ts
navigatorRules: [
  { prefix: 'ru', locale: 'ru' },
  { prefix: 'de', locale: 'de' },
]
```

## Use in views

Function children re-run when locale changes:

```ts
import { i18n } from '@core/providers/i18n.js'

export const ShellView = createView(
  (_vm): Child =>
    nav(null, [
      NavLink({ to: homePage, children: () => i18n.t('nav.home') }),
      button({ onClick: () => i18n.setLocale('ru') }, () =>
        i18n.t('locale.ru')
      ),
    ]),
  'ShellView'
)
```

Reactive props work too:

```ts
button({ 'aria-label': () => i18n.t('common.close') }, () => '×')
```

## Use in models

Side effects that touch document or external APIs:

```ts
import { effect } from '@echojs-ecosystem/reactivity'
import { i18n } from '@core/providers/i18n.js'

effect(() => {
  document.title = i18n.t('shell.documentTitle')
})
```

Do **not** cache `const label = i18n.t('x')` at module top level — stale after
locale switch.

## Locale picker feature

Typical feature slice:

```
features/locale-switcher/
  model/locale-switcher.model.ts   # setLocale, supportedLocales
  ui/locale-switcher.view.ts
```

```ts
export const createLocaleSwitcherModel = createModel((): LocaleSwitcherVM => ({
  locales: () => i18n.supportedLocales,
  active: () => i18n.locale.value(),
  setLocale: (l: AppLocale) => i18n.setLocale(l),
  label: (l: AppLocale) => i18n.t(`locale.${l}`),
}), 'LocaleSwitcherModel')
```

## Plural and Intl

Package helpers for plural rules and formatters:

```ts
i18n.t('items.count', { count: 3 })
i18n.formatDate(date, { dateStyle: 'medium' })
i18n.formatNumber(1234.5)
```

See [Messages and keys](/docs/packages/i18n/guides/messages-and-keys),
[Interpolation and plural](/docs/packages/i18n/guides/interpolation-and-plural).

## Router and URLs

Locale in the **path** (`/en/docs/...`) is an app decision — i18n does not
replace routing.

| Approach              | When                                    |
| --------------------- | --------------------------------------- |
| Storage + detect only | Docs-style SPA, single URL space        |
| Prefix routes `/en/*` | SEO, shareable localized URLs           |
| Query `?lang=ru`      | Quick prototype — prefer url-state      |

Sync `i18n.setLocale` when route locale param changes:

```ts
effect(() => {
  const lang = localePage.$params.value().lang
  if (lang) void i18n.setLocale(lang as AppLocale)
})
```

## Testing

```ts
beforeEach(async () => {
  await i18n.setLocale('en')
})
```

- Fixture JSON for unit tests.
- `exists()` before optional keys in shared components.
- Snapshot tests after locale is fixed in `beforeEach`.

## Checklist

1. Provider registered in app bootstrap.
2. All user strings via `t()` — no literals in views.
3. Reactive `() => i18n.t(...)` in HyperDOM.
4. `storageKey` for user preference.
5. Lazy load non-default locales in production.
6. `document.documentElement.lang` synced (`syncDocument: true`).

## Related

- [Reactivity](/docs/guides/reactivity) — reactive `t()` in views
- [i18n package](/docs/packages/i18n)
- [Providers](/docs/architecture/providers)
- [URL state](/docs/state/url-state) — locale in query
- Example — `apps/example/public/locales/`
- Docs — `apps/docs/src/core/providers/i18n.ts`
