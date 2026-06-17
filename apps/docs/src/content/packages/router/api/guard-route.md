---
title: Route guards
description: Protect routes via `createRouter({ guards })` and `addGuard`.
package: '@echojs-ecosystem/router'
keywords: [guards, router, GuardRouteOptions]
---

@echojs-ecosystem/router

## Usage

```ts
import type { GuardRouteOptions } from '@echojs-ecosystem/router'
import { createRouter } from '@echojs-ecosystem/router'

export const appGuards: GuardRouteOptions[] = [
  {
    route: settingsPage,
    canOpen: () => $isLoggedIn.value(),
    otherwise: authLoginPage,
  },
]

export const appRouter = createRouter({
  routes: appRoutes,
  guards: appGuards,
})
```

## Type Declarations

```ts
export type GuardRouteOptions = {
  route: Route<any, any>
  canOpen: () => boolean
  otherwise: Route<any, any>
}
```

## API

### `createRouter({ guards })`

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `guards` | `GuardRouteOptions[]` | `[]` | Routes to protect |

### `router.addGuard(options)`

| Returns | Description |
| --- | --- |
| `() => void` | Unregister the guard |

### Related

- [Guards & Redirects](/docs/packages/router/guides/guards-and-redirects)
- [chainRoute](/docs/packages/router/api/chain-route)
