---
title: Providers
description:
  Provider pipeline, createProvider factory, and package provider conventions.
package: '@echojs-ecosystem/framework'
---

# Providers

Providers register services, wrap the root view, and optionally supply the SPA
shell via `resolveRoot()`.

## Mount pipeline

Each `.use(provider)` runs `setup(app)` immediately (registration order). At
`mount()`:

1. Await pending setups (if `awaitProviders`)
2. Apply `body` attributes
3. Resolve root: `view` option **or** last provider with `resolveRoot()`
   (router)
4. Fold `wrapRoot` from providers outer → inner
5. `render()` into mount target

## Package providers (convention)

```ts
// core/providers/index.ts
export { queryProvider } from './query.js'
export { routerProvider } from './router.js'
export { uiProvider } from './ui.js'
export { i18nProvider } from './i18n.js'
export { themeProvider } from './theme.js'
```

| Provider               | Package                             | Notes                                  |
| ---------------------- | ----------------------------------- | -------------------------------------- |
| `createQueryProvider`  | `@echojs-ecosystem/query`           | Global query defaults                  |
| `createRouterProvider` | `@echojs-ecosystem/router/hyperdom` | `router.start()`, root = `router.View` |
| UI / theme             | `@echojs-ecosystem/ui`              | Design tokens                          |
| i18n                   | `@echojs-ecosystem/i18n`            | Locale + messages                      |

**Order:** query and i18n before router if routes or models depend on them
during first navigation.

See Architecture → Providers.

## `createProvider` factory

Typed install + setup (Vue-style):

```ts
import { createProvider } from '@echojs-ecosystem/framework/app'

export const themeProvider = createProvider({
  name: 'theme',
  install: () => createThemeController(),
  provideKey: THEME_KEY,
  setup: async (_app, theme) => {
    await theme.init()
  },
  wrapRoot: (inner) => () => ThemeShell(inner()),
})
```

| Field                  | Role                                                      |
| ---------------------- | --------------------------------------------------------- |
| `install()`            | Runs at module load; result stored on `provider.instance` |
| `setup(app, instance)` | Runs on `.use()`                                          |
| `provideKey`           | Auto `app.provide(key, instance)`                         |
| `wrapRoot`             | Wrap resolved root                                        |

Legacy aliases: `defineProvider`, `definePlugin`, `createPlugin`.

## Custom router provider (docs app)

`apps/docs` pins docs chrome outside `router.View` so sidebar does not remount
on navigation:

```ts
export const routerProvider = {
  name: 'router',
  setup(app) {
    app.provide(ROUTER_KEY, appRouter)
    appRouter.start()
  },
  resolveRoot: () =>
    createView(() => DocsChrome(() => appRouter.View()), 'DocsRoot'),
}
```

Still valid — `createRouterProvider` is the default when you want the stock
shell.

## Related

- [Dependency Injection](/docs/packages/framework/guides/dependency-injection) —
  `provide` / `inject`
- [With Router example](/docs/packages/framework/examples/with-router) — docs
  chrome pattern
