---
title: Package Integration
description:
  How Echo packages register with devtools and planned overlay wiring.
package: '@echojs-ecosystem/devtools'
---

# Package Integration

Echo ecosystem packages integrate with devtools **automatically** when enabled —
you rarely call registry APIs directly.

## Enable in development

```ts
import { setDevtoolsEnabled } from '@echojs-ecosystem/devtools'

setDevtoolsEnabled(import.meta.env.DEV)
```

Call early in app bootstrap, before stores and routers initialize.

## What registers today

| Package   | Node type           | Inspects              |
| --------- | ------------------- | --------------------- |
| Store     | `store`             | Store snapshots       |
| Query     | `query`, `mutation` | Cache entries, status |
| Router    | `router`            | Active route chain    |
| Persist   | `persist`           | Hydration state       |
| URL State | `url-state`         | Query param bindings  |

## Planned: Echo provider

```ts
// planned — not implemented
import { createDevtoolsProvider } from '@echojs-ecosystem/devtools'

createEchoApp({ strictContextChecks: true }).use(devtoolsProvider).mount('#app')
```

The provider will wire the overlay UI and auto-enable in development.

## Planned: overlay panels

- Active queries and mutations
- Route chain and navigation history
- Signal dependency hints (dev-only)

## Custom integration

Register custom nodes for app-specific debug targets:

```ts
registerDevtoolsNode({
  type: 'custom',
  id: 'feature-flags',
  name: 'FeatureFlags',
  getSnapshot: () => flagsStore.value(),
})
```

## See also

- [Bridge API](/docs/packages/devtools/api/bridge)
- [Overview](/docs/packages/devtools/guides/overview)
