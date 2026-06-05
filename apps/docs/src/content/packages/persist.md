---
title: Persist
description: Persist Echo stores to localStorage, cookies, and other adapters.
package: "@echojs/persist"
keywords: [withLocalStorage, hydrate, migrate]
---

:::package-overview persist

:::install @echojs/persist

## Quick start

```ts
import { withLocalStorage } from "@echojs/persist";

const prefs = createStore({ theme: "system" }).extend(
  withLocalStorage({ key: "prefs", version: 1 }),
);
```

> [!tip]
> Call `.persist.hydrate()` after app bootstrap when using SSR or guards.
