---
title: createProvider
description: createProvider factory, EchoProvider, and CreateProviderOptions.
package: '@echojs-ecosystem/framework'
keywords: [createProvider, framework]
---

@echojs-ecosystem/framework/app

## Usage

```ts
import { createProvider } from '@echojs-ecosystem/framework/app'

export const themeProvider = createProvider({
  name: 'theme',
  install: () => ({ mode: 'light' as const }),
  provideKey: THEME_KEY,
  wrapRoot: (inner) => () => div({ class: 'theme-root' }, inner()),
})
```

## Type Declarations

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

## API

### Returns

`createProvider` — see Type Declarations for the full signature.
