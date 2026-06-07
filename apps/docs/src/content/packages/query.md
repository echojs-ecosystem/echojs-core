---
title: Query
description:
  Signal-native async cache for models — queries, mutations, invalidation.
package: '@echojs-ecosystem/query'
keywords: [createQuery, createMutation, queryClient]
---

:::package-overview query

:::install @echojs-ecosystem/query

## Quick start

```ts
import { createQuery } from '@echojs-ecosystem/query'

const userQuery = createQuery({
  queryKey: ['user', id] as const,
  queryFn: ({ signal }) => fetchUser(id, { signal }),
})
```

> [!tip] Bind `.with(() => params)` inside `createModel`, not in views.
