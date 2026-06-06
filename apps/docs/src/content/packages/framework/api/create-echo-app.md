---
title: createEchoApp
description: createEchoApp, EchoApp methods, and EchoAppOptions.
package: "@echojs-ecosystem/framework"
---

# createEchoApp

```ts
function createEchoApp(input?: EchoAppOptions | EchoRootSource): EchoApp
function defineAppRoot(view: EchoRootSource): EchoRootSource
```

Build the app composition root. Overloads accept no input, a root view factory, or full options.

## EchoApp

| Method | Description |
| --- | --- |
| `use(provider)` | Register provider; chainable |
| `provide(key, value)` | Store value on app |
| `inject(key)` | Read provided value |
| `has(key)` | Whether key was provided |
| `mount(target)` | `string` selector or `Element`; returns `Promise<() => void>` |

## EchoAppOptions

| Field | Type |
| --- | --- |
| `view` | `() => Child` |
| `strictContextChecks` | `boolean` |
| `body` | `{ class?: string; id?: string }` |
| `awaitProviders` | `boolean` (default `true`) |

## Example

```ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({ strictContextChecks: true })
    .use(routerProvider)
    .mount("#app");
```

## Related

- [createEchoApp guide](/docs/packages/framework/guides/create-echo-app)
- [Providers](/docs/packages/framework/guides/providers)
