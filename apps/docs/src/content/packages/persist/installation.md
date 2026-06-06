---
title: Installation
description: Add @echojs-ecosystem/persist alongside @echojs-ecosystem/store.
package: "@echojs-ecosystem/persist"
---

# Installation

Persist extends stores at runtime — install **both** the persist package and store.

## Import paths

| Path | When to use |
| --- | --- |
| `@echojs-ecosystem/persist` | À la carte install — explicit dependency |
| `@echojs-ecosystem/framework/persist` | You already use the framework meta-package |

```ts
import { withLocalStorage } from "@echojs-ecosystem/persist";
// or: from "@echojs-ecosystem/framework/persist"
```

## Quick install

:::install @echojs-ecosystem/persist

:::install @echojs-ecosystem/store

Or install the full framework once (includes persist and store):

:::install @echojs-ecosystem/framework

## Requirements

| Requirement | Notes |
| --- | --- |
| **Browser APIs** | `localStorage`, `document.cookie`, or `indexedDB` depending on adapter |
| **SSR / tests** | Use `withMemoryStorage()` — browser adapters no-op safely when `window` is missing |

## Verify the import

```ts
import { createStore } from "@echojs-ecosystem/store";
import { withMemoryStorage } from "@echojs-ecosystem/persist";

const counter = createStore(0).extend(
  withMemoryStorage({ key: "counter-test" }),
);

await counter.persist.hydrate();
counter.set(5);
await counter.persist.save();
```

## Next steps

- [Important Defaults](/docs/packages/persist/guides/important-defaults) — `.extend()` and the persist controller
- [Storage Adapters](/docs/packages/persist/guides/storage-adapters) — localStorage, cookies, IndexedDB
- [Examples](/docs/packages/persist/example) — theme and auth patterns
