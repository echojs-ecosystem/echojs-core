---
title: API Reference
description: Complete @echojs-ecosystem/url-state public API index.
package: "@echojs-ecosystem/url-state"
---

# API Reference

Public exports from `@echojs-ecosystem/url-state`:

```ts
import {
  createQueryParam,
  createQueryParams,
  parseAsString,
  parseAsInteger,
  createBrowserUrlStateAdapter,
  createMemoryUrlStateAdapter,
  debounce,
} from "@echojs-ecosystem/url-state";
```

## Factories

| Export | Description |
| --- | --- |
| [createQueryParams](/docs/packages/url-state/api/create-query-params) | Object of typed search params |
| `createQueryParam(name, parser, options?)` | Single search param |

## Parsers

| Export | Description |
| --- | --- |
| [parseAs*](/docs/packages/url-state/api/parsers) | Built-in and custom parsers |

## Adapters

| Export | Description |
| --- | --- |
| [Adapters](/docs/packages/url-state/api/adapters) | Browser, memory, router adapters |

## Utilities

| Export | Description |
| --- | --- |
| `debounce(ms)` | Limit URL update rate |
| `throttle(ms)` | Throttle URL updates |

## Types

| Export | Description |
| --- | --- |
| [Types](/docs/packages/url-state/api/types) | Parser, adapter, and state types |

## Guides

Conceptual docs live under [Guides & Concepts](/docs/packages/url-state/guides/important-defaults):

- [Important Defaults](/docs/packages/url-state/guides/important-defaults)
- [Parsers](/docs/packages/url-state/guides/parsers)
- [createQueryParams](/docs/packages/url-state/guides/query-params)
