---
title: Query Demo Model
description: Reactive .with() binding for users list and selected user detail.
package: "@echojs-ecosystem/query"
---

# Query Demo Model

The query demo model binds two query definitions to reactive params — a list query with no params and a detail query keyed on a selected user ID signal.

## Problem

When the user picks a different ID from a list, refetch the detail query automatically without manual `refetch()` calls.

## Model

```ts
import { signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";
import { getUserQuery, listUsersQuery } from "../api/jsonplaceholder.queries.js";

export const createQueryDemoModel = createModel(() => {
  const $selectedUserId = signal(1);

  const users = listUsersQuery.with();
  const user = getUserQuery.with(() => ({ id: $selectedUserId.value() }));

  return {
    users,
    user,
    $selectedUserId,
    selectUser: (id: number) => $selectedUserId.set(id),
    refetchAll: () => Promise.all([users.refetch(), user.refetch()]),
  };
}, "QueryDemoModel");
```

## Key points

- **`listUsersQuery.with()`** — void params, fetches once on mount
- **`getUserQuery.with(() => ({ id: ... }))`** — re-runs when `$selectedUserId` changes
- **`refetchAll`** — imperative escape hatch for manual refresh

## Live reference

| Resource | Path |
| --- | --- |
| Query demo feature | `apps/example/src/features/query-demo/` |
| Route | `/docs/query` in example lab |

## See also

- [Guides: Reactive Binding](/docs/packages/query/guides/reactive-binding)
- [Examples: JSONPlaceholder](/docs/packages/query/examples/jsonplaceholder)
