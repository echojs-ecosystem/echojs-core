---
title: Installation
description: Install @echojs/store and verify imports in your EchoJS app.
package: "@echojs/store"
---

# Installation

`@echojs/store` is framework-agnostic and SSR-friendly: no `localStorage`, no DOM — safe to import on the server unless you attach persist extensions.

## Package managers

:::install @echojs/store

Peer you will use directly in app code:

:::install @echojs/reactivity

## Requirements

- **TypeScript** 5.x (typed `.extend()` merges)
- **ESM** bundler (Vite, Bun, etc.)
- Runtime: modern browsers or Node 20+

## Monorepo (echojs-core)

```json
{
  "dependencies": {
    "@echojs/store": "workspace:*",
    "@echojs/reactivity": "workspace:*"
  }
}
```

From repo root:

```bash
bun install
```

## Minimal import check

```ts
import { createStore } from "@echojs/store";

const counter = createStore(0, { name: "counter" });
counter.set(1);
console.log(counter.value()); // 1
```

## Optional: persistence

Hydration and adapters are **`@echojs/persist`**, not store:

:::install @echojs/persist

```ts
import { createStore } from "@echojs/store";
import { withLocalStorage } from "@echojs/persist";

const theme = createStore("dark").extend(withLocalStorage({ key: "theme" }));
```

See example `apps/example/src/entities/session/auth-store.ts`.

## Vite alias

Docs and example apps already alias `@echojs/store` in `vite.config.ts` — copy that pattern for new workspace apps.
