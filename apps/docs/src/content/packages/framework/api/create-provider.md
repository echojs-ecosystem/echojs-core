---
title: createProvider
description: createProvider factory, EchoProvider, and CreateProviderOptions.
package: '@echojs-ecosystem/framework'
---

# createProvider

```ts
function createProvider<TInstance>(
  options: CreateProviderOptions<TInstance>
): EchoProviderWithInstance<TInstance>
function defineProvider(options: EchoProvider): EchoProvider
function definePlugin(options: EchoPlugin): EchoPlugin
function createPlugin<TInstance>(
  options: CreatePluginOptions<TInstance>
): EchoPluginWithInstance<TInstance>
```

Typed provider factory with optional `install`, `setup`, `provideKey`, and
`wrapRoot`.

## EchoProvider

| Field              | Description                              |
| ------------------ | ---------------------------------------- |
| `name`             | Provider id (logging)                    |
| `setup(app)`       | Sync or async registration               |
| `resolveRoot?`     | Return root `Child` (router)             |
| `wrapRoot?(inner)` | `(previous: () => Child) => () => Child` |

## CreateProviderOptions

| Field         | Description                                |
| ------------- | ------------------------------------------ |
| `name`        | Required                                   |
| `install?`    | `() => TInstance` at factory time          |
| `setup?`      | `(app, instance) => void \| Promise<void>` |
| `provideKey?` | Auto-provide instance                      |
| `wrapRoot?`   | Root wrapper                               |

Returns `EchoProviderWithInstance<TInstance>` with `.instance`.

## Example

```ts
import { createProvider } from '@echojs-ecosystem/framework/app'

export const themeProvider = createProvider({
  name: 'theme',
  install: () => ({ mode: 'light' as const }),
  provideKey: THEME_KEY,
  wrapRoot: (inner) => () => div({ class: 'theme-root' }, inner()),
})
```

## Related

- [Providers guide](/docs/packages/framework/guides/providers)
