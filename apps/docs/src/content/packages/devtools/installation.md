---
title: Installation
description: Install @echojs-ecosystem/devtools runtime registry.
package: "@echojs-ecosystem/devtools"
---

# Installation

DevTools core is a **runtime registry and event timeline** — no browser overlay UI yet (planned).

## Import paths

| Path | When to use |
| --- | --- |
| `@echojs-ecosystem/devtools` | À la carte install |
| `@echojs-ecosystem/framework/devtools` | You already use the framework meta-package |

```ts
import { setDevtoolsEnabled, registerDevtoolsNode } from "@echojs-ecosystem/devtools";
// or: from "@echojs-ecosystem/framework/devtools"
```

## Quick install

:::install @echojs-ecosystem/devtools

Or install the full framework once:

:::install @echojs-ecosystem/framework

## Production

Disable at bootstrap — all public APIs become no-ops with zero overhead:

```ts
import { setDevtoolsEnabled } from "@echojs-ecosystem/devtools";

setDevtoolsEnabled(import.meta.env.DEV);
```

## Verify the import

```ts
import {
  registerDevtoolsNode,
  emitDevtoolsEvent,
  setDevtoolsEnabled,
} from "@echojs-ecosystem/devtools";

setDevtoolsEnabled(true);

const node = registerDevtoolsNode({
  type: "custom",
  id: "demo",
  name: "demoNode",
  getSnapshot: () => ({ ok: true }),
});

node.unregister();
```

## Next steps

- [Overview](/docs/packages/devtools/guides/overview) — what ships today vs planned
- [Registry & Timeline](/docs/packages/devtools/guides/registry)
- [Examples](/docs/packages/devtools/example)
