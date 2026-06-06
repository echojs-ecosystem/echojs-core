---
title: registerDevtoolsNode
description: Register an inspectable devtools node and emit timeline events.
package: "@echojs-ecosystem/devtools"
---

# registerDevtoolsNode

```ts
function registerDevtoolsNode(input: RegisterDevtoolsNodeInput): RegisteredNode
function unregisterDevtoolsNode(nodeId: string): boolean
function emitDevtoolsEvent(input: EmitDevtoolsEventInput): DevtoolsEvent | null
```

## RegisterDevtoolsNodeInput

| Field | Description |
| --- | --- |
| `type` | `DevtoolsNodeType` — `store`, `query`, `router`, `custom`, … |
| `id` | Unique node id |
| `name` | Display name |
| `getSnapshot` | Optional `() => unknown` for current state |

## RegisteredNode

| Member | Description |
| --- | --- |
| `unregister()` | Remove node from registry |

Returns a no-op handle when devtools is disabled.

## Timeline helpers

```ts
getNodeSnapshot(nodeId);
getAllSnapshots();
getTimelineEvents();
subscribeTimeline(listener); // returns unsubscribe
```

## Example

```ts
setDevtoolsEnabled(import.meta.env.DEV);

const node = registerDevtoolsNode({
  type: "custom",
  id: "cart",
  name: "ShoppingCart",
  getSnapshot: () => cartStore.value(),
});

emitDevtoolsEvent({
  source: "store",
  type: "changed",
  nodeId: "cart",
  payload: { action: "addItem" },
});
```

## See also

- [Registry & Timeline](/docs/packages/devtools/guides/registry)
