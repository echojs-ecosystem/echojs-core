---
title: Important Defaults
description: Core concepts — abstractions, slices, rules, and CLI.
package: '@echojs-ecosystem/architect'
---

# Important Defaults

`@echojs-ecosystem/architect` analyzes your `src/` tree against
`architect.config.ts` and reports layer, public API, and cross-slice violations.

## What it checks

- **Layer direction** — pages may import entities, not the reverse
- **Public API** — consumers import `index.ts`, not deep paths
- **Cross-slice imports** — no sibling feature importing another feature's
  internals
- **Folder contract** — only declared segments (`model/`, `ui/`, …) inside a
  slice

## Core concepts

| Concept         | Meaning                                                        |
| --------------- | -------------------------------------------------------------- |
| **Abstraction** | Named folder contract (`slice`, `page`, `public-api`, …)       |
| **Slice**       | Feature folder with `index.ts`, `model/`, `ui/`, …             |
| **Rule**        | Preset attached to an abstraction (`dependenciesDirection`, …) |

## CLI

```bash
echo-architect lint              # one-shot
echo-architect lint --watch      # watch mode
echo-architect lint --fix        # apply safe fixes when available
```

The docs site uses it in CI via `bun run architect`. Config:
`apps/docs/architect.config.ts`.

## See also

- [Layer Rules](/docs/packages/architect/guides/layers)
- [Presets & Config](/docs/packages/architect/guides/presets)
