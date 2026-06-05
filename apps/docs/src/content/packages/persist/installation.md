---
title: Installation
description: Install @echojs/persist with @echojs/store.
package: "@echojs/persist"
---

# Installation

Persist extends stores at runtime — install **both** packages.

## Package managers

:::install @echojs/persist

:::install @echojs/store

## Requirements

- Browser APIs for adapters you use (`localStorage`, `document.cookie`, `indexedDB`)
- **SSR / tests:** use `withMemoryStorage()` — browser adapters no-op safely when `window` is missing

## Monorepo

```json
{
  "dependencies": {
    "@echojs/persist": "workspace:*",
    "@echojs/store": "workspace:*"
  }
}
```

## Minimal check

```ts
import { createStore } from "@echojs/store";
import { withMemoryStorage } from "@echojs/persist";

const counter = createStore(0).extend(
  withMemoryStorage({ key: "counter-test" }),
);

await counter.persist.hydrate();
counter.set(5);
await counter.persist.save();
```
