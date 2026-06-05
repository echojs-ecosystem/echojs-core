---
title: Example
description: CLI usage examples — coming soon.
package: "@echojs/cli"
status: draft
---

# Example — CLI

> [!NOTE]
> `@echojs/cli` в разработке. Ниже — целевые команды (не запускайте в production).

## Planned workflow

```bash
# Create a new EchoJS app
bunx @echojs/cli create my-shop

cd my-shop
bun install
bun run dev
```

```bash
# Generate a feature slice
bunx @echojs/cli generate feature product-catalog

# Validate feature-first layout
bunx @echojs/cli doctor
```

## See also

- [CLI overview](/docs/packages/cli)
- Project structure — `/docs/getting-started/project-structure`
