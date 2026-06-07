---
title: Theme & Counter
description:
  Theme toggle and counter stores with withActions and select from the example
  docs module.
package: '@echojs-ecosystem/store'
---

# Theme & Counter

The state demo page in the EchoJS example app defines module-level stores for
theme and counter — the canonical pattern for shared UI preferences and simple
counters.

## Problem

Share theme and counter state across views without prop drilling or duplicating
signals in every model.

## Store definitions

```ts
// pages/docs/state/state.model.ts
import { createStore, select, withActions } from '@echojs-ecosystem/store'

export const themeStore = createStore('dark' as 'dark' | 'light', {
  name: 'theme',
}).extend(
  withActions({
    toggle: (store) => () =>
      store.update((t) => (t === 'dark' ? 'light' : 'dark')),
    setDark: (store) => () => store.set('dark'),
    setLight: (store) => () => store.set('light'),
  })
)

export const counterStore = createStore(0, { name: 'counter' }).extend(
  withActions({
    increment: (store) => () => store.update((v) => v + 1),
    decrement: (store) => () => store.update((v) => v - 1),
    add: (store) => (amount: number) => store.update((v) => v + amount),
  })
)

export const counterLabel = select(counterStore, (n) => `×${n}`, {
  name: 'counter-label',
})
```

## Key points

- **`withActions`** exposes `toggle`, `increment`, etc. — views never call `set`
  directly
- **`select`** derives `counterLabel` from `counterStore` — updates
  automatically
- **`name`** options aid debugging with `withDebug()`

## Live reference

| Resource         | Path                                               |
| ---------------- | -------------------------------------------------- |
| State page model | `apps/example/src/pages/docs/state/state.model.ts` |

## See also

- [Guides: Actions](/docs/packages/store/guides/actions)
- [Examples: View Reads Store](/docs/packages/store/examples/view-integration)
