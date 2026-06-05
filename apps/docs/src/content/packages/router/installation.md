---
title: Installation
description: Install @echojs/router and wire it through @echojs/framework or HyperDOM.
package: "@echojs/router"
---

# Installation

The router is split into a **core** package and **HyperDOM bindings**. EchoJS apps import both.

## Package managers

:::install @echojs/router

Typical peers (install if you build UI in HyperDOM):

:::install @echojs/hyperdom

:::install @echojs/reactivity

:::install @echojs/framework

## Imports

| Use case | Import |
| --- | --- |
| Route definitions | `@echojs/router` — `createRouteView`, `createRoutes`, … |
| App router instance | `@echojs/router/hyperdom` — `createRouter`, `NavLink`, `createRouterProvider` |
| Optional URL state | `@echojs/url-state` (separate package) |

```ts
import { createRouteView, createRoutes } from "@echojs/router";
import { createRouter, NavLink, createRouterProvider } from "@echojs/router/hyperdom";
```

## Framework wiring (`apps/docs` pattern)

```ts
// entities/__routes__/router.ts
import { createRouter } from "@echojs/router/hyperdom";
import { appRoutes } from "./app.routes.js";

export const appRouter = createRouter({
  history: "browser",
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
  routes: appRoutes,
});

// app/providers/router.ts
import { createRouterProvider } from "@echojs/router/hyperdom";

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
    "@echojs/router": "workspace:*",
    "@echojs/hyperdom": "workspace:*",
    "@echojs/framework": "workspace:*"
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
