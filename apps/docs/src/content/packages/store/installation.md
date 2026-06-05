---
title: Installation
description: Install @echojs-ecosystem/store and verify imports in your EchoJS app.
package: "@echojs-ecosystem/store"
---

# Installation

`@echojs-ecosystem/store` is framework-agnostic and SSR-friendly: no `localStorage`, no DOM — safe to import on the server unless you attach persist extensions.

## Package managers

:::install @echojs-ecosystem/store

Peer you will use directly in app code:

:::install @echojs-ecosystem/reactivity

## Requirements

- **TypeScript** 5.x (typed `.extend()` merges)
- **ESM** bundler (Vite, Bun, etc.)
- Runtime: modern browsers or Node 20+

## Monorepo (echojs-core)

```json
{
  "dependencies": {
    "@echojs-ecosystem/store": "workspace:*",
    "@echojs-ecosystem/reactivity": "workspace:*"
  }
}
```

From repo root:

```bash
bun install
```

## Minimal import check

```ts
import { createStore } from "@echojs-ecosystem/store";

const counter = createStore(0, { name: "counter" });
counter.set(1);
console.log(counter.value()); // 1
```

## Optional: persistence

Hydration and adapters are **`@echojs-ecosystem/persist`**, not store:

:::install @echojs-ecosystem/persist

```ts
import { createStore } from "@echojs-ecosystem/store";
import { withLocalStorage } from "@echojs-ecosystem/persist";

const theme = createStore("dark").extend(withLocalStorage({ key: "theme" }));
```

See example `apps/example/src/entities/session/auth-store.ts`.

## Vite alias

Docs and example apps already alias `@echojs-ecosystem/store` in `vite.config.ts` — copy that pattern for new workspace apps.
