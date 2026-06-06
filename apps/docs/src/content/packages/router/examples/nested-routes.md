---
title: Nested Routes
description: Nested docs module routes from apps/example.
package: "@echojs-ecosystem/router"
---

# Nested Routes

Example lab — nested docs module with layout and child pages.

```ts
export const docsRoutes = createRoutes([
  {
    path: "/docs",
    name: "docs",
    layoutView: docsShellLayoutPage,
    children: [
      { path: "/", name: "docs-home", routeView: docsHomePage },
      { path: "reactivity", name: "reactivity", routeView: reactivityPage },
      { path: "query", name: "query", routeView: queryPage },
    ],
  },
]);
```

Child paths are **relative** to the parent layout segment.

## Related

- [Route Trees guide](/docs/packages/router/guides/route-trees)
- [Page + Layout](/docs/packages/router/examples/page-and-layout)
