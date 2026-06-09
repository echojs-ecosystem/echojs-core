---
title: redirect
description: Route operator — redirect when `from` route opens.
package: '@echojs-ecosystem/router'
keywords: [redirect, router]
---

@echojs-ecosystem/router

## Usage

```ts
import { createRoute, redirect } from '@echojs-ecosystem/router'

const old = createRoute('old')
const next = createRoute('next')

// In createRoutes:
{ path: '/old', name: 'old', route: redirect({ from: old, to: next }) }
```

## Type Declarations

```ts
export type RedirectOptions<FromParams, FromQuery, ToParams, ToQuery> = {
  from: Route<FromParams, FromQuery>
  to: Route<ToParams, ToQuery>
  mapParams?: (params: FromParams) => ToParams
  mapQuery?: (query: FromQuery) => ToQuery
}

export const redirect: <...>(options: RedirectOptions<...>) => () => void
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `from` / `to` | `Route` | — | Source and destination routes |
| `mapParams` / `mapQuery` | functions | optional | Transform payload |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| unsubscribe | `() => void` | Route operator teardown |

### Related

- [guardRoute](/docs/packages/router/api/guard-route)
- [createRoute](/docs/packages/router/api/create-route)
