---
title: Presets & Config
description: Built-in rule presets and defineConfig structure.
package: '@echojs-ecosystem/architect'
---

# Presets & Config

Built-in presets attach to abstractions in `architect.config.ts`.

## Imports

```ts
import {
  dependenciesDirection,
  publicAbstraction,
  restrictCrossImports,
  noUnabstractionFiles,
  requiredChildren,
  off,
  warn,
} from '@echojs-ecosystem/architect'
```

## Preset reference

| Preset                            | Purpose                                  |
| --------------------------------- | ---------------------------------------- |
| `dependenciesDirection(order)`    | Enforce layer import order               |
| `publicAbstraction("public-api")` | External imports via public entry        |
| `restrictCrossImports()`          | Sibling slices cannot import each other  |
| `noUnabstractionFiles()`          | No loose files outside declared segments |
| `requiredChildren(...)`           | Require segment folders                  |
| `off()` / `warn()`                | Severity modifiers                       |

## Config skeleton

```ts
import {
  abstraction,
  defineConfig,
  dependenciesDirection,
} from '@echojs-ecosystem/architect'

export default defineConfig({
  baseUrl: 'src',
  ignores: ['**/*.md'],
  root: abstraction({
    name: 'src',
    children: {
      /* layer tree */
    },
    rules: [dependenciesDirection(['app', 'pages', 'shared'])],
  }),
})
```

## Cross-slice rule

`restrictCrossImports()` on a layer forbids sibling slice imports — lift shared
code to `core/` or `shared/`.

## See also

- [defineConfig API](/docs/packages/architect/api/define-config)
- [Docs Site Config](/docs/packages/architect/examples/docs-site-config)
