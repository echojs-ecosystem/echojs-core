---
title: Framework
description:
  Application bootstrap, providers, and composition root for EchoJS apps.
package: '@echojs-ecosystem/framework'
keywords: [createEchoApp, createProvider, provide, inject]
---

**Recommended starting point.** Install `@echojs-ecosystem/framework` once,
bootstrap from `/app`, and pull reactivity, HyperDOM, router, query, and the
rest through tree-shakeable subpaths. Individual packages below remain available
standalone — each **Installation** page documents both import styles.

:::package-overview framework

## Quick install

:::install @echojs-ecosystem/framework

## Import paths

| Path                                     | When to use                                                                             |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| `@echojs-ecosystem/framework/app`        | Bootstrap — `createEchoApp`, `createProvider`, `provide` / `inject`                     |
| `@echojs-ecosystem/framework/reactivity` | Feature code when you use the meta-package (same API as `@echojs-ecosystem/reactivity`) |
| `@echojs-ecosystem/framework/router`     | Same pattern for router, query, store, UI, …                                            |

```ts
// Bootstrap
import { createEchoApp } from '@echojs-ecosystem/framework/app'

// Features — one dependency, subpath imports
import { signal } from '@echojs-ecosystem/framework/reactivity'
import { createRouter } from '@echojs-ecosystem/framework/router'
```

> [!tip] Prefer **standalone** `@echojs-ecosystem/<package>` when you want an
> explicit dependency graph. Prefer **framework subpaths** when you already
> depend on the meta-package. See
> [Subpath Imports](/docs/packages/framework/guides/subpath-imports) and each
> module's Installation page.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/framework/functions) | API index — `createEchoApp`, providers, DI |
| [Guides & Concepts](/docs/packages/framework/guides/important-defaults) | Mount pipeline and provider order |
| [Examples](/docs/packages/framework/example) | Wiring from `apps/docs` and `apps/example` |

Each API page: **Usage** → **Type Declarations** → **API** (see [createEchoApp](/docs/packages/framework/api/create-echo-app)).
