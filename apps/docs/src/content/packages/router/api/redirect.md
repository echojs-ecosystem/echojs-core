---
title: Route redirects
description: Path redirects via `createRouter({ redirects })` and `addRedirect`.
package: '@echojs-ecosystem/router'
keywords: [redirects, router, RedirectOptions]
---

@echojs-ecosystem/router

## Usage

```ts
import { createRoute, createRouter } from '@echojs-ecosystem/router'

const rootRoute = createRoute('root')

export const appRedirects = [
  { from: rootRoute, to: dashboardPage },
]

export const appRouter = createRouter({
  routes: [
    { path: '/', name: 'root', route: rootRoute },
    ...appRoutes,
  ],
  redirects: appRedirects,
})
```

With param/query mapping:

```ts
{
  from: oldUserPage,
  to: newUserPage,
  mapParams: ({ id }) => ({ userId: id }),
  mapQuery: (query) => ({ ...query, migrated: '1' }),
}
```

## Type Declarations

```ts
export type RedirectOptions<
  FromParams = Record<string, unknown>,
  FromQuery = Record<string, unknown>,
  ToParams = FromParams,
  ToQuery = FromQuery,
> = {
  from: Route<FromParams, FromQuery>
  to: Route<ToParams, ToQuery>
  mapParams?: (params: FromParams) => ToParams
  mapQuery?: (query: FromQuery) => ToQuery
}
```

## API

### `createRouter({ redirects })`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `redirects` | `RedirectOptions[]` | `[]` | Redirect rules |

### `router.addRedirect(options)`

| Returns | Description |
| --- | --- |
| `() => void` | Unregister the redirect |

### Related

- [Guards & Redirects](/docs/packages/router/guides/guards-and-redirects)
- [createRoute](/docs/packages/router/api/create-route)
