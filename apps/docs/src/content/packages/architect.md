---
title: Architect
description:
  Architecture linter for EchoJS apps — layer rules, public APIs, and import
  boundaries.
package: '@echojs-ecosystem/architect'
keywords: [architect, lint, fsd, layers, dependencies, public-api]
---

:::package-overview architect

:::install @echojs-ecosystem/architect

## What it does

`@echojs-ecosystem/architect` analyzes your `src/` tree against
`architect.config.ts` and reports:

- **Layer direction** — pages may import entities, not the reverse
- **Public API** — consumers import `index.ts`, not deep paths
- **Cross-slice imports** — no sibling feature importing another feature
  internals
- **Folder contract** — only declared segments (`model/`, `ui/`, …) inside a
  slice

The docs site uses it in CI via `bun run architect`. Config lives at
[`apps/docs/architect.config.ts`](https://github.com/echojs/echojs/blob/main/apps/docs/architect.config.ts).

## Quick start

```bash
bun add -D @echojs-ecosystem/architect
```

```json
{
  "scripts": {
    "architect": "echo-architect lint",
    "architect:watch": "echo-architect lint --watch"
  }
}
```

```bash
bun run architect
```

> [!tip] Pair with [Project Structure](/docs/getting-started/project-structure)
> and [Dependency Flow](/docs/architecture/dependency-flow) so layer names in
> config match your folders.
