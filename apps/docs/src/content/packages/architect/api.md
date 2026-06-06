---
title: API Reference
description: Programmatic API for @echojs-ecosystem/architect.
package: "@echojs-ecosystem/architect"
---

# API Reference

```ts
import {
  defineConfig,
  abstraction,
  dependenciesDirection,
  publicAbstraction,
  restrictCrossImports,
  noUnabstractionFiles,
  lint,
} from "@echojs-ecosystem/architect";
```

## Config

| Export | Description |
| --- | --- |
| [defineConfig](/docs/packages/architect/api/define-config) | Config factory |
| [Presets](/docs/packages/architect/api/presets) | Rule presets |

## Lint

| Export | Description |
| --- | --- |
| [lint](/docs/packages/architect/api/lint) | Programmatic lint runner |

## Low-level

`rule`, `parseAbstractionInstance`, `parseDependenciesMap`, `getFlattenFiles` — for custom tooling on the VFS + dependency graph.

## Guides

- [Layer Rules](/docs/packages/architect/guides/layers)
- [Public API](/docs/packages/architect/guides/public-api)
- [CI Integration](/docs/packages/architect/guides/ci-integration)
