---
title: URL State
description: Typed search params with parsers and router integration.
package: '@echojs-ecosystem/url-state'
keywords: [createQueryParams, parseAsString, nuqs]
---

:::package-overview url-state

:::install @echojs-ecosystem/url-state

## Quick start

```ts
import { createQueryParams, parseAsInteger } from '@echojs-ecosystem/url-state'

const catalogParams = createQueryParams({
  page: parseAsInteger.withDefault(1),
  q: parseAsString.withDefault(''),
})
```

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/url-state/functions) | Parsers, `createQueryParams`, adapters |
| [Guides & Concepts](/docs/packages/url-state/guides/parsers) | Router sync, history |

Each API page: **Usage** → **Type Declarations** → **API** (see [createQueryParams](/docs/packages/url-state/api/create-query-params)).

> [!tip] Path segments and layouts stay in `@echojs-ecosystem/router`.
