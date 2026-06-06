---
title: Presets
description: Rule presets — dependenciesDirection, publicAbstraction, and more.
package: "@echojs-ecosystem/architect"
---

# Presets

```ts
import {
  dependenciesDirection,
  type DependenciesDirectionOptions,
  publicAbstraction,
  restrictCrossImports,
  noUnabstractionFiles,
  requiredChildren,
  off,
  warn,
} from "@echojs-ecosystem/architect";
```

## dependenciesDirection(order, options?)

```ts
type DependenciesDirectionOptions = {
  /** Glob patterns; matching dependency paths bypass layer-order checks. */
  allowDownward?: readonly string[];
};

dependenciesDirection(
  ["app", "pages", "entities", "widgets", "features", "shared"],
  { allowDownward: ["**/app/router/**", "**/core/providers/**"] },
);
```

## publicAbstraction(name)

Marks abstraction `name` (e.g. `"public-api"`, `"page"`) as the only entry external importers may use.

## restrictCrossImports()

Forbids imports between sibling instances under the same layer abstraction.

## noUnabstractionFiles()

No files outside declared child segments — catches loose `.ts` files in slice roots.

## Low-level

```ts
import { rule, parseAbstractionInstance, parseDependenciesMap, getFlattenFiles } from "@echojs-ecosystem/architect";
```

## See also

- [Layer Rules](/docs/packages/architect/guides/layers)
- [Public API](/docs/packages/architect/guides/public-api)
