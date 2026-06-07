---
title: API Reference
description: Complete @echojs-ecosystem/i18n public API index.
package: '@echojs-ecosystem/i18n'
---

# API Reference

```ts
import {
  createI18n,
  createI18nProvider,
  detectLocale,
} from '@echojs-ecosystem/i18n'

import type {
  TranslationKey,
  InferMessagesFromLocalesMap,
  InferLocaleFromLocalesMap,
  MissingKeyStrategy,
} from '@echojs-ecosystem/i18n'
```

## Factories

| Export                                                             | Description                        |
| ------------------------------------------------------------------ | ---------------------------------- |
| [createI18n](/docs/packages/i18n/api/create-i18n)                  | Standalone `I18n` instance         |
| [createI18nProvider](/docs/packages/i18n/api/create-i18n-provider) | Echo provider with `setup`         |
| [detectLocale](/docs/packages/i18n/api/detect-locale)              | Browser locale resolution          |
| [Types](/docs/packages/i18n/api/types)                             | `TranslationKey`, locale inference |

## Guides

- [Messages & Keys](/docs/packages/i18n/guides/messages-and-keys)
- [Interpolation & Plural](/docs/packages/i18n/guides/interpolation-and-plural)
- [Intl Helpers](/docs/packages/i18n/guides/intl-helpers)
