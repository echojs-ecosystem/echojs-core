---
title: Provider Defaults
description: createQueryProvider with app-wide staleTime defaults for the docs site.
package: "@echojs-ecosystem/query"
---

# Provider Defaults

Register a query provider at app bootstrap to set default options for all queries — reducing repetition in individual definitions.

## Problem

Every query shouldn't repeat the same `staleTime` and retry settings. Centralize defaults in the provider.

## Docs site provider

```ts
// apps/docs/src/core/providers/query.ts
import { createQueryProvider } from "@echojs-ecosystem/query";

export const queryProvider = createQueryProvider({
  defaultOptions: { queries: { staleTime: 60_000 } },
});
```

## App bootstrap

```ts
import { createEchoApp } from "@echojs-ecosystem/framework";
import { queryProvider } from "./providers/query.js";

createEchoApp({ strictContextChecks: true })
  .use(queryProvider)
  .mount("#app");
```

## Per-query overrides

Definitions and `.with()` calls can still override defaults:

```ts
createQuery({
  staleTime: 3_600_000, // overrides provider default for this query
  // ...
});
```

## See also

- [Installation](/docs/packages/query/installation)
- [Guides: QueryClient & Cache](/docs/packages/query/guides/query-client)
