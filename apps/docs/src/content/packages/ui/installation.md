---
title: Installation
description: Add @echojs-ecosystem/ui with HyperDOM peer dependency.
package: '@echojs-ecosystem/ui'
---

# Installation

UI components render through HyperDOM — install **both** packages.

## Import paths

| Path                                                    | When to use                                           |
| ------------------------------------------------------- | ----------------------------------------------------- |
| `@echojs-ecosystem/ui`                                  | Barrel import (tree-shaking via subpaths recommended) |
| `@echojs-ecosystem/ui/button`, `/field`, `/provider`, … | Per-component subpath                                 |
| `@echojs-ecosystem/framework/ui`                        | You already use the framework meta-package            |

```ts
import { Button } from '@echojs-ecosystem/ui/button'
import { createUiProvider } from '@echojs-ecosystem/ui/provider'
// or: from "@echojs-ecosystem/framework/ui/..."
```

> [!note] Full component docs are **expanding** — the
> [Playground](/docs/packages/ui/playground) shows a live Button demo today. See
> `packages/ui/README.md` and Storybook for the latest catalog.

## Quick install

:::install @echojs-ecosystem/ui

:::install @echojs-ecosystem/hyperdom

Or install the full framework once:

:::install @echojs-ecosystem/framework

## Register the provider

```ts
import { createUiProvider } from '@echojs-ecosystem/ui/provider'

export const uiProvider = createUiProvider({
  // theme overrides
})

createEchoApp({ strictContextChecks: true }).use(uiProvider).mount('#app')
```

## Requirements

| Requirement        | Notes                                                                  |
| ------------------ | ---------------------------------------------------------------------- |
| **HyperDOM**       | Peer dependency — components return DOM nodes via `h()`                |
| **CSS tokens**     | Import theme tokens from `@echojs-ecosystem/ui/theme` or global tokens |
| **TypeScript** 5.x | Subpath exports ship `.d.ts` per component                             |

## Next steps

- [Important Defaults](/docs/packages/ui/guides/important-defaults) — subpaths,
  headless mode, a11y
- [UIProvider & Theme](/docs/packages/ui/guides/ui-provider) —
  `createUiProvider` setup
- [Examples](/docs/packages/ui/example) — Button and form row patterns
