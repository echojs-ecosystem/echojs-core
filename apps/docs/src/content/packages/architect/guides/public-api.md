---
title: Public API
description: publicAbstraction rule and barrel imports.
package: "@echojs-ecosystem/architect"
---

# Public API

When `publicAbstraction("public-api")` is on a slice, external code must import `index.ts` (or another declared public segment like `*.page.ts` on pages).

## Rule

```ts
publicAbstraction("public-api")
```

Consumers import the barrel:

```ts
import { themeStore } from "@core/providers/index.js";
```

Not deep paths:

```ts
// forbidden
import { themeStore } from "@core/providers/theme-store.ts";
```

## Error message

`Imports of "providers" bypassing the public api are forbidden`

**Fix:** re-export from `core/providers/index.ts` and import the barrel.

## Page public API

Pages use `publicAbstraction("page")` for `*.page.ts` route entries alongside `index.ts` barrels.

## See also

- [Feature Slice Check](/docs/packages/architect/examples/feature-slice)
- [Presets](/docs/packages/architect/api/presets)
