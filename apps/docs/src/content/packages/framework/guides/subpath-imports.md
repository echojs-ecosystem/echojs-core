---
title: Subpath Imports
description: Root barrel vs narrow imports from @echojs-ecosystem/framework.
package: '@echojs-ecosystem/framework'
---

# Subpath Imports

`@echojs-ecosystem/framework` is a **meta package** — it re-exports ecosystem
packages for convenience while keeping `/app` as the bootstrap entry.

## Bootstrap: always `/app`

```ts
import {
  createEchoApp,
  createProvider,
  ROUTER_KEY,
} from '@echojs-ecosystem/framework/app'
```

There is no `@echojs-ecosystem/framework/framework` subpath.

## Root barrel re-exports

The root `@echojs-ecosystem/framework` barrel re-exports sub-packages:

| Module                                                 | Re-exports         |
| ------------------------------------------------------ | ------------------ |
| `hyperdom`                                             | HyperDOM surface   |
| `reactivity`                                           | Signals            |
| `router` / `router-hyperdom`                           | Router             |
| `query`, `store`, `persist`, `url-state`, `ui`, `form` | Ecosystem packages |

```ts
// Convenience — one dependency in package.json
import { signal } from '@echojs-ecosystem/framework/reactivity'
import { createRouter } from '@echojs-ecosystem/framework/router'
```

## When to import narrowly

| Style                                    | Trade-off                                             |
| ---------------------------------------- | ----------------------------------------------------- |
| `@echojs-ecosystem/framework/reactivity` | One install, bundler aliases map subpaths             |
| `@echojs-ecosystem/reactivity`           | Explicit dependency graph, clearer package boundaries |

Pick **one style per app** and stay consistent. Mixing both paths works at
runtime but clutters dependency graphs.

## Prefer direct imports in features

```ts
// bootstrap
import { createEchoApp } from '@echojs-ecosystem/framework/app'

// feature code
import { signal } from '@echojs-ecosystem/reactivity'
import { createView } from '@echojs-ecosystem/hyperdom'
```

Size-sensitive apps import each package directly rather than pulling the full
barrel.

## Related

- [Installation](/docs/packages/framework/installation) — typical stack
- [App Exports API](/docs/packages/framework/api/app-exports) — full barrel
  table
