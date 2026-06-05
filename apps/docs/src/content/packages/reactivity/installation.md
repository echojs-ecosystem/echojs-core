---
title: Installation
description: Add @echojs-ecosystem/reactivity to your app or monorepo workspace.
package: "@echojs-ecosystem/reactivity"
---

# Installation

`@echojs-ecosystem/reactivity` is a standalone package. HyperDOM and other EchoJS libraries depend on it — you often install it transitively, but models and features import it directly.

## Requirements

- **TypeScript** 5.x recommended (ships `.d.ts` with `DeepReadonly` read types)
- **ESM** bundler (Vite, Bun, etc.)
- Runtime: modern browsers or Node 20+

## Package managers

Use the same install panel as on the home page (tabs + copy):

:::install @echojs-ecosystem/reactivity

## Monorepo (echojs-core)

Workspace apps already reference the local package:

```json
{
  "dependencies": {
    "@echojs-ecosystem/reactivity": "workspace:*"
  }
}
```

From repo root:

```bash
bun install
```

No publish step is required for local development.

## Minimal import check

```ts
import { signal, computed, effect } from "@echojs-ecosystem/reactivity";

const $n = signal(0);
effect(() => console.log($n.value()));
$n.set(1);
```

## Peer usage in EchoJS apps

Typical stack:

:::install @echojs-ecosystem/hyperdom

Install reactivity explicitly when writing **models** or shared stores even if HyperDOM is already present.

## Engine note

The implementation uses **`alien-signals`** internally. Your code should only import `@echojs-ecosystem/reactivity` — the engine can change without breaking the public object API.
