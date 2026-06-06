---
title: Feature Slice Check
description: Typical architect violations and fixes.
package: "@echojs-ecosystem/architect"
---

# Feature Slice Check

Common lint messages and how to fix them.

## Violations & fixes

| Message | Fix |
| --- | --- |
| `Forbidden dependency "widgets" <= "entities"` | Move import to a higher layer or adjust layer order |
| `cross imports are not allowed` | Import via `index.ts` or lift shared code to `core/` |
| `bypassing the public api` | Export from slice `index.ts`; consumers use barrel |
| `Unabstraction files` | Move file into declared segment or add pattern to config |

## Cross-slice example

**Problem:** `features/checkout/model/cart.ts` imports `features/catalog/model/products.ts`

**Fix:** Move shared product types to `entities/product` or `shared/api` and import the public barrel.

## Public API example

**Problem:** `import { themeStore } from "@core/providers/theme-store.ts"`

**Fix:**

```ts
// core/providers/index.ts
export { themeStore } from "./theme-store.js";

// consumer
import { themeStore } from "@core/providers/index.js";
```

## Run locally

```bash
bun run architect
bun run architect:watch
```

## See also

- [Public API](/docs/packages/architect/guides/public-api)
- [Layer Rules](/docs/packages/architect/guides/layers)
