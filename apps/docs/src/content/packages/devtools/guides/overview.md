---
title: Overview
description: What @echojs-ecosystem/devtools provides today and what is planned.
package: "@echojs-ecosystem/devtools"
---

# Overview

`@echojs-ecosystem/devtools` is the **infrastructure layer** for EchoJS developer tooling — not a finished browser UI.

## Available today

| Feature | Description |
| --- | --- |
| **Registry** | Nodes with `type`, `id`, `name`, optional `getSnapshot()` |
| **Timeline** | FIFO event log (default max 500 events) with subscribe API |
| **Global bridge** | `globalThis.__ECHOJS_DEVTOOLS__` |
| **Production-safe** | `setDevtoolsEnabled(false)` makes all APIs no-ops |

Integrating packages (store, query, router, persist, …) register nodes automatically when devtools is enabled.

## Planned

| Feature | Status |
| --- | --- |
| **`createDevtoolsProvider`** | Echo provider for app bootstrap — **planned** |
| **Browser overlay** | Visual panels for signals, query cache, routes — **planned** |
| **Signal dependency hints** | Dev-only tracking UI — **planned** |

> [!note]
> Do not rely on `createDevtoolsProvider` or overlay APIs — they are not exported yet.

## Quick start (today)

```ts
import {
  registerDevtoolsNode,
  emitDevtoolsEvent,
  subscribeTimeline,
  setDevtoolsEnabled,
} from "@echojs-ecosystem/devtools";

setDevtoolsEnabled(import.meta.env.DEV);

const node = registerDevtoolsNode({
  type: "store",
  id: "auth",
  name: "authStore",
  getSnapshot: () => ({ token: authStore.value() }),
});

emitDevtoolsEvent({
  source: "store",
  type: "changed",
  nodeId: "auth",
  payload: { value, prevValue },
});

subscribeTimeline((event) => console.log(event));
node.unregister();
```

## See also

- [Registry & Timeline](/docs/packages/devtools/guides/registry)
- [Package Integration](/docs/packages/devtools/guides/integration)
