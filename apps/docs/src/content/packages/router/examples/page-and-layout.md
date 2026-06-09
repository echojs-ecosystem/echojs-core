---
title: Page + Layout
description: createRouteView and createLayoutView with beforeLoad.
package: '@echojs-ecosystem/router'
---

# Page + Layout

Shell layout renders `outlet()`; leaf page loads data with `beforeLoad`.

```ts
import { createRouteView, createLayoutView } from '@echojs-ecosystem/router'

const shell = createLayoutView({
  name: 'docs-shell',
  view: ({ outlet }) => DocsShell(outlet()),
})

const docPage = createRouteView({
  name: 'doc-article',
  view: ({ params }) => DocArticle({ contentId: params.contentId }),
  beforeLoad: async ({ params }) => loadDoc(params.contentId),
})
```

In the tree:

```ts
{
  path: "/docs",
  name: "docs",
  layoutView: shell,
  children: [
    { path: ":contentId", name: "doc-article", routeView: docPage },
  ],
}
```

## Related

- [beforeLoad guide](/docs/packages/router/guides/before-load)
- [createRouteView](/docs/packages/router/api/create-route-view)
