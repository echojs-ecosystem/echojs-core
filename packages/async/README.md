<div align="center">

# @echojs-ecosystem/async

**Signal-native async cache — queries, mutations, and infinite lists without hooks.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/async)](https://www.npmjs.com/package/@echojs-ecosystem/async)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/async)

</div>

---

Model-first data layer inspired by [TanStack Query](https://tanstack.com/query), adapted for EchoJS signals. No React hooks — use **`createQuery` + `.with()`** inside `createModel`.

## Features

- **`createQuery`** — declarative cache keys, stale time, retry, abort
- **Signal state** — `$data`, `$status`, `$error`, `$fetchStatus`
- **`createMutation`** — optimistic updates & rollback
- **`createInfiniteQuery`** — paginated / cursor lists
- **`createQueryClient`** — global invalidation, prefetch, cache control

## Install

```bash
npm install @echojs-ecosystem/async @echojs-ecosystem/reactivity
```

## Quick start

```ts
import { createQuery, createQueryClient } from "@echojs-ecosystem/async";

const client = createQueryClient();

export const getUserQuery = createQuery({
  name: "get-user",
  key: ({ id }) => ["user", id],
  fetcher: ({ params, signal }) => fetch(`/api/users/${params.id}`, { signal }).then((r) => r.json()),
  staleTime: "5m",
});

// In a model — reactive params
const user = getUserQuery.with(() => ({ id: $userId.value() }), { client });

user.data();
user.isPending();
user.$data.value();
await user.refetch();
```

## API

| Export | Description |
|--------|-------------|
| `createQuery` | Query definition |
| `.with(params)` / `.withStore()` | Bound instance |
| `createQueryClient` | Global cache |
| `createMutation` | Write operations |
| `createInfiniteQuery` | Paginated data |
| `focusManager` / `onlineManager` | Refetch triggers |

### Cancellation

```ts
await user.refetch({ abortController: new AbortController() });
user.cancel({ reason: "navigate-away" });
```

## Related packages

| Package | Role |
|---------|------|
| [`@echojs-ecosystem/store`](https://www.npmjs.com/package/@echojs-ecosystem/store) | Optional `withStore()` integration |
| [`@echojs-ecosystem/framework`](https://www.npmjs.com/package/@echojs-ecosystem/framework) | Query provider at app bootstrap |

## Documentation

[echojs.dev/docs/packages/async](https://echojs.dev/docs/packages/async)
