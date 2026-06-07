---
title: App Exports
description: Root barrel @echojs-ecosystem/framework re-exports.
package: '@echojs-ecosystem/framework'
---

# App Exports

Root barrel `@echojs-ecosystem/framework` re-exports sub-packages for
convenience. Size-sensitive apps may import narrowly.

| Module                                                 | Re-exports         |
| ------------------------------------------------------ | ------------------ |
| `hyperdom`                                             | HyperDOM surface   |
| `reactivity`                                           | Signals            |
| `router` / `router-hyperdom`                           | Router             |
| `query`, `store`, `persist`, `url-state`, `ui`, `form` | Ecosystem packages |

Prefer **`@echojs-ecosystem/framework/app`** in bootstrap; import feature
packages directly in features.

```ts
// bootstrap
import { createEchoApp } from '@echojs-ecosystem/framework/app'

// features — direct or via barrel
import { signal } from '@echojs-ecosystem/reactivity'
import { signal as $s } from '@echojs-ecosystem/framework/reactivity' // same API
```

## Related

- [Subpath Imports guide](/docs/packages/framework/guides/subpath-imports)
