---
title: Data Fetching
description: Queries, mutations, and router loaders — where async work lives in EchoJS apps.
keywords: [createQuery, createMutation, beforeLoad, QueryClient]
---

# Data Fetching

Async data in EchoJS flows through **`@echojs/query`** (cache, retries, staleness) or **`beforeLoad`** on routes (one-shot loader data). Views and route components stay declarative; models and API modules own the wiring.

## Where code lives

| Pattern | Location | When |
| --- | --- | --- |
| Reusable fetchers | `features/<name>/api/*.queries.ts` | Lists, details, shared endpoints |
| Page-specific binding | `pages/**/model/*.model.ts` | `.with(() => params)` from route/props |
| One-off route payload | `beforeLoad` on `createRouteView` | Data tied to a single URL open |
| Writes | `createMutation` in API module | POST/PUT/DELETE |

Example reference: `apps/example/src/features/query-demo/api/jsonplaceholder.queries.ts`.

## Bootstrap Query

Register defaults once:

```ts
import { createQueryProvider } from "@echojs/query";

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});
```

Place **before** `routerProvider` if routes prefetch in `beforeLoad` using the shared client.

## Define a query

```ts
import { createQuery } from "@echojs/query";

export type User = { id: number; name: string };

export const listUsersQuery = createQuery<User[]>({
  name: "users-list",
  queryKey: () => ["api", "users"] as const,
  queryFn: ({ signal }) =>
    fetch("/api/users", { signal }).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    }),
});
```

Use stable **`queryKey` tuples** (`as const`). Optional `transform` maps the raw response before cache storage.

## Bind in a model

Reactive params — re-fetch when signals change:

```ts
import { signal } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";
import { getUserQuery } from "@features/users/api/users.queries.js";

export const createUserPanelModel = createModel((): UserPanelVM => {
  const $userId = signal(1);
  const user = getUserQuery.with(() => ({ id: $userId.value() }));

  return {
    userId: () => $userId.value(),
    setUserId: (id: number) => $userId.set(id),
    profile: () => user.data(),
    isLoading: () => user.isPending(),
    error: () => user.error(),
    refresh: () => user.refetch(),
  };
}, "UserPanelModel");
```

With a store-driven filter:

```ts
const posts = getUserPostsQuery.withStore($filter, (s) => ({ userId: s.userId }));
```

Disable fetches until ready:

```ts
detailQuery.with(() => ({ id }), { enabled: () => id != null });
```

## Read in views

Views call VM accessors only:

```ts
export const UserPanelView = createView((vm: UserPanelVM): Child =>
  div(null, [
    vm.isLoading() ? p(null, "Loading…") : null,
    vm.profile() ? p(null, vm.profile()!.name) : null,
    button({ onClick: vm.refresh }, () => "Retry"),
  ]),
  "UserPanelView",
);
```

Status helpers: `isSuccess()`, `isError()`, `isRefetching()`, `hasData()`. Signals: `query.$data`, `query.$status`, `query.$fetchStatus` for `effect`/`computed`.

## Docs article pattern

`apps/docs` loads markdown by `contentId`:

```ts
const docContentQuery = createQuery<DocDocument, { contentId: ContentId }>({
  name: "doc-content",
  queryKey: (p) => ["doc", p.contentId] as const,
  queryFn: ({ params }) => loadContent(params.contentId),
});

// In createDocArticleModel(props):
const doc = docContentQuery.with(() => ({ contentId: props.contentId }));
```

Same cache entry when navigating between docs with the same id; new key when `contentId` changes.

## Mutations

```ts
import { createMutation } from "@echojs/query";

export const updateProfileMutation = createMutation({
  name: "update-profile",
  mutationFn: (body: ProfileInput) =>
    fetch("/api/profile", { method: "PATCH", body: JSON.stringify(body) }).then((r) => r.json()),
  onSuccess: () => profileQuery.invalidate(),
});
```

Call `mutation.mutate(payload)` from model actions; read `isPending()` / `error()` in the VM.

## `beforeLoad` vs Query

| Use `beforeLoad` | Use `createQuery` |
| --- | --- |
| Data required to render **this route once** | Cached, shared, refetched, invalidated |
| Simple loader with no client cache | Lists with pagination, background refetch |
| Layout blocks children until ready | Same data on multiple pages |

You can combine both: `beforeLoad` for access checks, Query for editable lists on the same page.

## Errors and cancellation

- `queryFn` receives `signal` / `abortController` — respect abort on param changes (`abortPrevious` default `true`).
- Surface `query.error()` in the VM; global error boundaries are optional route `errorView`s.
- Set `retry: false` for mutations; tune `staleTime` / `cacheTime` per resource.

## Related

- [Query package](/docs/packages/query/overview)
- [Routing](/docs/guides/routing) — `beforeLoad`, loading views
- [Server state](/docs/state/server-state)
- [Authentication](/docs/guides/authentication) — token-aware `queryFn`
