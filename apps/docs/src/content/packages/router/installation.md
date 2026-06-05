---
title: Installation
description: Install @echojs-ecosystem/router and wire it through @echojs-ecosystem/framework or HyperDOM.
package: "@echojs-ecosystem/router"
---

# Installation

The router is split into a **core** package and **HyperDOM bindings**. EchoJS apps import both.

## Package managers

:::install @echojs-ecosystem/router

Typical peers (install if you build UI in HyperDOM):

:::install @echojs-ecosystem/hyperdom

:::install @echojs-ecosystem/reactivity

:::install @echojs-ecosystem/framework

## Imports

| Use case | Import |
| --- | --- |
| Route definitions | `@echojs-ecosystem/router` — `createRouteView`, `createRoutes`, … |
| App router instance | `@echojs-ecosystem/router/hyperdom` — `createRouter`, `NavLink`, `createRouterProvider` |
| Optional URL state | `@echojs-ecosystem/url-state` (separate package) |

```ts
import { createRouteView, createRoutes } from "@echojs-ecosystem/router";
import { createRouter, NavLink, createRouterProvider } from "@echojs-ecosystem/router/hyperdom";
```

## Framework wiring (`apps/docs` pattern)

```ts
// entities/__routes__/router.ts
import { createRouter } from "@echojs-ecosystem/router/hyperdom";
import { appRoutes } from "./app.routes.js";

export const appRouter = createRouter({
  history: "browser",
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
  routes: appRoutes,
});

// core/providers/router.ts
import { createRouterProvider } from "@echojs-ecosystem/router/hyperdom";

export const routerProvider = createRouterProvider(appRouter);
```

```ts
createEchoApp({ strictContextChecks: true })
  .use(routerProvider)
  .mount("#app");
```

## Monorepo

```json
{
  "dependencies": {
    "@echojs-ecosystem/router": "workspace:*",
    "@echojs-ecosystem/hyperdom": "workspace:*",
    "@echojs-ecosystem/framework": "workspace:*"
  }
}
```

## History modes

`createRouter({ history })` accepts:

| Value | Use |
| --- | --- |
| `"browser"` | Real URLs (production SPA) |
| `"hash"` | `#!` routing |
| `"memory"` | Tests, SSR-less demos |
| `RouterHistory` object | Custom adapter |
