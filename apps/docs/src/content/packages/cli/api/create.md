---
title: create (planned)
description: echojs create — scaffold a new EchoJS app (planned).
package: "@echojs-ecosystem/cli"
---

# create (planned)

> [!warning]
> **Not implemented.** Target command for the first CLI release.

```bash
# planned
bunx @echojs-ecosystem/cli create my-shop

cd my-shop
bun install
bun run dev
```

## Planned flags

| Flag | Description |
| --- | --- |
| `--template` | App template variant |
| `--package-manager` | `bun` \| `npm` \| `pnpm` |
| `--no-git` | Skip git init |

## Planned output

- `package.json` with EchoJS dependencies
- `src/` with app shell, router, providers
- `architect.config.ts` starter config
- Example feature slice

## See also

- [Scaffold App example](/docs/packages/cli/examples/scaffold-app)
- [Overview](/docs/packages/cli/guides/overview)
