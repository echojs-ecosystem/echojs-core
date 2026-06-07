---
title: Dependency Injection
description: provide, inject, ROUTER_KEY, and injectRouter on EchoApp.
package: '@echojs-ecosystem/framework'
---

# Dependency Injection

`EchoApp` exposes a minimal DI surface — store values at bootstrap, read them in
features.

## Manual provide / inject

```ts
const API_KEY = Symbol('api')

export const apiProvider = {
  name: 'api',
  setup(app) {
    app.provide(API_KEY, createApiClient())
  },
}

// elsewhere
const client = app.inject(API_KEY)
```

| Method                    | Description                |
| ------------------------- | -------------------------- |
| `app.provide(key, value)` | Store value on app context |
| `app.inject(key)`         | Read provided value        |
| `app.has(key)`            | Whether key was provided   |

## Auto-provide via `createProvider`

When `provideKey` is set on `createProvider`, the instance from `install()` is
automatically provided:

```ts
export const themeProvider = createProvider({
  name: 'theme',
  install: () => createThemeController(),
  provideKey: THEME_KEY,
})
```

## Router injection

Router uses `ROUTER_KEY` from `@echojs-ecosystem/framework/app` — or the
`injectRouter(app)` helper:

```ts
import { ROUTER_KEY, injectRouter } from '@echojs-ecosystem/framework/app'

// in a provider setup
app.provide(ROUTER_KEY, appRouter)

// in feature code
const router = injectRouter(app)
```

`isEchoRouter(value)` is a type guard for router instances.

## Related

- [Providers](/docs/packages/framework/guides/providers) — registration pipeline
- [provide / inject API](/docs/packages/framework/api/provide-inject) — exports
