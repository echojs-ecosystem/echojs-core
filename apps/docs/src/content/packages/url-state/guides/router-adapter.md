---
title: Router Adapter
description:
  Router-bound params, attachRouterQueryParams, and avoiding circular imports.
package: '@echojs-ecosystem/url-state'
---

# Router Adapter

In EchoJS SPAs, URL state typically flows through the router adapter — keeping
query params in sync with navigation without manual `history.pushState` calls.

## Router-bound group

```ts
import { createRouter } from '@echojs-ecosystem/router/hyperdom'
import { parseAsInteger, parseAsString } from '@echojs-ecosystem/url-state'

export const appRouter = createRouter({ routes: appRoutes })

export const filters = appRouter.createQueryParams({
  q: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
})
```

`createRouter` from `@echojs-ecosystem/router/hyperdom` automatically calls
`attachRouterQueryParams`.

## Page module without appRouter import

Avoid circular imports by using standalone `createQueryParams` — it picks up the
registered router:

```ts
import {
  createQueryParams,
  parseAsInteger,
  parseAsString,
} from '@echojs-ecosystem/url-state'

export const filters = createQueryParams({
  q: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
})
```

`getUrlStateRouter()` returns the registered router when needed explicitly.

## Manual adapter

```ts
import { createRouterUrlStateAdapter } from '@echojs-ecosystem/url-state'

createQueryParams(schema, {
  adapter: createRouterUrlStateAdapter(router),
})
```

## Browser adapter (no router)

For static pages or tools outside the router:

```ts
import {
  createBrowserUrlStateAdapter,
  createQueryParam,
  parseAsString,
} from '@echojs-ecosystem/url-state'

const q = createQueryParam('q', parseAsString.withDefault(''), {
  adapter: createBrowserUrlStateAdapter(),
})
```

## Shallow updates

`shallow: true` (when supported by the router) updates query params without
re-running full route loaders — ideal for filter changes on the same page.

## Related

- [Installation](/docs/packages/url-state/installation)
- [API: Adapters](/docs/packages/url-state/api/adapters)
- [Router package](/docs/packages/router)
