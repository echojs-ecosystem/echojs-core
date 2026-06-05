---
title: Usage
description: createEchoApp lifecycle, providers, provide/inject, and router integration.
package: "@echojs-ecosystem/framework"
---

# Usage

## `createEchoApp` options

```ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";
import { MyRootView } from "./root.js";

// Static root (no router provider)
createEchoApp({ view: MyRootView }).mount("#app");

// Provider-driven root (typical SPA)
createEchoApp({
  strictContextChecks: true,
  body: { class: "echojs-app", id: "root" },
  awaitProviders: true,
})
  .use(queryProvider)
  .use(routerProvider)
  .mount("#app");
```

| Option | Default | Meaning |
| --- | --- | --- |
| `view` | — | Root `Child` factory when no router `resolveRoot` |
| `strictContextChecks` | hyperdom default | Enforce `createView` / `createModel` usage |
| `body` | — | `class` / `id` on `document.body` at mount |
| `awaitProviders` | `true` | `await` async `setup()` before first paint |

## Provider pipeline

Each `.use(provider)` runs `setup(app)` immediately (registration order). At `mount()`:

1. Await pending setups (if `awaitProviders`)
2. Apply `body` attributes
3. Resolve root: `view` option **or** last provider with `resolveRoot()` (router)
4. Fold `wrapRoot` from providers outer → inner
5. `render()` into mount target

### Package providers (convention)

```ts
// core/providers/index.ts
export { queryProvider } from "./query.js";
export { routerProvider } from "./router.js";
export { uiProvider } from "./ui.js";
export { i18nProvider } from "./i18n.js";
export { themeProvider } from "./theme.js";
```

| Provider | Package | Notes |
| --- | --- | --- |
| `createQueryProvider` | `@echojs-ecosystem/query` | Global query defaults |
| `createRouterProvider` | `@echojs-ecosystem/router/hyperdom` | `router.start()`, root = `router.View` |
| UI / theme | `@echojs-ecosystem/ui` | Design tokens |
| i18n | `@echojs-ecosystem/i18n` | Locale + messages |

**Order:** query and i18n before router if routes or models depend on them during first navigation.

See Architecture → Providers.

## `createProvider` factory

Typed install + setup (Vue-style):

```ts
import { createProvider } from "@echojs-ecosystem/framework/app";

export const themeProvider = createProvider({
  name: "theme",
  install: () => createThemeController(),
  provideKey: THEME_KEY,
  setup: async (_app, theme) => {
    await theme.init();
  },
  wrapRoot: (inner) => () => ThemeShell(inner()),
});
```

| Field | Role |
| --- | --- |
| `install()` | Runs at module load; result stored on `provider.instance` |
| `setup(app, instance)` | Runs on `.use()` |
| `provideKey` | Auto `app.provide(key, instance)` |
| `wrapRoot` | Wrap resolved root |

Legacy aliases: `defineProvider`, `definePlugin`, `createPlugin`.

## `provide` / `inject`

```ts
const API_KEY = Symbol("api");

export const apiProvider = {
  name: "api",
  setup(app) {
    app.provide(API_KEY, createApiClient());
  },
};

// elsewhere
const client = app.inject(API_KEY);
```

Router uses `ROUTER_KEY` from `@echojs-ecosystem/framework/app` — or `injectRouter(app)` helper.

## Custom router provider (docs app)

`apps/docs` pins docs chrome outside `router.View` so sidebar does not remount on navigation:

```ts
export const routerProvider = {
  name: "router",
  setup(app) {
    app.provide(ROUTER_KEY, appRouter);
    appRouter.start();
  },
  resolveRoot: () => createView(() => DocsChrome(() => appRouter.View()), "DocsRoot"),
};
```

Still valid — `createRouterProvider` is the default when you want the stock shell.

## Static app without router

```ts
createEchoApp({
  view: () => MarketingLayout(),
  strictContextChecks: true,
}).mount("#app");
```

## Teardown

```ts
const dispose = await bootstrap();
// later
dispose();
```

## Related

- Getting started → First application
- Architecture → Providers
- Router package — `/docs/packages/router`
