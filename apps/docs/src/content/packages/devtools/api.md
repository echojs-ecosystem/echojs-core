---
title: API Reference
description: @echojs-ecosystem/devtools public API — registry and bridge.
package: "@echojs-ecosystem/devtools"
---

# API Reference

Infrastructure layer for EchoJS DevTools. Integrating packages (store, query, router, …) register automatically — end users rarely call these APIs directly.

```ts
import {
  setDevtoolsEnabled,
  isDevtoolsEnabled,
  registerDevtoolsNode,
  unregisterDevtoolsNode,
  emitDevtoolsEvent,
  getNodeSnapshot,
  getAllSnapshots,
  getTimelineEvents,
  subscribeTimeline,
  getDevtoolsBridge,
} from "@echojs-ecosystem/devtools";
```

## Available today

| Export | Description |
| --- | --- |
| [registerDevtoolsNode](/docs/packages/devtools/api/register-node) | Register inspectable node |
| [Bridge](/docs/packages/devtools/api/bridge) | `setDevtoolsEnabled`, global hook, bridge access |
| `emitDevtoolsEvent` | Append timeline event |
| `getNodeSnapshot` / `getAllSnapshots` | Read current state |
| `subscribeTimeline` | Listen to events |
| `createDevtoolsId`, `safeSerialize` | Utilities |

## Planned (not shipped)

| Export | Status |
| --- | --- |
| `createDevtoolsProvider` | Echo provider — **planned** |
| Browser overlay UI | Debug panels — **planned** |

## Node types

`store` · `query` · `mutation` · `router` · `persist` · `url-state` · `ui-provider` · `signal` · `custom`

## Guides

- [Overview](/docs/packages/devtools/guides/overview)
- [Package Integration](/docs/packages/devtools/guides/integration)
