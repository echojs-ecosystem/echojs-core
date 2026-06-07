---
title: Installation
description:
  Install @echojs-ecosystem/url-state and connect to @echojs-ecosystem/router.
package: '@echojs-ecosystem/url-state'
---

# Installation

`@echojs-ecosystem/url-state` syncs typed query parameters with reactive state —
via the EchoJS router or standalone browser/memory adapters.

## Import paths

| Path                                    | When to use                                                               |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `@echojs-ecosystem/url-state`           | À la carte install — explicit dependency in `package.json`                |
| `@echojs-ecosystem/framework/url-state` | You already use the framework meta-package — one install, subpath imports |

```ts
// Standalone package
import { createQueryParams, parseAsString } from '@echojs-ecosystem/url-state'

// Same API via framework subpath
import {
  createQueryParams,
  parseAsString,
} from '@echojs-ecosystem/framework/url-state'
```

> [!tip] Pick **one style per app** and stay consistent.

## Quick install

Standalone:

:::install @echojs-ecosystem/url-state

For SPA URL sync via router:

:::install @echojs-ecosystem/router

:::install @echojs-ecosystem/hyperdom

Or install the full framework once:

:::install @echojs-ecosystem/framework

## Standalone (tests / static pages)

Use `createBrowserUrlStateAdapter()` or `createMemoryUrlStateAdapter()` per
param/group — no router required.

## Router registration

`createRouter` from `@echojs-ecosystem/router/hyperdom` calls
`attachRouterQueryParams` — registers the router for `createQueryParams()`
without importing `appRouter` in route modules (avoids circular imports).

## Verify the import

```ts
import {
  createMemoryUrlStateAdapter,
  createQueryParam,
  parseAsString,
} from '@echojs-ecosystem/url-state'

const adapter = createMemoryUrlStateAdapter('?q=hello')
const q = createQueryParam('q', parseAsString.withDefault(''), { adapter })

q.value() // "hello"
```

## Next steps

- [Important Defaults](/docs/packages/url-state/guides/important-defaults) —
  behavior overview
- [Parsers](/docs/packages/url-state/guides/parsers) — typed serialization
- [Examples](/docs/packages/url-state/example) — copy-paste patterns
