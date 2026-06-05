---
title: API Reference
description: Public exports from @echojs/framework/app.
package: "@echojs/framework"
---

# API Reference

## `@echojs/framework/app`

| Export | Description |
| --- | --- |
| `createEchoApp(input?)` | Build app; overloads: none, `EchoRootSource`, `EchoAppOptions` |
| `defineAppRoot(view)` | Normalize root view factory |
| `createProvider(options)` | Provider factory with `install` / `setup` / `wrapRoot` |
| `defineProvider` / `definePlugin` | Lower-level provider object |
| `createPlugin` | Plugin-shaped provider |
| `ROUTER_KEY` | Symbol for router DI |
| `injectRouter(app)` | Get router from app context |
| `isEchoRouter(value)` | Type guard for router instances |

## `EchoApp`

| Method | Description |
| --- | --- |
| `use(provider)` | Register provider; chainable |
| `provide(key, value)` | Store value on app |
| `inject(key)` | Read provided value |
| `has(key)` | Whether key was provided |
| `mount(target)` | `string` selector or `Element`; returns `Promise<() => void>` |

## `EchoAppOptions`

| Field | Type |
| --- | --- |
| `view` | `() => Child` |
| `strictContextChecks` | `boolean` |
| `body` | `{ class?: string; id?: string }` |
| `awaitProviders` | `boolean` (default `true`) |

## `EchoProvider`

| Field | Description |
| --- | --- |
| `name` | Provider id (logging) |
| `setup(app)` | Sync or async registration |
| `resolveRoot?` | Return root `Child` (router) |
| `wrapRoot?(inner)` | `(previous: () => Child) => () => Child` |

## `CreateProviderOptions`

| Field | Description |
| --- | --- |
| `name` | Required |
| `install?` | `() => TInstance` at factory time |
| `setup?` | `(app, instance) => void \| Promise<void>` |
| `provideKey?` | Auto-provide instance |
| `wrapRoot?` | Root wrapper |

Returns `EchoProviderWithInstance<TInstance>` with `.instance`.

## Types

`EchoApp`, `EchoAppOptions`, `EchoBodyAttributes`, `EchoProvider`, `EchoProvideKey`, `EchoRootSource`, `EchoRouterSource`, `EchoUseInput`, `EchoPlugin`, `CreateProviderOptions`, `EchoProviderWithInstance`, `CreatePluginOptions`, `EchoPluginWithInstance`

## Root barrel `@echojs/framework`

Re-exports sub-packages for convenience (size-sensitive apps may import narrowly):

| Module | Re-exports |
| --- | --- |
| `hyperdom` | HyperDOM surface |
| `reactivity` | Signals |
| `router` / `router-hyperdom` | Router |
| `query`, `store`, `persist`, `url-state`, `ui`, `form` | Ecosystem packages |

Prefer **`@echojs/framework/app`** in bootstrap; import feature packages directly in features.

## Related

- Usage — `/docs/packages/framework/usage`
- Overview — `/docs/packages/framework`
