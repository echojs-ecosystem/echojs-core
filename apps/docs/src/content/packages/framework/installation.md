---
title: Installation
description: Install @echojs/framework and wire createEchoApp with providers.
package: "@echojs/framework"
---

# Installation

`@echojs/framework` is the app shell — it does not replace HyperDOM or the router; it composes them.

## Package managers

:::install @echojs/framework

Typical stack for a full SPA:

:::install @echojs/hyperdom

:::install @echojs/reactivity

:::install @echojs/router

:::install @echojs/query

## Import path

Apps import from the **`/app`** subpath:

```ts
import { createEchoApp, createProvider } from "@echojs/framework/app";
```

The root `@echojs/framework` barrel re-exports convenience modules (`hyperdom`, `router`, …) for bundler aliases — prefer `/app` in bootstrap code.

## Minimal bootstrap

```ts
// src/app/main.ts
import { bootstrap } from "./bootstrap.js";

void bootstrap();
```

```ts
// src/app/bootstrap.ts
import { createEchoApp } from "@echojs/framework/app";
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
    "@echojs/framework": "workspace:*",
    "@echojs/hyperdom": "workspace:*",
    "@echojs/reactivity": "workspace:*"
  }
}
```

Reference implementations: `apps/docs`, `apps/example`.

## Vite

Ensure workspace aliases match other EchoJS apps (`vite.config.ts` → `@echojs/framework`, peers).
