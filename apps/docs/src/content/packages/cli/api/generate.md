---
title: generate (planned)
description: echojs generate — scaffold feature slices (planned).
package: "@echojs-ecosystem/cli"
---

# generate (planned)

> [!warning]
> **Not implemented.** Target command for feature slice scaffolding.

```bash
# planned
bunx @echojs-ecosystem/cli generate feature product-catalog
```

## Planned output

```
src/features/product-catalog/
  index.ts          # public API
  model/
  ui/
```

Aligned with [Architect](/docs/packages/architect) layer and public-api rules.

## Planned flags

| Flag | Description |
| --- | --- |
| `--dry-run` | Print files without writing |
| `--with-model` | Include `createModel` stub |
| `--with-page` | Add `*.page.ts` route entry |

## See also

- [Planned Commands](/docs/packages/cli/guides/planned-commands)
- [Architect Feature Slice](/docs/packages/architect/examples/feature-slice)
