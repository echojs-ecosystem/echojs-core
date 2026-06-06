---
title: API Reference
description: Complete @echojs-ecosystem/router public API index.
package: "@echojs-ecosystem/router"
---

# API Reference

Public exports from `@echojs-ecosystem/router` and `@echojs-ecosystem/router/hyperdom`:

```ts
import {
  createRouteView,
  createLayoutView,
  createLazyRouteView,
  createRoute,
  createRoutes,
  redirect,
  guardRoute,
  chainRoute,
} from "@echojs-ecosystem/router";

import {
  createRouter,
  createRouterProvider,
  Link,
  NavLink,
  ROUTER_KEY,
} from "@echojs-ecosystem/router/hyperdom";
```

## Core

| Export | Description |
| --- | --- |
| [Route Views](/docs/packages/router/api/route-views) | `createRouteView`, `createLayoutView`, `createLazyRouteView`, page API |
| [createRoutes & createRouter](/docs/packages/router/api/create-router) | Router factory, options, instance |
| [Operators](/docs/packages/router/api/operators) | `redirect`, `guardRoute`, `chainRoute` |
| [Path, Query & History](/docs/packages/router/api/path-query-history) | Path utilities, query parsing, history adapters |

## HyperDOM

| Export | Description |
| --- | --- |
| [HyperDOM Integration](/docs/packages/router/api/hyperdom) | `createRouterProvider`, `Link`, `NavLink` |

## Guides

Conceptual docs live under [Guides & Concepts](/docs/packages/router/guides/route-trees):

- [Route Trees & Layouts](/docs/packages/router/guides/route-trees)
- [Navigation & NavLink](/docs/packages/router/guides/navigation)
- [Guards & Redirects](/docs/packages/router/guides/guards-and-redirects)

## Limitations (v0)

- No file-based routing generator
- No async guard cancellation
- Simple 404 via `notFoundView`
