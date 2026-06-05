---
title: Example
description: createEchoApp bootstrap from apps/docs and apps/example.
package: "@echojs/framework"
---

# Example — Framework

## Docs site bootstrap (`apps/docs`)

```ts
// src/app/bootstrap.ts
import { createEchoApp } from "@echojs/framework/app";
import {
  i18nProvider,
  queryProvider,
  routerProvider,
  themeProvider,
  uiProvider,
} from "@app/providers/index.js";

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({
    strictContextChecks: true,
  })
    .use(queryProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(themeProvider)
    .use(routerProvider)
    .mount("#app");
```

```ts
// src/app/main.ts
import { bootstrap } from "./bootstrap.js";

void bootstrap();
```

## Example lab bootstrap (`apps/example`)

```ts
import { createEchoApp } from "@echojs/framework/app";
import { i18nProvider, queryProvider, routerProvider, uiProvider } from "./providers/index.js";

export const bootstrap = () =>
  createEchoApp({
    strictContextChecks: true,
    body: { class: "echojs-lab" },
  })
    .use(queryProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(routerProvider)
    .mount("#app");
```

## Custom provider (`createProvider`)

```ts
import { createProvider } from "@echojs/framework/app";

const THEME_KEY = Symbol("theme");

export const themeProvider = createProvider({
  name: "theme",
  install: () => ({ mode: "light" as const }),
  provideKey: THEME_KEY,
  wrapRoot: (inner) => () => div({ class: "theme-root" }, inner()),
});
```

## Docs router provider (chrome + SPA)

`apps/docs` не использует stock `createRouterProvider` — sidebar остаётся смонтированным:

```ts
import { ROUTER_KEY } from "@echojs/framework/app";
import { appRouter } from "@entities/__routes__/router.js";
import { DocsChrome } from "@widgets/docs-shell/docs-chrome.js";

export const routerProvider = {
  name: "router",
  setup(app) {
    app.provide(ROUTER_KEY, appRouter);
    appRouter.start();
  },
  resolveRoot: () => () => DocsChrome(() => appRouter.View()),
};
```

## Teardown

```ts
const dispose = await bootstrap();
dispose();
```

## Live app

| App | `bootstrap.ts` |
| --- | --- |
| Documentation | `apps/docs/src/app/bootstrap.ts` |
| Interactive lab | `apps/example/src/app/bootstrap.ts` |

## See also

- Architecture → Providers
- Router Example — `/docs/packages/router/example`
