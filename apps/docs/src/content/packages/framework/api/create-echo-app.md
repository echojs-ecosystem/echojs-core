---
title: createEchoApp
description: createEchoApp, EchoApp methods, and EchoAppOptions.
package: '@echojs-ecosystem/framework'
keywords: [createEchoApp, framework]
---

@echojs-ecosystem/framework/app

## Usage

```ts
import { createEchoApp } from '@echojs-ecosystem/framework/app'

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({ strictContextChecks: true }).use(routerProvider).mount('#app')
```

## Type Declarations

```ts
function createEchoApp(input?: EchoAppOptions | EchoRootSource): EchoApp
function defineAppRoot(view: EchoRootSource): EchoRootSource
```

## API

### Returns

`createEchoApp` — see Type Declarations for the full signature.
