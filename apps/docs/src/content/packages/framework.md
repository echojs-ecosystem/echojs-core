---
title: Framework
description: Application bootstrap, providers, and composition root for EchoJS apps.
package: "@echojs/framework"
keywords: [createEchoApp, createProvider, provide, inject]
---

:::package-overview framework

:::install @echojs/framework

## Quick start

```ts
import { createEchoApp } from "@echojs/framework";

createEchoApp({ root: () => AppRoot() })
  .use(routerPlugin)
  .use(queryPlugin)
  .mount("#app");
```

> [!tip]
> See `apps/docs` and `apps/example` for full provider wiring.
