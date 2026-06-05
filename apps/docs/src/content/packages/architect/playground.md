---
title: Playground
description: Try architect rules locally.
package: "@echojs/architect"
---

# Playground

There is no browser playground for Architect — it is a filesystem linter.

## Local loop

```bash
cd apps/docs
bun run architect:watch
```

Edit a file that violates layer rules (e.g. import a page from `core/`) and watch the diagnostic appear.

## Experiment with config

1. Copy `apps/docs/architect.config.ts` into a scratch app
2. Add a deliberate violation
3. Run `bun run architect` and read the preset name in the footer (`default/public-abstraction`, `default/restrict-cross-imports`, …)
4. Adjust rules or code until clean

> [!tip]
> Use `off(restrictCrossImports())` temporarily while refactoring large widget trees — re-enable before merge.
