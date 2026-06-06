---
title: createEchoApp
description: Options, static roots, provider-driven SPAs, and teardown with createEchoApp.
package: "@echojs-ecosystem/framework"
---

# createEchoApp

`createEchoApp` builds the composition root — register providers, resolve the root view, and mount into the DOM.

## Options

```ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";
import { MyRootView } from "./root.js";

// Static root (no router provider)
createEchoApp({ view: MyRootView }).mount("#app");

// Provider-driven root (typical SPA)
createEchoApp({
  strictContextChecks: true,
  body: { class: "echojs-app", id: "root" },
  awaitProviders: true,
})
  .use(queryProvider)
  .use(routerProvider)
  .mount("#app");
```

| Option | Default | Meaning |
| --- | --- | --- |
| `view` | — | Root `Child` factory when no router `resolveRoot` |
| `strictContextChecks` | hyperdom default | Enforce `createView` / `createModel` usage |
| `body` | — | `class` / `id` on `document.body` at mount |
| `awaitProviders` | `true` | `await` async `setup()` before first paint |

## Static app without router

Marketing sites and embedded widgets can skip the router entirely:

```ts
createEchoApp({
  view: () => MarketingLayout(),
  strictContextChecks: true,
}).mount("#app");
```

When a router provider registers `resolveRoot()`, it overrides the static `view` option.

## Chainable API

```ts
const app = createEchoApp({ strictContextChecks: true })
  .use(queryProvider)
  .use(routerProvider);

await app.mount("#app");
```

`use()` is chainable. `provide()`, `inject()`, and `has()` are available on the returned `EchoApp` instance.

## Teardown

```ts
const dispose = await bootstrap();
// later
dispose();
```

## Related

- [Providers](/docs/packages/framework/guides/providers) — `.use()` pipeline
- [createEchoApp API](/docs/packages/framework/api/create-echo-app) — method signatures
