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

## What to read next

- [Important Defaults](/docs/packages/framework/guides/important-defaults) —
  mount pipeline and provider order
- [createEchoApp](/docs/packages/framework/guides/create-echo-app) — options and
  teardown
- [Examples](/docs/packages/framework/example) — wiring from `apps/docs` and
  `apps/example`
