---
title: QueryClient & Cache
description: createQueryClient, provider setup, and imperative cache operations.
package: "@echojs-ecosystem/query"
---

# QueryClient & Cache

The **QueryClient** owns the in-memory cache. EchoJS apps typically share one client via `createQueryProvider`; advanced cases use imperative APIs directly.

## Provider setup

```ts
import { createQueryProvider } from "@echojs-ecosystem/query";

export const queryProvider = createQueryProvider({
  defaultOptions: { queries: { staleTime: 60_000 } },
});
```

Access the client: `getQueryProvider()?.client` or pass `{ client }` to `.with()`.

## Creating a client

```ts
import { createQueryClient } from "@echojs-ecosystem/query";

const client = createQueryClient();
```

## Imperative cache API

```ts
await client.fetchQuery(getUserQuery, { id: 1 });
await client.prefetchQuery(getUserQuery, { id: 2 });
client.getQueryData(getUserQuery, { id: 1 });
client.setQueryData(getUserQuery, { id: 1 }, (prev) => ({ ...prev!, name: "New" }));
client.invalidateQueries(["users"]);
await client.refetchQueries({ queryKey: ["users"], exact: false });
client.cancelQueries(["user", 1]);
client.removeQueries({ queryKey: ["user"], exact: false });
client.clear();
```

## Global refetch managers

- **`focusManager`** — refetch stale queries on window focus (browser)
- **`onlineManager`** — refetch on reconnect

Enabled per query via `refetchOnWindowFocus` / `refetchOnReconnect`.

## Provider exports

| Export | Description |
| --- | --- |
| `createQueryProvider(config)` | Echo provider; sets global provider + `app.provide` |
| `getQueryProvider()` | Current provider or `null` |
| `requireQueryProvider()` | Throws if missing |
| `QUERY_PROVIDER_KEY` | Symbol for DI |
| `getDefaultQueryClient()` / `setDefaultQueryClient()` | Fallback client |

## EchoJS vs TanStack

| TanStack (React) | EchoJS Query |
| --- | --- |
| `useQuery` hook | `definition.with(() => params)` in model |
| `queryKey` + `queryFn` | Same names |
| NotifyManager | **Signals** (`$data`, …) |
| Context provider | `createQueryProvider` |

## Related

- [Installation](/docs/packages/query/installation)
- [API: QueryClient & Provider](/docs/packages/query/api/query-client)
- [Examples: Provider Defaults](/docs/packages/query/examples/provider-defaults)
