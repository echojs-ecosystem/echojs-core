<div align="center">

# @echojs-ecosystem/devtools

**Runtime registry and event timeline for EchoJS DevTools — no UI, zero overhead when disabled.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/devtools)](https://www.npmjs.com/package/@echojs-ecosystem/devtools)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/devtools)

</div>

---

Infrastructure layer for EchoJS DevTools. Provides a **global bridge**, **node registry**, and **FIFO event timeline**. Integrating packages (store, query, router, …) register automatically — end users rarely call these APIs directly.

## Features

- **Registry** — nodes with `type`, `id`, `name`, optional `getSnapshot()`
- **Timeline** — event log (default max 500 events) with subscribe API
- **Global bridge** — `globalThis.__ECHOJS_DEVTOOLS__`
- **Production-safe** — `setDevtoolsEnabled(false)` makes all APIs no-ops
- **Zero dependencies** — `sideEffects: false`, tree-shakeable

## Install

```bash
npm install @echojs-ecosystem/devtools
```

Or via the meta-package:

```bash
npm install @echojs-ecosystem/framework
```

```ts
import { setDevtoolsEnabled } from "@echojs-ecosystem/framework/devtools";
```

## Quick start

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

## Node types

`store` · `query` · `mutation` · `router` · `persist` · `url-state` · `ui-provider` · `signal` · `custom`

## API

| Export | Description |
|--------|-------------|
| `registerDevtoolsNode` | Register inspectable node |
| `emitDevtoolsEvent` | Append timeline event |
| `getNodeSnapshot` / `getAllSnapshots` | Read current state |
| `subscribeTimeline` | Listen to events |
| `getDevtoolsBridge` | Full bridge access |
| `setDevtoolsEnabled` | Toggle all DevTools APIs |
| `createDevtoolsId`, `safeSerialize` | Utilities |

## Documentation

[echojs.dev/docs/packages/devtools](https://echojs.dev/docs/packages/devtools)
