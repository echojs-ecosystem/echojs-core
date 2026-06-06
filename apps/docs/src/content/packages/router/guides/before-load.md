---
title: beforeLoad & Route Data
description: Async route data loading, page.$data, and layout beforeLoad ordering.
package: "@echojs-ecosystem/router"
---

# beforeLoad & Route Data

Load async data before a page renders. Results are stored on `page.$data` and passed to the view context.

## Page beforeLoad

```ts
const docPage = createRouteView({
  name: "doc",
  view: ({ data }) => DocView(data),
  beforeLoad: async ({ params }) => {
    return loadMarkdown(params.contentId);
  },
});
```

- Runs when route opens (and when params/query change per navigation)
- Result stored on `page.$data`
- `loader` is a deprecated alias for `beforeLoad`

## Layout beforeLoad

Layout `beforeLoad` runs **before** child pages; failing layout skips children.

```ts
const userPage = createRouteView({
  name: "user",
  view: ({ params, data }) => UserView(params, data),
  beforeLoad: async ({ params, query, navigationId }) => {
    return fetchUser(params.id);
  },
  loadingView: () => RouterLoading(),
  errorView: ({ error }) => RouterError(error),
});
```

## Pending and error state

Access via router signals: `router.$pending`, `router.$error`, or page `$pending` / `$error` in views.

Global loading/error UI falls back from page → layout → router — see [Router Lifecycle](/docs/packages/router/guides/router-lifecycle).

## Related

- [Route Trees](/docs/packages/router/guides/route-trees)
- [Page + Layout example](/docs/packages/router/examples/page-and-layout)
