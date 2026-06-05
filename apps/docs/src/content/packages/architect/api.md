---
title: API
description: Programmatic API for @echojs/architect.
package: "@echojs/architect"
---

# API

## Config

```ts
import { defineConfig, abstraction } from "@echojs/architect";

export default defineConfig({
  baseUrl: "src",
  ignores: ["**/*.md"],
  root: abstraction({ name: "src", children: { /* … */ } }),
});
```

## Presets

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
} from "@echojs/architect";
```

### `dependenciesDirection(order, options?)`

```ts
type DependenciesDirectionOptions = {
  /** Glob patterns; matching dependency paths bypass layer-order checks. */
  allowDownward?: readonly string[];
};
```

### `publicAbstraction(name)`

Marks abstraction `name` (e.g. `"public-api"`, `"page"`) as the only entry external importers may use.

### `restrictCrossImports()`

Forbids imports between sibling instances under the same layer abstraction.

## Lint

```ts
import { lint } from "@echojs/architect";

const result = await lint({
  configPath: "./architect.config.ts",
  cwd: process.cwd(),
});
```

## Low-level

```ts
import {
  rule,
  parseAbstractionInstance,
  parseDependenciesMap,
  getFlattenFiles,
} from "@echojs/architect";
```

Use when building custom tooling on top of the same VFS + dependency graph.
