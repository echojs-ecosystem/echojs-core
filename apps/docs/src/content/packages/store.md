---
title: Store
description:
  Structured client state with actions, events, and derived selectors.
package: '@echojs-ecosystem/store'
keywords: [createStore, withActions, select, combine]
---

:::package-overview store

:::install @echojs-ecosystem/store

## Quick start

```ts
import { createStore, withActions } from '@echojs-ecosystem/store'

const counter = createStore({ count: 0 }).extend(
  withActions((store) => ({
    increment: () => store.update((s) => ({ count: s.count + 1 })),
  }))
)
```

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/store/functions) | API index — `createStore`, `select`, `combine` |
| [Guides & Concepts](/docs/packages/store/guides/creating-stores) | Actions, derived state, events |

Each API page: **Usage** → **Type Declarations** → **API** (see [createStore](/docs/packages/store/api/create-store)).

> [!tip] Persist slices with `@echojs-ecosystem/persist` on the same store instance.
