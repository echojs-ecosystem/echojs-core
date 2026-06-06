---
title: Important Defaults
description: How persist attaches to stores, the controller API, and record format.
package: "@echojs-ecosystem/persist"
---

# Important Defaults

`@echojs-ecosystem/persist` extends Echo stores at runtime. These defaults shape hydration timing, auto-save behavior, and how snapshots are stored.

## Basic `.extend()`

```ts
import { createStore } from "@echojs-ecosystem/store";
import { withLocalStorage } from "@echojs-ecosystem/persist";

export const themeStore = createStore("dark", { name: "theme" }).extend(
  withLocalStorage({
    key: "app-theme",
    version: 1,
  }),
);
```

By default hydration runs when the extension attaches (unless `hydrate: false`).

## Persist controller

Every extended store gains a `persist` controller:

```ts
await themeStore.persist.hydrate();
await themeStore.persist.save();
await themeStore.persist.clear();

themeStore.persist.pause();  // stop auto-save
themeStore.persist.resume();

themeStore.persist.$hydrated.value();
themeStore.persist.$pending.value();
themeStore.persist.$error.value();
```

IndexedDB operations are **async** — watch `$pending` during hydrate/save.

## Persist record format

Stored JSON wraps your snapshot:

```ts
type PersistRecord<Snapshot> = {
  version: number;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
  data: Snapshot;
};
```

## Without store `.extend()`

For form-like targets or non-store persistables:

```ts
import { persist, withLocalStorage } from "@echojs-ecosystem/persist";

persist(fieldLike, withLocalStorage({ key: "profile:name" }));
```

`persistField` / `persistFieldArray` are aliases for form-like targets (future `@echojs-ecosystem/form`).

## See also

- [Hydrate & Save](/docs/packages/persist/guides/hydrate-and-save)
- [Persist Controller](/docs/packages/persist/api/persist-controller)
