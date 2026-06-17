---
title: Guards & Redirects
description:
  Route guards, path redirects, chainRoute, and createRoute without a view.
package: '@echojs-ecosystem/router'
---

# Guards & Redirects

Protect routes, redirect legacy paths, and chain hooks before a route opens.

## Guards (`createRouter.guards`)

Declare guards when creating the router:

```ts
import type { GuardRouteOptions } from '@echojs-ecosystem/router'
import { createRouter } from '@echojs-ecosystem/router'

export const appGuards: GuardRouteOptions[] = [
  {
    route: adminLayoutPage,
    canOpen: () => $isLoggedIn.value(),
    otherwise: authLoginPage,
  },
  {
    route: settingsPage,
    canOpen: () => $isLoggedIn.value() && canReadSettings(),
    otherwise: authLoginPage,
  },
]

export const appRouter = createRouter({
  routes: appRoutes,
  guards: appGuards,
})
```

| Field | Role |
| --- | --- |
| `route` | Route to protect (matched anywhere in the chain) |
| `canOpen()` | Return `true` to allow navigation |
| `otherwise` | Route to open with `replace` when blocked |

Add guards at runtime:

```ts
const unregister = appRouter.addGuard({
  route: billingPage,
  canOpen: () => hasBillingAccess(),
  otherwise: dashboardPage,
})

unregister()
```

Keep guard definitions in a dedicated module (for example `app/router/guards.ts`) and pass the array into `createRouter`.

## Redirects (`createRouter.redirects`)

Declare redirects when creating the router:

```ts
import { createRoute } from '@echojs-ecosystem/router'

const rootRoute = createRoute('root')

export const rootRedirectRoutes = [
  { path: '/', name: 'root', route: rootRoute },
] as const

export const appRedirects = [
  { from: rootRoute, to: dashboardPage },
] as const

export const appRouter = createRouter({
  routes: [...rootRedirectRoutes, ...appRoutes],
  redirects: appRedirects,
})
```

| Field | Role |
| --- | --- |
| `from` | Source route — redirect runs on `from.opened` |
| `to` | Destination route |
| `mapParams` / `mapQuery` | Optional payload transforms |

Add redirects at runtime:

```ts
const unregister = appRouter.addRedirect({ from: oldPage, to: newPage })
unregister()
```

## chainRoute

Hook logic before a route opens (separate from guards):

| Operator | Purpose |
| --- | --- |
| `chainRoute({ route, beforeOpen })` | Hook before route opens |

## createRoute (no UI)

For redirects and guards without a view:

```ts
import { createRoute } from '@echojs-ecosystem/router'

const placeholder = createRoute('root')
placeholder.go({ id: '1' })
placeholder.close()
```

## Limitations (v0)

- No file-based routing generator
- No async guard cancellation
- Simple 404 via `notFoundView`

## Related

- [createRouter](/docs/packages/router/api/create-router)
- [Router Lifecycle](/docs/packages/router/guides/router-lifecycle)
