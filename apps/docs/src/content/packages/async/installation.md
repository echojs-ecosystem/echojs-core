---
title: Installation
description:
  Install @echojs-ecosystem/async and register createQueryProvider in your
  EchoJS app.
package: '@echojs-ecosystem/async'
---

# Installation

`@echojs-ecosystem/async` is framework-agnostic at the core; EchoJS apps
register a **query provider** so definitions pick up default options and a
shared `QueryClient`.

## Import paths

| Path                                | When to use                                                               |
| ----------------------------------- | ------------------------------------------------------------------------- |
| `@echojs-ecosystem/async`           | À la carte install — explicit dependency in `package.json`                |
| `@echojs-ecosystem/framework/async` | You already use the framework meta-package — one install, subpath imports |

```ts
// Standalone package
import { createQuery, createQueryProvider } from '@echojs-ecosystem/async'

// Same API via framework subpath
import {
  createQuery,
  createQueryProvider,
} from '@echojs-ecosystem/framework/async'
```

> [!tip] Pick **one style per app** and stay consistent.

## Quick install

Standalone:

:::install @echojs-ecosystem/async

Peer (used by views and models):

:::install @echojs-ecosystem/reactivity

Optional when binding params from stores:

:::install @echojs-ecosystem/store

Or install the full framework once:

:::install @echojs-ecosystem/framework

## Requirements

| Requirement        | Notes                                           |
| ------------------ | ----------------------------------------------- |
| **TypeScript** 5.x | Typed query definitions and `.with()` params    |
| **ESM bundler**    | Vite, Bun, webpack with ESM output              |
| **`fetch`**        | Typical `queryFn` implementations (or polyfill) |

## Framework bootstrap

```ts
// core/providers/query.ts
import { createQueryProvider } from '@echojs-ecosystem/async'

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: { staleTime: 60_000 },
  },
})
```

```ts
import { createEchoApp } from '@echojs-ecosystem/framework'
import { queryProvider } from './providers/query.js'

createEchoApp({ strictContextChecks: true }).use(queryProvider).mount('#app')
```

`createQueryProvider` calls `setQueryProvider` globally and exposes
`QUERY_PROVIDER_KEY` on the app host.

## Without Echo provider

Pass `{ provider }` as the second argument to `createQuery`, or rely on
`getDefaultQueryClient()` after creating a client manually — prefer the provider
in real apps.

## Verify the import

```ts
import { createQuery, createQueryClient } from '@echojs-ecosystem/async'

const client = createQueryClient()
const ping = createQuery({
  name: 'ping',
  queryKey: () => ['ping'] as const,
  queryFn: async () => 'ok',
})

const instance = ping.with(undefined, { client })
await instance.refetch()
console.log(instance.data())
```

## Next steps

- [Query Definitions](/docs/packages/async/guides/query-definitions) — first
  patterns
- [Reactive Binding](/docs/packages/async/guides/reactive-binding) — `.with()`
  in models
- [Examples](/docs/packages/async/example) — copy-paste patterns
