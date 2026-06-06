---
title: Installation
description: Install @echojs-ecosystem/cli (planned).
package: "@echojs-ecosystem/cli"
---

# Installation

> [!warning]
> **`@echojs-ecosystem/cli` is not released yet.** Use `apps/example` as the reference layout until `echojs create` ships.

## Planned install

Package-only — no framework subpath (CLI is a standalone dev tool).

```bash
# planned
bunx @echojs-ecosystem/cli@latest
```

Or as a dev dependency:

```bash
bun add -D @echojs-ecosystem/cli
```

When published:

:::install @echojs-ecosystem/cli

## Planned requirements

| Requirement | Notes |
| --- | --- |
| **Bun** or **Node** 20+ | Engine TBD at first release |
| **Global vs local** | `bunx` for one-off scaffolds; `-D` for CI `doctor` |

## Interim workflow

Clone or copy from `apps/example` and adapt `package.json`, `src/`, and `architect.config.ts` manually.

## Next steps

- [Overview](/docs/packages/cli/guides/overview)
- [Planned Commands](/docs/packages/cli/guides/planned-commands)
- [Project Structure](/docs/getting-started/project-structure)
