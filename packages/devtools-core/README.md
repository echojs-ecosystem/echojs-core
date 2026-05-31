# @echojs/devtools-core

Runtime infrastructure for EchoJS DevTools — **no UI**, **no browser extension**, **no overlay**.

This package provides a global registry, snapshots, and an event timeline that other EchoJS packages integrate with automatically (store, query, router, persist, url-state, ui).

## Install

```bash
bun add @echojs/devtools-core
```

Zero runtime dependencies. `sideEffects: false` — safe to tree-shake when DevTools are disabled.

## Concepts

| Piece | Role |
|-------|------|
| **Registry** | Registered nodes (store, query, router, …) with optional `getSnapshot()` |
| **Timeline** | FIFO event log (default max **500** events) |
| **Bridge** | Singleton on `globalThis.__ECHOJS_DEVTOOLS__` |

## Quick start

### Register a node (e.g. store)

```ts
import { registerDevtoolsNode, emitDevtoolsEvent } from '@echojs/devtools-core'

const node = registerDevtoolsNode({
  type: 'store',
  id: 'auth',
  name: 'authStore',
  getSnapshot: () => ({ value: authStore.value() }),
})

// later
node.unregister()
```

### Emit timeline event

```ts
emitDevtoolsEvent({
  source: 'store',
  type: 'changed',
  nodeId: 'auth',
  payload: { value, prevValue },
})
```

### Read snapshots

```ts
import { getNodeSnapshot, getAllSnapshots } from '@echojs/devtools-core'

getNodeSnapshot('auth')
// { id, type, name, state, timestamp }

getAllSnapshots()
```

### Subscribe to timeline

```ts
import { subscribeTimeline } from '@echojs/devtools-core'

const unsub = subscribeTimeline((event) => {
  console.log(event.source, event.type, event.payload)
})
```

### Global bridge (for DevTools UI / adapters)

```ts
import { getDevtoolsBridge } from '@echojs/devtools-core'

const bridge = getDevtoolsBridge()
// bridge.registry — register / snapshots
// bridge.timeline — events / subscribe

// Also available globally:
globalThis.__ECHOJS_DEVTOOLS__
```

## Production

Disable DevTools at startup — all public APIs become no-ops:

```ts
import { setDevtoolsEnabled } from '@echojs/devtools-core'

setDevtoolsEnabled(false)
```

When disabled:

- `registerDevtoolsNode()` → `{ unregister() {} }`
- `emitDevtoolsEvent()` → `null`
- `getAllSnapshots()` → `[]`
- `getTimelineEvents()` → `[]`

Integrating packages should call `setDevtoolsEnabled(import.meta.env.DEV)` (or equivalent) so production builds have **zero overhead**.

## Node types

`store` · `query` · `mutation` · `router` · `persist` · `url-state` · `ui-provider` · `signal` · `custom`

## Utilities

```ts
import { createDevtoolsId, safeSerialize } from '@echojs/devtools-core'

createDevtoolsId('store') // store_1, store_2, …

safeSerialize(circularOrBigIntValue) // never throws
```

## Integration (future)

Packages register themselves internally — **end users do not call register manually**:

| Package | Node type | Typical events |
|---------|-----------|----------------|
| `@echojs/store` | `store` | `changed` |
| `@echojs/query` | `query`, `mutation` | `fetch`, `success`, `error` |
| `@echojs/router` | `router` | `navigate` |
| `@echojs/persist` | `persist` | `hydrate`, `persist` |
| `@echojs/url-state` | `url-state` | `sync` |
| `@echojs/ui` | `ui-provider` | `theme`, `config` |

## License

Private monorepo package.
