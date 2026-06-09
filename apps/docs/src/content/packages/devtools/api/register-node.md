---
title: registerDevtoolsNode
description: Register an inspectable devtools node and emit timeline events.
package: '@echojs-ecosystem/devtools'
keywords: [registerDevtoolsNode, devtools]
---

@echojs-ecosystem/devtools

## Usage

```ts
setDevtoolsEnabled(import.meta.env.DEV)

const node = registerDevtoolsNode({
  type: 'custom',
  id: 'cart',
  name: 'ShoppingCart',
  getSnapshot: () => cartStore.value(),
})

emitDevtoolsEvent({
  source: 'store',
  type: 'changed',
  nodeId: 'cart',
  payload: { action: 'addItem' },
})
```

## Type Declarations

```ts
function registerDevtoolsNode(input: RegisterDevtoolsNodeInput): RegisteredNode
function unregisterDevtoolsNode(nodeId: string): boolean
function emitDevtoolsEvent(input: EmitDevtoolsEventInput): DevtoolsEvent | null
```

## API

### Returns

`registerDevtoolsNode` — see Type Declarations for the full signature.
