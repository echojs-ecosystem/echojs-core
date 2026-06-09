---
title: Adapters
description: Browser, memory, and router URL state adapters.
package: '@echojs-ecosystem/url-state'
keywords: [Adapters, url-state]
---

@echojs-ecosystem/url-state

## Usage

```ts
import {
  createBrowserUrlStateAdapter,
  createQueryParam,
  parseAsString,
} from '@echojs-ecosystem/url-state'

const q = createQueryParam('q', parseAsString.withDefault(''), {
  adapter: createBrowserUrlStateAdapter(),
})
```

## Type Declarations

```ts
import {
  createBrowserUrlStateAdapter,
  createQueryParam,
  parseAsString,
} from '@echojs-ecosystem/url-state'

const q = createQueryParam('q', parseAsString.withDefault(''), {
  adapter: createBrowserUrlStateAdapter(),
})
```

## API
