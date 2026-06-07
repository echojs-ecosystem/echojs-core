---
title: QueryClient & Provider
description:
  createQueryClient, createQueryProvider, and imperative cache methods.
package: '@echojs-ecosystem/query'
---

# QueryClient & Provider

## createQueryClient

```ts
function createQueryClient(config?: QueryClientConfig): QueryClient
```

## QueryClient methods

| Method                                | Description            |
| ------------------------------------- | ---------------------- |
| `fetchQuery(definition, params)`      | Fetch or return cached |
| `prefetchQuery(definition, params)`   | Warm cache             |
| `getQueryData` / `setQueryData`       | Read/write cache entry |
| `invalidateQueries(filter, options?)` | Mark stale             |
| `refetchQueries(filter)`              | Refetch matches        |
| `cancelQueries(filter)`               | Cancel in-flight       |
| `removeQueries(filter)`               | Remove from cache      |
| `clear()`                             | Clear all              |

## Provider

| Export                                                | Description                                         |
| ----------------------------------------------------- | --------------------------------------------------- |
| `createQueryProvider(config)`                         | Echo provider; sets global provider + `app.provide` |
| `createQueryPlugin`                                   | Deprecated alias                                    |
| `QueryProvider`                                       | Class with `.client` and `.config`                  |
| `getQueryProvider()`                                  | Current provider or `null`                          |
| `requireQueryProvider()`                              | Throws if missing                                   |
| `setQueryProvider` / `resetQueryProvider`             | Test / advanced setup                               |
| `QUERY_PROVIDER_KEY`                                  | Symbol for DI                                       |
| `getDefaultQueryClient()` / `setDefaultQueryClient()` | Fallback client                                     |

## See also

- [Guides: QueryClient & Cache](/docs/packages/query/guides/query-client)
- [Installation](/docs/packages/query/installation)
