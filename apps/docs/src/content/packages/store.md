---
title: Store
description:
  Structured client state with actions, events, and derived selectors.
package: '@echojs-ecosystem/store'
keywords: [createStore, withActions, select, combine]
---

:::package-overview store

:::install @echojs-ecosystem/store

## Key APIs

| Export | Role |
| ------ | ---- |
| [`createStore`](/docs/packages/store/api/create-store) | Immutable-friendly state container with `.get()` / `.set()` |
| [`withActions`](/docs/packages/store/guides/actions) | Named methods that call `set` / `update` |
| [`select`](/docs/packages/store/api/select) | Derived slice as a readonly signal |
| [`combine`](/docs/packages/store/api/combine) | Merge multiple stores for cross-slice reads |
| [`withEvents`](/docs/packages/store/api/extensions) | Pub/sub between stores without tight coupling |

## Common patterns

- Place stores in **`entities/<name>/model/`** — one store per domain aggregate.
- Use **`select`** for view-friendly projections instead of reading full state in
  every component.
- Persist slices with `@echojs-ecosystem/persist` on the same store instance.

> [!tip] Persist slices with `@echojs-ecosystem/persist` on the same store instance.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/store/functions) | API index — `createStore`, `select`, `combine` |
| [Guides & Concepts](/docs/packages/store/guides/creating-stores) | Actions, derived state, events |

Each API page: **Usage** → **Type Declarations** → **API** (see [createStore](/docs/packages/store/api/create-store)).
