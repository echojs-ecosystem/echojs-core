---
title: Usage
description: Rules, presets, and allowDownward paths in architect.config.ts.
package: "@echojs-ecosystem/architect"
---

# Usage

## CLI

```bash
echo-architect lint              # one-shot
echo-architect lint --watch      # watch mode
echo-architect lint --fix        # apply safe fixes when available
```

## Core concepts

| Concept | Meaning |
| --- | --- |
| **Abstraction** | Named folder contract (`slice`, `page`, `public-api`, …) |
| **Slice** | Feature folder with `index.ts`, `model/`, `ui/`, … |
| **Rule** | Preset attached to an abstraction (`dependenciesDirection`, …) |

## Built-in presets

```ts
import {
  dependenciesDirection,
  publicAbstraction,
  restrictCrossImports,
  noUnabstractionFiles,
} from "@echojs-ecosystem/architect";
```

| Preset | Purpose |
| --- | --- |
| `dependenciesDirection(order)` | Enforce layer import order |
| `publicAbstraction("public-api")` | External imports must go through public entry |
| `restrictCrossImports()` | Sibling slices cannot import each other |
| `noUnabstractionFiles()` | No loose files outside declared segments |

## Layer order

```ts
dependenciesDirection([
  "app",
  "pages",
  "entities",
  "widgets",
  "features",
  "shared",
]);
```

Upper layers (left) may import lower layers (right). Importing upward is an error.

## Downward exceptions (`allowDownward`)

Some app-shell modules are intentionally shared downward — e.g. route tables in `app/router`. App-wide providers live in `core/providers`:

```ts
dependenciesDirection(
  ["app", "pages", "entities", "widgets", "features", "core"],
  {
    allowDownward: ["**/app/router/**"],
  },
);
```

Glob patterns match dependency **file paths**. Matching imports skip the layer-order check but still respect `publicAbstraction` when enabled.

## Public API rule

When `publicAbstraction("public-api")` is on a slice, external code must import `index.ts` (or another declared public segment like `*.page.ts` on pages).

**Error:** `Imports of "providers" bypassing the public api are forbidden`  
**Meaning:** something imported `core/providers/theme-store.ts` instead of `core/providers/index.ts`.

**Fix:** re-export from `core/providers/index.ts` and import the barrel (`@core/providers/index.js`).

## Docs site reference

See [`apps/docs/architect.config.ts`](https://github.com/echojs/echojs/blob/main/apps/docs/architect.config.ts) for the full EchoJS slice layout used on this site.
