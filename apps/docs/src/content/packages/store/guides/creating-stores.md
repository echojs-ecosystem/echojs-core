---
title: Creating Stores
description: createStore basics — value access, updates, equality, and naming.
package: '@echojs-ecosystem/store'
---

# Creating Stores

A **store** wraps a reactive signal with a domain-oriented API: `set`, `update`,
`reset`, subscriptions, and optional extensions. Use stores for shared
application state that outlives a single view or model instance.

## Basic usage

```ts
import { createStore } from '@echojs-ecosystem/store'

const counter = createStore(0, { name: 'counter' })

counter.set(10)
counter.update((v) => v + 1)
counter.reset() // back to initial 0
counter.value() // read current state
```

Each store exposes:

| Member       | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| **`$value`** | Underlying `Signal<State>` from reactivity — use in `effect`, `computed` |
| **`name`**   | Optional debug label                                                     |
| **`kind`**   | `"store"` (or `"readonly-store"` after readonly extension)               |

## Store options

```ts
createStore(initial, {
  name: 'tags', // debug label
  equals: Object.is, // default — skip notification when equal
})
```

### Custom equality

By default updates use **`Object.is`**. Skip notification when values are equal
under your rule:

```ts
const list = createStore<string[]>([], {
  name: 'tags',
  equals: (a, b) => a.length === b.length && a.every((x, i) => x === b[i]),
})

// Always emit (treat every set as a change):
const noisy = createStore(0, { equals: false })
```

`equals: false` — always treat updates as changes and always notify subscribers.

## Module-level stores

Stores are typically defined once at module scope and imported where needed:

```ts
// entities/session/auth-store.ts
export const authTokenStore = createStore<string | null>(null, {
  name: 'auth-token',
})
```

One store per domain concern (`auth-user`, `theme`, `cart`) — avoid a single
giant global app object.

## `.extend()` chaining

Add methods or cross-cutting behavior without subclassing:

```ts
const counter = createStore(0)
  .extend((store) => ({
    increment() {
      store.update((v) => v + 1)
    },
  }))
  .extend(withDebug())
  .extend(withReadonly())
```

Extensions receive the store instance and return an object merged onto it (typed
per extension).

## `batch` for grouped updates

Re-export from `@echojs-ecosystem/reactivity` — group multiple store updates
into one notification wave:

```ts
import { batch } from '@echojs-ecosystem/store'

batch(() => {
  counter.set(1)
  other.set(true)
})
```

## Guidelines

| Do                                  | Avoid                          |
| ----------------------------------- | ------------------------------ |
| One store per domain concern        | Giant global app object        |
| `withActions` for public mutations  | Random `set` from views        |
| `name` + `withDebug` in development | Anonymous stores in large apps |

## Related

- [Actions with withActions](/docs/packages/store/guides/actions)
- [API: createStore](/docs/packages/store/api/create-store)
- [Examples: Theme & Counter](/docs/packages/store/examples/theme-and-counter)
