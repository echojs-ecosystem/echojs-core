---
title: detectLocale
description: Resolve locale from localStorage and navigator rules.
package: '@echojs-ecosystem/i18n'
keywords: [detectLocale, i18n]
---

@echojs-ecosystem/i18n

## Usage

```ts
import { detectLocale } from '@echojs-ecosystem/i18n'

const locale = detectLocale({
  supported: ['en', 'ru'],
  fallback: 'en',
  storageKey: 'app-locale',
  navigatorRules: [{ prefix: 'ru', locale: 'ru' }],
})
```

## Type Declarations

```ts
function detectLocale(options): string
```

## API

### Returns

`detectLocale` — see Type Declarations for the full signature.
