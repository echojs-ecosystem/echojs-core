---
title: Providers
description:
  Register router, query, UI, and i18n once with createEchoApp providers.
keywords: [providers, createEchoApp, bootstrap, plugins]
---

# Providers

Providers are EchoJS’s composition root: they run **once** at bootstrap and
supply services to the whole tree (router instance, query defaults, theme,
translations).

## Registration

```ts
import { createEchoApp } from '@echojs-ecosystem/framework/app'

export const bootstrap = () =>
  createEchoApp({ strictContextChecks: true })
    .use(queryProvider)
    .use(uiProvider)
    .use(themeProvider)
    .use(i18nProvider)
    .use(routerProvider)
    .mount('#app')
```

Order matters when a provider’s `setup()` expects another to be registered first
(e.g. query before routes that prefetch in `beforeLoad`).

## Provider shape

From `@echojs-ecosystem/framework`:

| Hook              | Purpose                                          |
| ----------------- | ------------------------------------------------ |
| `setup(app)`      | Side effects, `app.provide(key, value)`          |
| `resolveRoot()`   | Innermost root view (router outlet)              |
| `wrapRoot(inner)` | Optional outer wrappers (theme portal, devtools) |

Router uses `createRouterProvider(router)` from
`@echojs-ecosystem/router/hyperdom`, which:

1. `app.provide(ROUTER_KEY, router)`
2. `router.start()` on resolve
3. Returns `createView(() => router.View)` as the app root

The docs app uses a **custom** `routerProvider` to pin sidebar/header outside
remounting `router.View` — still a valid provider pattern.

## Built-in provider factories

| Provider               | Package                             | Role                       |
| ---------------------- | ----------------------------------- | -------------------------- |
| `createRouterProvider` | `@echojs-ecosystem/router/hyperdom` | SPA navigation, `NavLink`  |
| `createQueryProvider`  | `@echojs-ecosystem/query`           | Query client defaults      |
| UI / theme             | `@echojs-ecosystem/ui`              | Design system context      |
| i18n                   | `@echojs-ecosystem/i18n`            | Messages, locale switching |

### Query example (`apps/docs`)

```ts
import { createQueryProvider } from '@echojs-ecosystem/query'

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: { staleTime: 60_000 },
  },
})
```

Doc articles load markdown through `createQuery` in `createDocArticleModel` —
cache keyed by `contentId`.

## `provide` / `inject`

Custom providers can store arbitrary values on the app instance:

```ts
const MY_API = Symbol('my-api')

export const apiProvider = {
  name: 'api',
  setup(app) {
    app.provide(MY_API, createApiClient())
  },
}

// In a model (during createModel factory):
// const api = app.inject(MY_API) — pattern depends on your app context bridge
```

Prefer package-specific keys (like `ROUTER_KEY`) over string names to avoid
collisions.

## `strictContextChecks`

`createEchoApp({ strictContextChecks: true })` asks HyperDOM to throw when:

- `h()` / DSL runs outside an active view context
- Lifecycle hooks are misused

Enable in development; keep on for docs/example apps to catch regressions early.

## `awaitProviders`

Default `awaitProviders: true` waits for async `setup()` before first paint. Set
`false` only if you intentionally want a fast first frame and accept flicker.

## What not to put in providers

- Feature-specific state (counter, form draft) → **model**
- One-off page data → route `beforeLoad` or query in that page’s model
- Presentational markup → **view**

Providers are for **app-wide** infrastructure.

## Related

- First Application — wiring bootstrap
- Routing guide — `/docs/guides/routing`
- Framework package — `/docs/packages/framework`
