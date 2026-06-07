---
title: Docs Dynamic Routes
description: Dynamic routes from nav config in apps/docs.
package: '@echojs-ecosystem/router'
---

# Docs Dynamic Routes

Map markdown `contentId` values to route paths from a single nav source.

## Route tree

```ts
import { createRoutes } from '@echojs-ecosystem/router'
import { canonicalDocsRouteItems } from '@core/content/nav.js'
import { getDocPage } from '@entities/__routes__/doc-pages.js'
import { docsShellLayoutPage } from '@pages/docs/layout/docs-shell-layout.page.js'

const docChildren = canonicalDocsRouteItems().map((item) => ({
  path: item.contentId,
  name: item.routeName,
  routeView: getDocPage(item.contentId),
}))

export const docsRoutes = createRoutes([
  {
    path: '/docs',
    name: 'docs',
    layoutView: docsShellLayoutPage,
    children: docChildren,
  },
])
```

## Router instance

```ts
// entities/__routes__/router.ts
import { createRouter } from '@echojs-ecosystem/router/hyperdom'

export const appRouter = createRouter({
  history: 'browser',
  routes: appRoutes,
  loadingView: routerLoadingPage,
  errorView: routerErrorPage,
  notFoundView: routerNotFoundPage,
})
```

## Related

- [Route Trees guide](/docs/packages/router/guides/route-trees)
