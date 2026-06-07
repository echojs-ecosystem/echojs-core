---
title: Installation
description:
  Install @echojs-ecosystem/router and wire it through
  @echojs-ecosystem/framework or HyperDOM.
package: '@echojs-ecosystem/router'
---

# Installation

The router is split into a **core** package and **HyperDOM bindings**. EchoJS
apps import both.

## Import paths

| Path                                 | When to use                                                             |
| ------------------------------------ | ----------------------------------------------------------------------- |
| `@echojs-ecosystem/router`           | Route definitions — `createRouteView`, `createRoutes`, operators        |
| `@echojs-ecosystem/router/hyperdom`  | App router instance — `createRouter`, `NavLink`, `createRouterProvider` |
| `@echojs-ecosystem/framework/router` | You already use the framework meta-package — same API as standalone     |

```ts
import { createRouteView, createRoutes } from '@echojs-ecosystem/router'
import {
  createRouter,
  NavLink,
  createRouterProvider,
} from '@echojs-ecosystem/router/hyperdom'

// Same API via framework subpath
import { createRouteView as page } from '@echojs-ecosystem/framework/router'
import { createRouter as router } from '@echojs-ecosystem/framework/router'
```

> [!tip] Pick **one style per app** and stay consistent. Mixing standalone and
> framework subpaths works at runtime but clutters dependency graphs.

Optional URL state sync: `@echojs-ecosystem/url-state` (separate package).

## Quick install

:::install @echojs-ecosystem/router

Typical peers (install if you build UI in HyperDOM):

:::install @echojs-ecosystem/hyperdom

:::install @echojs-ecosystem/reactivity

:::install @echojs-ecosystem/framework

## Framework wiring

```ts
// entities/__routes__/router.ts
import { createRouter } from '@echojs-ecosystem/router/hyperdom'
import { appRoutes } from './app.routes.js'

export const appRouter = createRouter({
  history: 'browser',
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
  routes: appRoutes,
})

// core/providers/router.ts
import { createRouterProvider } from '@echojs-ecosystem/router/hyperdom'

export const routerProvider = createRouterProvider(appRouter)
```

```ts
import { createEchoApp } from '@echojs-ecosystem/framework/app'

createEchoApp({ strictContextChecks: true }).use(routerProvider).mount('#app')
```

## History modes

`createRouter({ history })` accepts:

| Value                  | Use                        |
| ---------------------- | -------------------------- |
| `"browser"`            | Real URLs (production SPA) |
| `"hash"`               | `#!` routing               |
| `"memory"`             | Tests, SSR-less demos      |
| `RouterHistory` object | Custom adapter             |

## Next steps

- [Route Trees & Layouts](/docs/packages/router/guides/route-trees) —
  `createRoutes`
- [Router Lifecycle](/docs/packages/router/guides/router-lifecycle) — `start()`
  / `stop()`
- [Examples](/docs/packages/router/example) — docs and lab routes
