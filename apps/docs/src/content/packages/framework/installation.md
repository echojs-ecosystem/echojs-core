---
title: Installation
description:
  Install @echojs-ecosystem/framework and wire createEchoApp with providers.
package: '@echojs-ecosystem/framework'
---

# Installation

`@echojs-ecosystem/framework` is the **recommended entry point** for EchoJS apps
— one dependency, tree-shakeable subpaths for every ecosystem module, and
`createEchoApp` as the composition root.

It does not replace HyperDOM or the router; it wires them together.

## Import paths

| Path                                   | When to use                                                                               |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| `@echojs-ecosystem/framework/app`      | Bootstrap code — `createEchoApp`, `createProvider`, `provide` / `inject`                  |
| `@echojs-ecosystem/framework/<module>` | Feature imports — same API as `@echojs-ecosystem/<module>` (reactivity, router, query, …) |
| `@echojs-ecosystem/framework`          | Convenience root barrel — prefer `/app` in bootstrap, subpaths in features                |

```ts
import { createEchoApp, createProvider } from '@echojs-ecosystem/framework/app'
```

> [!tip] Prefer **`/app`** in bootstrap files. Import feature packages directly
> in features when bundle size matters.

There is **no** `@echojs-ecosystem/framework/framework` subpath — the meta
package root is the barrel.

## Quick install

:::install @echojs-ecosystem/framework

Typical stack for a full SPA:

:::install @echojs-ecosystem/hyperdom

:::install @echojs-ecosystem/reactivity

:::install @echojs-ecosystem/router

:::install @echojs-ecosystem/async

## Minimal bootstrap

```ts
// src/app/main.ts
import { bootstrap } from './bootstrap.js'

void bootstrap()
```

```ts
// src/app/bootstrap.ts
import { createEchoApp } from '@echojs-ecosystem/framework/app'
import { routerProvider } from './providers/router.js'
import { queryProvider } from './providers/query.js'

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({ strictContextChecks: true })
    .use(queryProvider)
    .use(routerProvider)
    .mount('#app')
```

`mount()` returns `Promise<() => void>` — the disposer tears down HyperDOM
render and provider side effects.

Reference implementations: `apps/docs`, `apps/example`.

## Next steps

- [Important Defaults](/docs/packages/framework/guides/important-defaults) —
  mount pipeline and defaults
- [createEchoApp](/docs/packages/framework/guides/create-echo-app) — options and
  teardown
- [Examples](/docs/packages/framework/example) — full provider wiring
