---
title: Bridge
description: setDevtoolsEnabled, global hook, and bridge access.
package: "@echojs-ecosystem/devtools"
---

# Bridge

Production-safe toggle and global bridge access.

## Enable / disable

```ts
import {
  setDevtoolsEnabled,
  isDevtoolsEnabled,
} from "@echojs-ecosystem/devtools";

setDevtoolsEnabled(import.meta.env.DEV);
```

When disabled, all registry and timeline APIs are **no-ops** with zero overhead.

## Global hook

```ts
import { DEVTOOLS_GLOBAL_HOOK_KEY } from "@echojs-ecosystem/devtools";
// globalThis.__ECHOJS_DEVTOOLS__
```

External tools and planned overlay UI attach via the global bridge.

## Bridge access

```ts
import {
  getDevtoolsBridge,
  getOrCreateDevtoolsBridge,
  createDevtoolsBridge,
} from "@echojs-ecosystem/devtools";
```

Low-level access to `registry` and `timeline` on the bridge instance.

## Utilities

| Export | Description |
| --- | --- |
| `createDevtoolsId` | Generate unique node ids |
| `safeSerialize` | Serialize snapshots for display |

## See also

- [Package Integration](/docs/packages/devtools/guides/integration)
