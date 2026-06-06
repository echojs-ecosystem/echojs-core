---
title: provide / inject
description: ROUTER_KEY, injectRouter, and isEchoRouter on EchoApp.
package: "@echojs-ecosystem/framework"
---

# provide / inject

DI helpers on `EchoApp` and router-specific exports.

## EchoApp methods

| Method | Description |
| --- | --- |
| `provide(key, value)` | Store value on app context |
| `inject(key)` | Read provided value |
| `has(key)` | Whether key was provided |

## Router exports

| Export | Description |
| --- | --- |
| `ROUTER_KEY` | Symbol for router DI |
| `injectRouter(app)` | Get router from app context |
| `isEchoRouter(value)` | Type guard for router instances |

## Example

```ts
import { ROUTER_KEY, injectRouter } from "@echojs-ecosystem/framework/app";

export const routerProvider = {
  name: "router",
  setup(app) {
    app.provide(ROUTER_KEY, appRouter);
    appRouter.start();
  },
};

const router = injectRouter(app);
```

## Related

- [Dependency Injection guide](/docs/packages/framework/guides/dependency-injection)
