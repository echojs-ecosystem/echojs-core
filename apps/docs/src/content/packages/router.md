---
title: Router
description: Typed SPA routing with signal-backed route state and HyperDOM integration.
package: "@echojs-ecosystem/router"
keywords: [createRouter, NavLink, createRouteView, guards]
---

:::package-overview router

:::install @echojs-ecosystem/router

## Quick start

```ts
import { createRoutes, createRouter, NavLink } from "@echojs-ecosystem/router";

const routes = createRoutes({ home: { path: "/", page: HomePage } });
const router = createRouter({ routes, history: browserHistory() });
```

> [!tip]
> Search params and filters → `@echojs-ecosystem/url-state`.
