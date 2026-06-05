---
title: Example
description: Routes, layouts, and NavLink from apps/docs and apps/example.
package: "@echojs-ecosystem/router"
---

# Example — Router

## Docs — dynamic routes from nav (`apps/docs`)

```ts
import { createRoutes } from "@echojs-ecosystem/router";
import { canonicalDocsRouteItems } from "@core/content/nav.js";
import { getDocPage } from "@entities/__routes__/doc-pages.js";
import { docsShellLayoutPage } from "@pages/docs/layout/docs-shell-layout.page.js";

const docChildren = canonicalDocsRouteItems().map((item) => ({
  path: item.contentId,
  name: item.routeName,
  routeView: getDocPage(item.contentId),
}));

export const docsRoutes = createRoutes([
  {
    path: "/docs",
    name: "docs",
    layoutView: docsShellLayoutPage,
    children: docChildren,
  },
]);
```

```ts
// entities/__routes__/router.ts
import { createRouter } from "@echojs-ecosystem/router/hyperdom";

export const appRouter = createRouter({
  history: "browser",
  routes: appRoutes,
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
});
```

## Example lab — nested docs module

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

## Page + layout

```ts
import { createRouteView, createLayoutView } from "@echojs-ecosystem/router";

const shell = createLayoutView({
  name: "docs-shell",
  view: ({ outlet }) => DocsShell(outlet()),
});

const docPage = createRouteView({
  name: "doc-article",
  view: ({ params }) => DocArticle({ contentId: params.contentId }),
  beforeLoad: async ({ params }) => loadDoc(params.contentId),
});
```

## NavLink in sidebar

```ts
import { NavLink } from "@echojs-ecosystem/router/hyperdom";

NavLink({
  to: homePage,
  activeClass: "is-active",
  class: "nav-link",
  children: "Home",
});

NavLink({
  to: userPage,
  params: { id: "42" },
  query: { tab: "profile" },
  children: "User",
});
```

## Imperative navigation

```ts
userPage.go({ id: "1" });
appRouter.go("/docs/packages/router/example");
```

## Live app

| Resource | Path |
| --- | --- |
| Docs routes | `apps/docs/src/entities/__routes__/` |
| Example routes | `apps/example/src/entities/__routes__/` |
| Lazy / slow demos | `apps/example/src/pages/workspace/` |

## See also

- Usage — `/docs/packages/router/usage`
- URL State Example — `/docs/packages/url-state/example`
