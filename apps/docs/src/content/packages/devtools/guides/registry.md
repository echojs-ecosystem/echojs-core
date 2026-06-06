---
title: Registry & Timeline
description: Node registry, snapshots, and the event timeline.
package: "@echojs-ecosystem/devtools"
---

# Registry & Timeline

Two core primitives: a **node registry** for inspectable state and a **timeline** for event history.

## Register a node

```ts
const node = registerDevtoolsNode({
  type: "store",
  id: "auth",
  name: "authStore",
  getSnapshot: () => ({ token: authStore.value() }),
});

// later
node.unregister();
```

When devtools is disabled, `registerDevtoolsNode` returns a no-op handle — safe in production builds.

## Node types

`store` · `query` · `mutation` · `router` · `persist` · `url-state` · `ui-provider` · `signal` · `custom`

## Snapshots

```ts
getNodeSnapshot("auth");
getAllSnapshots();
```

`getSnapshot` runs when a consumer reads state — keep it fast and side-effect free.

## Timeline

```ts
emitDevtoolsEvent({
  source: "store",
  type: "changed",
  nodeId: "auth",
  payload: { value, prevValue },
});

getTimelineEvents();
const unsub = subscribeTimeline((event) => console.log(event));
```

Default max **500 events** (FIFO). Returns `null` / empty when disabled.

## Low-level classes

`DevtoolsRegistry` and `DevtoolsTimeline` are exported for advanced tooling — most apps use the facade functions.

## See also

- [registerDevtoolsNode API](/docs/packages/devtools/api/register-node)
- [Local Debug example](/docs/packages/devtools/examples/local-debug)
