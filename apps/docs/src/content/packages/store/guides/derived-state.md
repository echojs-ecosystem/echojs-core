---
title: Derived State
description: select and combine — readonly derived stores from source stores.
package: '@echojs-ecosystem/store'
---

# Derived State

When state can be computed from other stores, use **`select`** or **`combine`**
instead of duplicating fields or manually syncing values. Both return
**readonly** stores that recompute when sources change.

## `select` — project one store

```ts
import { createStore, select } from '@echojs-ecosystem/store'

const userStore = createStore({ id: '1', name: 'Vova' })
const userName = select(userStore, (user) => user.name, { name: 'user-name' })

userName.value() // "Vova"
userName.subscribe((name, prev) => {})
userName.$value // ReadonlySignal
```

Recomputes when the source store changes. Supports `equals` in options like
`createStore`.

### Label from counter

```ts
export const counterLabel = select(counterStore, (n) => `×${n}`, {
  name: 'counter-label',
})
```

## `combine` — merge multiple sources

```ts
import { combine, createStore } from '@echojs-ecosystem/store'

const firstName = createStore('Vova')
const lastName = createStore('Ivanov')

const fullName = combine(
  { firstName, lastName },
  ({ firstName, lastName }) => `${firstName} ${lastName}`,
  { name: 'full-name' }
)

fullName.value() // "Vova Ivanov"
```

Sources can be `Store` or `ReadonlyStore`. The result is **readonly** — mutate
sources, not `fullName`.

## When to use which

| Tool                    | Use when                                         |
| ----------------------- | ------------------------------------------------ |
| `select`                | One source, one projection                       |
| `combine`               | Multiple sources, one combined value             |
| `computed` (reactivity) | Deriving inside a model from signals, not stores |

## Equality

Both `select` and `combine` accept the same `equals` option as `createStore`.
Use a custom comparator when derived values are objects or arrays that may be
referentially new but semantically equal.

## Guidelines

| Do                                    | Avoid                                  |
| ------------------------------------- | -------------------------------------- |
| `select` / `combine` for derived data | Duplicating source fields manually     |
| Keep selectors pure                   | Side effects inside selector functions |
| Name derived stores for debugging     | Anonymous derived stores in large apps |

## Related

- [API: select](/docs/packages/store/api/select)
- [API: combine](/docs/packages/store/api/combine)
- [Examples: combine Full Name](/docs/packages/store/examples/combine-names)
