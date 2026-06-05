---
title: Installation
description: Install @echojs-ecosystem/query and register createQueryProvider in your EchoJS app.
package: "@echojs-ecosystem/query"
---

# Installation

`@echojs-ecosystem/query` is framework-agnostic at the core; EchoJS apps register a **query provider** so definitions pick up default options and a shared `QueryClient`.

## Package managers

:::install @echojs-ecosystem/query

Peer (used by views and models):

:::install @echojs-ecosystem/reactivity

Optional when binding params from stores:

:::install @echojs-ecosystem/store

## Requirements

- **TypeScript** 5.x
- **ESM** bundler
- `fetch` (or polyfill) for typical `queryFn` implementations

## Framework bootstrap

```ts
// core/providers/query.ts
import { createQueryProvider } from "@echojs-ecosystem/query";

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: { staleTime: 60_000 },
  },
});
```

```ts
import { createEchoApp } from "@echojs-ecosystem/framework";
import { queryProvider } from "./providers/query.js";

createEchoApp({ strictContextChecks: true })
  .use(queryProvider)
  .mount("#app");
```

`createQueryProvider` calls `setQueryProvider` globally and exposes `QUERY_PROVIDER_KEY` on the app host.

## Monorepo

```json
{
  "dependencies": {
    "@echojs-ecosystem/query": "workspace:*",
    "@echojs-ecosystem/reactivity": "workspace:*"
  }
}
```

## Without Echo provider

You can pass `{ provider }` as the second argument to `createQuery`, or rely on `getDefaultQueryClient()` after creating a client manually — prefer the provider in real apps.

## Minimal check

```ts
import { createQuery, createQueryClient } from "@echojs-ecosystem/query";

const client = createQueryClient();
const ping = createQuery({
  name: "ping",
  queryKey: () => ["ping"] as const,
  queryFn: async () => "ok",
});

const instance = ping.with(undefined, { client });
await instance.refetch();
console.log(instance.data());
```
