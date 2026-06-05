---
title: Installation
description: Install @echojs-ecosystem/persist with @echojs-ecosystem/store.
package: "@echojs-ecosystem/persist"
---

# Installation

Persist extends stores at runtime — install **both** packages.

## Package managers

:::install @echojs-ecosystem/persist

:::install @echojs-ecosystem/store

## Requirements

- Browser APIs for adapters you use (`localStorage`, `document.cookie`, `indexedDB`)
- **SSR / tests:** use `withMemoryStorage()` — browser adapters no-op safely when `window` is missing

## Monorepo

```json
{
  "dependencies": {
    "@echojs-ecosystem/persist": "workspace:*",
    "@echojs-ecosystem/store": "workspace:*"
  }
}
```

## Minimal check

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
