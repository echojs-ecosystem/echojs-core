---
title: Store
description: Structured client state with actions, events, and derived selectors.
package: "@echojs-ecosystem/store"
keywords: [createStore, withActions, select, combine]
---

:::package-overview store

:::install @echojs-ecosystem/store

## Quick start

```ts
import { createStore, withActions } from "@echojs-ecosystem/store";

const counter = createStore({ count: 0 }).extend(
  withActions((store) => ({
    increment: () => store.update((s) => ({ count: s.count + 1 })),
  })),
);
```

> [!tip]
> Persist slices with `@echojs-ecosystem/persist` on the same store instance.
