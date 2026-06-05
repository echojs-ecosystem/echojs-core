---
title: Installation
description: Install @echojs-ecosystem/framework and wire createEchoApp with providers.
package: "@echojs-ecosystem/framework"
---

# Installation

`@echojs-ecosystem/framework` is the app shell — it does not replace HyperDOM or the router; it composes them.

## Package managers

:::install @echojs-ecosystem/framework

Typical stack for a full SPA:

:::install @echojs-ecosystem/hyperdom

:::install @echojs-ecosystem/reactivity

:::install @echojs-ecosystem/router

:::install @echojs-ecosystem/query

## Import path

Apps import from the **`/app`** subpath:

```ts
import { createEchoApp, createProvider } from "@echojs-ecosystem/framework/app";
```

The root `@echojs-ecosystem/framework` barrel re-exports convenience modules (`hyperdom`, `router`, …) for bundler aliases — prefer `/app` in bootstrap code.

## Minimal bootstrap

```ts
// src/app/main.ts
import { bootstrap } from "./bootstrap.js";

void bootstrap();
```

```ts
// src/app/bootstrap.ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";
import { routerProvider } from "./providers/router.js";
import { queryProvider } from "./providers/query.js";

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({ strictContextChecks: true })
    .use(queryProvider)
    .use(routerProvider)
    .mount("#app");
```

`mount()` returns `Promise<() => void>` — the disposer tears down HyperDOM render and provider side effects.

## Monorepo

```json
{
  "dependencies": {
    "@echojs-ecosystem/framework": "workspace:*",
    "@echojs-ecosystem/hyperdom": "workspace:*",
    "@echojs-ecosystem/reactivity": "workspace:*"
  }
}
```

Reference implementations: `apps/docs`, `apps/example`.

## Vite

Ensure workspace aliases match other EchoJS apps (`vite.config.ts` → `@echojs-ecosystem/framework`, peers).
