---
title: chainRoute
description: Run `beforeOpen` when a route opens; exposes result signals.
package: '@echojs-ecosystem/router'
keywords: [chainRoute, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { chainRoute } from '@echojs-ecosystem/router'

const gated = chainRoute({
  route: checkoutPage,
  beforeOpen: async ({ params }) => validateCart(params.id),
})
```

## Type Declarations

```ts
export type ChainRouteOptions<Params, Query, Result> = {
  route: Route<Params, Query>
  beforeOpen: (ctx: { params: Params; query: Query }) => Result | Promise<Result>
}

export const chainRoute: <Params, Query, Result>(
  options: ChainRouteOptions<Params, Query, Result>,
) => ChainedRoute<Params, Query, Result>
```

## API

### Returns

`chainRoute` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `$result` | signal | `beforeOpen` return value |
| `$pending` / `$error` | signals | Async state |

### Related

- [guardRoute](/docs/packages/router/api/guard-route)
- [createRouteView](/docs/packages/router/api/create-route-view)
