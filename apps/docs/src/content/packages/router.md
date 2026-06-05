---
title: Router
description: Typed SPA routing with signal-backed route state and HyperDOM integration.
package: "@echojs/router"
keywords: [createRouter, NavLink, createRouteView, guards]
---

:::package-overview router

:::install @echojs/router

## Quick start

```ts
import { createRoutes, createRouter, NavLink } from "@echojs/router";

const routes = createRoutes({ home: { path: "/", page: HomePage } });
const router = createRouter({ routes, history: browserHistory() });
```

> [!tip]
> Search params and filters → `@echojs/url-state`.
