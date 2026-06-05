---
title: Example
description: JSONPlaceholder queries and query demo model from apps/example.
package: "@echojs-ecosystem/query"
---

# Example — Query

## Query definitions (`features/query-demo/api`)

```ts
import { createQuery } from "@echojs-ecosystem/query";
import { jpFetch } from "@core/api/jsonplaceholder.js";

export const listUsersQuery = createQuery({
  name: "jp-users",
  queryKey: () => ["jsonplaceholder", "users"] as const,
  queryFn: ({ signal }) => jpFetch("/users", { signal }),
});

export const getUserQuery = createQuery({
  name: "jp-user",
  queryKey: ({ id }: { id: number }) => ["jsonplaceholder", "user", id] as const,
  keepPreviousData: true,
  abortPrevious: true,
  queryFn: ({ params, signal }) => jpFetch(`/users/${params.id}`, { signal }),
});
```

## Model — reactive `.with()`

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

## View — status helpers

```ts
Show(
  () => user.isPending(),
  () => p(null, "Loading user…"),
);
Show(
  () => user.isError(),
  () => p(null, () => String(user.error())),
);
Show(
  () => user.hasData(),
  () => p(null, () => user.data()!.name),
);
```

## Docs site — markdown loader

```ts
// apps/docs — pages/doc/model/doc-article.model.ts
import { createQuery } from "@echojs-ecosystem/query";

const docContentQuery = createQuery({
  name: "doc-content",
  queryKey: ({ contentId }) => ["doc-content", contentId] as const,
  queryFn: async ({ params }) => {
    const raw = await loadContentRaw(params.contentId);
    return parseMarkdown(raw);
  },
  staleTime: 3_600_000,
});

const query = docContentQuery.with(() => ({ contentId: props.contentId }));
```

## Provider defaults

```ts
// apps/docs/src/core/providers/query.ts
import { createQueryProvider } from "@echojs-ecosystem/query";

export const queryProvider = createQueryProvider({
  defaultOptions: { queries: { staleTime: 60_000 } },
});
```

## Live app

| Resource | Path |
| --- | --- |
| Query demo | `apps/example/src/features/query-demo/` |
| Docs articles | `apps/docs/src/pages/doc/model/doc-article.model.ts` |
| Route | `/docs/query` in example lab |

## See also

- Usage — `/docs/packages/query/usage`
- Framework Example — `/docs/packages/framework/example`
