---
title: Query
description:
  Signal-native async cache for models — queries, mutations, invalidation.
package: '@echojs-ecosystem/async'
keywords: [createQuery, createMutation, queryClient]
---

:::package-overview query

:::install @echojs-ecosystem/async

## Quick start

```ts
import { createQuery } from '@echojs-ecosystem/async'

const userQuery = createQuery({
  queryKey: ['user', id] as const,
  queryFn: ({ signal }) => fetchUser(id, { signal }),
})
```

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/async/functions) | API index — queries, mutations, client |
| [Guides & Concepts](/docs/packages/async/guides/query-definitions) | Definitions, cache, cancellation |

Each API page: **Usage** → **Type Declarations** → **API** (see [createQuery](/docs/packages/async/api/create-query)).

> [!tip] Bind `.with(() => params)` inside `createModel`, not in views.
