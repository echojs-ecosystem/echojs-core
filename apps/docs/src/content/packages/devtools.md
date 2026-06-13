---
title: DevTools
description: Developer overlay for signals, query cache, and routes (planned).
package: '@echojs-ecosystem/devtools'
keywords: [devtools, debug]
---

:::package-overview devtools

:::install @echojs-ecosystem/devtools

## Key APIs

| Export | Role |
| ------ | ---- |
| [`registerDevtoolsNode`](/docs/packages/devtools/api/register-node) | Register a model, store, or feature for inspection |
| [`Bridge`](/docs/packages/devtools/api/bridge) | Connect app runtime to the devtools panel |

## Integration

Register nodes from `createModel` or store modules so the overlay can list
active slices:

```ts
import { registerDevtoolsNode } from '@echojs-ecosystem/devtools'

registerDevtoolsNode({
  id: 'session',
  type: 'store',
  label: 'Session',
})
```

Keep registration behind `import.meta.env.DEV` — never ship the bridge in
production bundles.

> [!note] Runtime registry is available today. Browser overlay UI is on the roadmap.

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Functions](/docs/packages/devtools/functions) | Registry, bridge API |
| [Guides](/docs/packages/devtools/guides/overview) | Integration |

Each API page: **Usage** → **Type Declarations** → **API** (see [registerDevtoolsNode](/docs/packages/devtools/api/register-node)).
