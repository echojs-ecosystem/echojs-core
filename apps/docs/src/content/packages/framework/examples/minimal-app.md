---
title: Minimal App
description: Example lab bootstrap with query and router providers.
package: '@echojs-ecosystem/framework'
---

# Minimal App

Basic SPA bootstrap from `apps/example` — query and router providers, optional
body attributes.

## bootstrap.ts

```ts
import { createEchoApp } from '@echojs-ecosystem/framework/app'
import {
  i18nProvider,
  queryProvider,
  routerProvider,
  uiProvider,
} from './providers/index.js'

export const bootstrap = () =>
  createEchoApp({
    strictContextChecks: true,
    body: { class: 'echojs-lab' },
  })
    .use(queryProvider)
    .use(uiProvider)
    .use(i18nProvider)
    .use(routerProvider)
    .mount('#app')
```

## main.ts

```ts
import { bootstrap } from './bootstrap.js'

void bootstrap()
```

## Related

- [createEchoApp guide](/docs/packages/framework/guides/create-echo-app)
- [With Query](/docs/packages/framework/examples/with-query) — docs site variant
