---
title: With Query
description: Full docs site bootstrap with query, UI, i18n, theme, and router providers.
package: "@echojs-ecosystem/framework"
---

# With Query

Production docs site bootstrap — query runs before router so route models can use the query client on first navigation.

## bootstrap.ts

```ts
// src/app/bootstrap.ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";
import {
  i18nProvider,
  queryProvider,
  routerProvider,
  themeProvider,
  uiProvider,
} from "@core/providers/index.js";

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

## main.ts

```ts
// src/app/main.ts
import { bootstrap } from "./bootstrap.js";

void bootstrap();
```

## Provider order

| Order | Provider | Why |
| --- | --- | --- |
| 1 | `queryProvider` | Global query defaults before routes load data |
| 2 | `uiProvider` | Design tokens for chrome |
| 3 | `i18nProvider` | Locale before first paint |
| 4 | `themeProvider` | Theme controller |
| 5 | `routerProvider` | `start()` + root view last |

## Related

- [Providers guide](/docs/packages/framework/guides/providers)
- [Query Examples](/docs/packages/query/example)
