---
title: Example
description: CLI usage examples — coming soon.
package: "@echojs-ecosystem/cli"
status: draft
---

# Example — CLI

> [!NOTE]
> `@echojs-ecosystem/cli` в разработке. Ниже — целевые команды (не запускайте в production).

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

## See also

- [CLI overview](/docs/packages/cli)
- Project structure — `/docs/getting-started/project-structure`
