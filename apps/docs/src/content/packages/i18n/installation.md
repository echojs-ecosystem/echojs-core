---
title: Installation
description: Add @echojs-ecosystem/i18n and register createI18nProvider.
package: '@echojs-ecosystem/i18n'
---

# Installation

## Import paths

| Path                               | When to use                                |
| ---------------------------------- | ------------------------------------------ |
| `@echojs-ecosystem/i18n`           | À la carte install                         |
| `@echojs-ecosystem/framework/i18n` | You already use the framework meta-package |

```ts
import { createI18n, createI18nProvider } from '@echojs-ecosystem/i18n'
// or: from "@echojs-ecosystem/framework/i18n"
```

## Quick install

:::install @echojs-ecosystem/i18n

:::install @echojs-ecosystem/reactivity

Or install the full framework once:

:::install @echojs-ecosystem/framework

## Locale files

Place JSON message trees under `public/locales/` or `src/locales/`:

```
public/locales/
  en.json
  ru.json
```

Import eager locales in the provider module; lazy locales use dynamic
`import()`.

## Provider

```ts
import { createI18nProvider } from '@echojs-ecosystem/i18n'
import en from '../../../public/locales/en.json'
import ru from '../../../public/locales/ru.json'

export const i18nProvider = createI18nProvider({
  fallbackLocale: 'en',
  locales: { en, ru },
  storageKey: 'echojs-docs-locale',
  navigatorRules: [{ prefix: 'ru', locale: 'ru' }],
  documentTitleKey: 'shell.documentTitle',
})

export const i18n = i18nProvider.i18n
```

```ts
createEchoApp({ strictContextChecks: true }).use(i18nProvider).mount('#app')
```

Reference: `apps/docs/src/core/providers/i18n.ts`.

## TypeScript

Enable `resolveJsonModule` so `import en from "./en.json"` types the message
tree for `TranslationKey`.

## Next steps

- [Important Defaults](/docs/packages/i18n/guides/important-defaults)
- [Locales](/docs/packages/i18n/guides/locales)
- [Examples](/docs/packages/i18n/example)
