---
title: Slicing & Merge
description: Persist only part of a store with select and merge.
package: '@echojs-ecosystem/persist'
---

# Slicing & Merge

Persist only part of a store — e.g. token in a cookie, profile in localStorage.

## `select` and `merge`

```ts
const auth = createStore({ token: null as string | null, user: null }).extend(
  withCookie({
    key: 'access-token',
    select: (state) => state.token,
    merge: (state, token) => ({ ...state, token }),
  })
)
```

| Option   | Role                                               |
| -------- | -------------------------------------------------- |
| `select` | Extract the snapshot written to storage            |
| `merge`  | Merge hydrated snapshot back into full store state |

## Split stores pattern

Separate stores per concern keeps adapters simple:

```ts
export const authTokenStore = createStore<string | null>(null).extend(
  withCookie({ key: 'echojs-access-token', path: '/', sameSite: 'lax' })
)

export const authUserStore = createStore<AuthUser | null>(null).extend(
  withLocalStorage({ key: 'echojs-auth-user' })
)
```

Reference implementation: `apps/example/src/entities/session/auth-store.ts`.

## See also

- [Auth Session example](/docs/packages/persist/examples/auth-session)
- [Storage Adapters](/docs/packages/persist/guides/storage-adapters)
