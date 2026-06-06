---
title: Lazy Routes
description: createLazyRouteView, code splitting, and preload.
package: "@echojs-ecosystem/router"
---

# Lazy Routes

Split page views into async chunks with `createLazyRouteView`. Chunks are cached after first load.

## createLazyRouteView

```ts
import { createLazyRouteView } from "@echojs-ecosystem/router";

const settingsPage = createLazyRouteView({
  name: "settings",
  view: () => import("./settings.page.js"),
  loadingView: () => "Loading settings…",
});
```

Default export of the chunk must be a **`RouteView` function**. Use `page.preload()` to warm the chunk before navigation.

## In the route tree

```ts
export const appRoutes = createRoutes([
  {
    path: "/",
    name: "root",
    layoutView: shellLayout,
    children: [
      { path: "settings", name: "settings", routeView: settingsPage },
    ],
  },
]);
```

## Related

- [Route Trees](/docs/packages/router/guides/route-trees)
- [createLazyRouteView API](/docs/packages/router/api/route-views)
