---
title: Installation
description: Install @echojs-ecosystem/store and verify imports in your EchoJS app.
package: "@echojs-ecosystem/store"
---

# Installation

`@echojs-ecosystem/store` is framework-agnostic and SSR-friendly: no `localStorage`, no DOM — safe to import on the server unless you attach persist extensions.

## Import paths

| Path | When to use |
| --- | --- |
| `@echojs-ecosystem/store` | À la carte install — explicit dependency in `package.json` |
| `@echojs-ecosystem/framework/store` | You already use the framework meta-package — one install, subpath imports |

```ts
// Standalone package
import { createStore, select, withActions } from "@echojs-ecosystem/store";

// Same API via framework subpath
import { createStore, select, withActions } from "@echojs-ecosystem/framework/store";
```

> [!tip]
> Pick **one style per app** and stay consistent. Mixing both paths works at runtime but clutters dependency graphs.

## Quick install

Standalone:

:::install @echojs-ecosystem/store

Peer you will use directly in app code:

:::install @echojs-ecosystem/reactivity

Or install the full framework once (includes store and reactivity):

:::install @echojs-ecosystem/framework

## Requirements

| Requirement | Notes |
| --- | --- |
| **TypeScript** 5.x | Typed `.extend()` merges |
| **ESM bundler** | Vite, Bun, webpack with ESM output |
| **Runtime** | Modern browsers or Node 20+ |

## Verify the import

```ts
import { createStore } from "@echojs-ecosystem/store";
// or: from "@echojs-ecosystem/framework/store"

const counter = createStore(0, { name: "counter" });
counter.set(1);
console.log(counter.value()); // 1
```

## Optional persistence

Hydration and storage adapters live in **`@echojs-ecosystem/persist`**, not store:

:::install @echojs-ecosystem/persist

```ts
import { createStore } from "@echojs-ecosystem/store";
import { withLocalStorage } from "@echojs-ecosystem/persist";

const theme = createStore("dark").extend(withLocalStorage({ key: "theme" }));
```

See [Session Stores](/docs/packages/store/examples/session-stores) and the [Persist package](/docs/packages/persist).

## Next steps

- [Creating Stores](/docs/packages/store/guides/creating-stores) — first patterns
- [Actions](/docs/packages/store/guides/actions) — `withActions` for mutations
- [Examples](/docs/packages/store/example) — copy-paste patterns
