---
title: guardRoute
description: Prevent or redirect navigation when `canOpen` returns false.
package: '@echojs-ecosystem/router'
keywords: [guardRoute, router, guard]
---

@echojs-ecosystem/router

## Usage

```ts
import { guardRoute } from '@echojs-ecosystem/router'

guardRoute({
  route: adminPage,
  canOpen: () => isAdmin(),
  otherwise: () => loginPage.go(),
})
```

## Type Declarations

```ts
export type GuardRouteOptions = {
  route: Route
  canOpen: () => boolean | Promise<boolean>
  otherwise?: () => void
}

export const guardRoute: (options: GuardRouteOptions) => () => void
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `route` | `Route` | — | Protected route |
| `canOpen` | `() => boolean` | — | Allow navigation |
| `otherwise` | `() => void` | optional | Fallback when blocked |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| unsubscribe | `() => void` | Remove guard |

### Related

- [redirect](/docs/packages/router/api/redirect)
- [chainRoute](/docs/packages/router/api/chain-route)
