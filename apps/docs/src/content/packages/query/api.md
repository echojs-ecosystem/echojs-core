---
title: API Reference
description: Complete @echojs-ecosystem/query public API index.
package: '@echojs-ecosystem/query'
---

# API Reference

Public exports from `@echojs-ecosystem/query`:

```ts
import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  createQueryClient,
  createQueryProvider,
  getQueryProvider,
} from '@echojs-ecosystem/query'
```

## Factories

| Export                                                                | Description                    |
| --------------------------------------------------------------------- | ------------------------------ |
| [createQuery](/docs/packages/query/api/create-query)                  | Standard query definition      |
| [createInfiniteQuery](/docs/packages/query/api/create-infinite-query) | Paginated query definition     |
| [createMutation](/docs/packages/query/api/create-mutation)            | Mutation definition            |
| [QueryClient & Provider](/docs/packages/query/api/query-client)       | Cache client and Echo provider |

## Utilities

| Export                                                     | Description                                             |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| [Managers & Utilities](/docs/packages/query/api/utilities) | Abort helpers, focus/online managers, low-level classes |

## Guides

Conceptual docs live under
[Guides & Concepts](/docs/packages/query/guides/query-definitions):

- [Query Definitions](/docs/packages/query/guides/query-definitions)
- [Reactive Binding](/docs/packages/query/guides/reactive-binding)
- [Mutations](/docs/packages/query/guides/mutations)

## EchoJS vs TanStack

| TanStack (React)       | EchoJS Query                             |
| ---------------------- | ---------------------------------------- |
| `useQuery` hook        | `definition.with(() => params)` in model |
| `queryKey` + `queryFn` | Same names                               |
| NotifyManager          | **Signals** (`$data`, …)                 |
| Context provider       | `createQueryProvider`                    |
