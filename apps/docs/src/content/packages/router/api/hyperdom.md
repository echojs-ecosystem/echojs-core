---
title: HyperDOM Integration
description: createRouterProvider, Link, NavLink, and ROUTER_KEY.
package: '@echojs-ecosystem/router'
---

# HyperDOM Integration

Exports from `@echojs-ecosystem/router/hyperdom`.

| Export                                | Description                                          |
| ------------------------------------- | ---------------------------------------------------- |
| `createRouter(options)`               | `Router` + `View: () => Child` + `createQueryParams` |
| `createRouterProvider(router, opts?)` | Echo `EchoProvider` — `resolveRoot`, auto `start()`  |
| `Link(props)`                         | `<a>` with optional `to.go()`                        |
| `NavLink(props)`                      | `Link` + `activeClass` from `$isOpened`              |
| `ROUTER_KEY`                          | Symbol for `app.provide` / inject                    |

## Framework wiring

```ts
import { createRouterProvider } from '@echojs-ecosystem/router/hyperdom'
import { createEchoApp } from '@echojs-ecosystem/framework/app'

export const routerProvider = createRouterProvider(appRouter)

createEchoApp({ strictContextChecks: true }).use(routerProvider).mount('#app')
```

## Link / NavLink props

| Prop          | Type                             |
| ------------- | -------------------------------- |
| `to`          | Route object (typed params)      |
| `href`        | string (bypasses `to`)           |
| `params`      | Param record                     |
| `query`       | Query record                     |
| `replace`     | boolean                          |
| `children`    | HyperDOM `Child`                 |
| `activeClass` | NavLink only — class when active |
| `class`       | NavLink — base class             |

## Related

- [Navigation guide](/docs/packages/router/guides/navigation)
- [With Router example](/docs/packages/framework/examples/with-router)
