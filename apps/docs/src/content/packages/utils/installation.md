---
title: Installation
description: Install @echojs-ecosystem/utils and pick full or subpath imports.
package: '@echojs-ecosystem/utils'
---

# Installation

`@echojs-ecosystem/utils` is an **ecosystem package** (not part of core). It
depends only on `@echojs-ecosystem/reactivity`.

## Import paths

| Path | When to use |
| ---- | ----------- |
| `@echojs-ecosystem/utils` | Barrel import — convenient, slightly larger graph |
| `@echojs-ecosystem/utils/window-size` | **Recommended** — one util per chunk |

```ts
// Full import
import { windowSize, clipboard } from '@echojs-ecosystem/utils'

// Subpath (tree-shakeable)
import { windowSize } from '@echojs-ecosystem/utils/window-size'
import { clipboard } from '@echojs-ecosystem/utils/clipboard'
```

## Quick install

:::install @echojs-ecosystem/utils

Peer:

:::install @echojs-ecosystem/reactivity

## Requirements

| Requirement | Notes |
| ----------- | ----- |
| **TypeScript** 5.x | Typed signals and options |
| **ESM bundler** | Vite, Bun, webpack with ESM output |
| **Browser APIs** | Optional — utilities no-op on the server |

## Verify the import

```ts
import { online } from '@echojs-ecosystem/utils/online'

const online = online()
console.log(online.value())
online.dispose()
```

## Next steps

- [Philosophy](/docs/packages/utils/guides/philosophy) — naming & dispose
- [SSR-Safe](/docs/packages/utils/guides/ssr-safe) — server defaults
- [Examples](/docs/packages/utils/example) — copy-paste patterns
