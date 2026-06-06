---
title: With Router
description: Custom router provider with docs chrome outside router.View.
package: "@echojs-ecosystem/framework"
---

# With Router

`apps/docs` does not use stock `createRouterProvider` — sidebar stays mounted while route content swaps inside `router.View`.

## Custom router provider

```ts
import { ROUTER_KEY } from "@echojs-ecosystem/framework/app";
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

## Bootstrap

```ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";
import { queryProvider, routerProvider } from "@core/providers/index.js";

export const bootstrap = (): Promise<() => void> =>
  createEchoApp({ strictContextChecks: true })
    .use(queryProvider)
    .use(routerProvider)
    .mount("#app");
```

## Related

- [Providers guide](/docs/packages/framework/guides/providers)
- [Router Examples](/docs/packages/router/example)
