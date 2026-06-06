---
title: Scaffold App (planned)
description: Target end-to-end CLI workflow for new EchoJS apps.
package: "@echojs-ecosystem/cli"
---

# Scaffold App (planned)

> [!warning]
> **`@echojs-ecosystem/cli` is in development.** Do not run these commands until the package ships.

## Planned workflow

```bash
# Create a new EchoJS app
bunx @echojs-ecosystem/cli create my-shop

cd my-shop
bun install
bun run dev
```

```bash
# Generate a feature slice
bunx @echojs-ecosystem/cli generate feature product-catalog

# Validate feature-first layout
bunx @echojs-ecosystem/cli doctor
```

## Today

Copy `apps/example` and run Architect lint:

```bash
bun run architect
```

## See also

- [create API](/docs/packages/cli/api/create)
- [Project Structure](/docs/getting-started/project-structure)
