---
title: Installation
description: Add @echojs-ecosystem/reactivity to your EchoJS or vanilla TypeScript app.
package: "@echojs-ecosystem/reactivity"
---

# Installation

Reactivity ships as a **standalone package** and is also re-exported through **`@echojs-ecosystem/framework`**. Both import paths expose the same API.

## Import paths

| Path | When to use |
| --- | --- |
| `@echojs-ecosystem/reactivity` | À la carte install — explicit dependency in `package.json` |
| `@echojs-ecosystem/framework/reactivity` | You already use the framework meta-package — one install, subpath imports |

```ts
// Standalone package
import { signal, computed, effect } from "@echojs-ecosystem/reactivity";

// Same API via framework subpath
import { signal, computed, effect } from "@echojs-ecosystem/framework/reactivity";
```

> [!tip]
> Pick **one style per app** and stay consistent. Mixing both paths works at runtime but clutters dependency graphs.

## Quick install

Standalone:

:::install @echojs-ecosystem/reactivity

Or install the full framework once (includes reactivity):

:::install @echojs-ecosystem/framework

## Requirements

| Requirement | Notes |
| --- | --- |
| **TypeScript** 5.x | Ships `.d.ts` with `DeepReadonly` read types |
| **ESM bundler** | Vite, Bun, webpack with ESM output |
| **Runtime** | Modern browsers or Node 20+ |

## Verify the import

```ts
import { signal, effect } from "@echojs-ecosystem/reactivity";
// or: from "@echojs-ecosystem/framework/reactivity"

const $n = signal(0);
effect(() => console.log($n.value()));
$n.set(1);
```

## Typical EchoJS stack

For UI you will also need HyperDOM (which peers on reactivity):

:::install @echojs-ecosystem/hyperdom

Install reactivity **explicitly** when writing models or shared stores even if HyperDOM is already present.

## Engine note

The implementation uses **`alien-signals`** internally. Import only the public package paths above — the engine can change without breaking the object API.

## Next steps

- [Important Defaults](/docs/packages/reactivity/guides/important-defaults) — execution model
- [Signals](/docs/packages/reactivity/guides/signals) — first patterns
- [Examples](/docs/packages/reactivity/example) — copy-paste patterns
- [Playground](/docs/packages/reactivity/playground) — live demo
