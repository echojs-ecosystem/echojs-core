---
title: createRouterProvider
description: Wire the router into `createEchoApp().use(...)`.
package: '@echojs-ecosystem/router'
keywords: [createRouterProvider, router, provider]
---

@echojs-ecosystem/router

## Usage

```ts
import { createEchoApp } from '@echojs-ecosystem/framework/app'
import { createRouterProvider } from '@echojs-ecosystem/router'

export const routerProvider = createRouterProvider(appRouter)

createEchoApp().use(routerProvider).mount('#app')
```

## Type Declarations

```ts
export const ROUTER_KEY: unique symbol

export type RouterProvider = {
  name: 'router'
  setup: (app: RouterProviderHost) => void
  resolveRoot: () => Child
}

export const createRouterProvider: (
  router: RouterLike,
  options?: { autoStart?: boolean },
) => RouterProvider
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `router` | `RouterLike` | — | Router with `View`, `start`, `stop` |
| `options.autoStart` | `boolean` | `true` | Call `router.start()` on mount |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| provider | `RouterProvider` | Echo plugin with `resolveRoot` |

### Related

- [createRouter](/docs/packages/router/api/create-router)
- [Link](/docs/packages/router/api/link)
