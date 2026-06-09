---
title: provide / inject
description: ROUTER_KEY, injectRouter, and isEchoRouter on EchoApp.
package: '@echojs-ecosystem/framework'
keywords: [provide / inject, framework]
---

@echojs-ecosystem/framework/app

## Usage

```ts
import { ROUTER_KEY, injectRouter } from '@echojs-ecosystem/framework/app'

export const routerProvider = {
  name: 'router',
  setup(app) {
    app.provide(ROUTER_KEY, appRouter)
    appRouter.start()
  },
}

const router = injectRouter(app)
```

## Type Declarations

```ts
import { ROUTER_KEY, injectRouter } from '@echojs-ecosystem/framework/app'

export const routerProvider = {
  name: 'router',
  setup(app) {
    app.provide(ROUTER_KEY, appRouter)
    appRouter.start()
  },
}

const router = injectRouter(app)
```

## API

### Returns

`provide / inject` — see Type Declarations for the full signature.
