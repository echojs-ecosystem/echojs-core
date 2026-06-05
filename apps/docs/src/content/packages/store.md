---
title: Store
description: Structured client state with actions, events, and derived selectors.
package: "@echojs/store"
keywords: [createStore, withActions, select, combine]
---

:::package-overview store

:::install @echojs/store

## Quick start

```ts
import { createStore, withActions } from "@echojs/store";

const counter = createStore({ count: 0 }).extend(
  withActions((store) => ({
    increment: () => store.update((s) => ({ count: s.count + 1 })),
  })),
);
```

> [!tip]
> Persist slices with `@echojs/persist` on the same store instance.
