---
title: Installation
description:
  Install @echojs-ecosystem/hyperdom with @echojs-ecosystem/reactivity.
package: '@echojs-ecosystem/hyperdom'
---

# Installation

HyperDOM is the **view layer** of EchoJS. It depends on
`@echojs-ecosystem/reactivity` for dynamic regions and reactive props.

## Import paths

| Path                                   | When to use                                                               |
| -------------------------------------- | ------------------------------------------------------------------------- |
| `@echojs-ecosystem/hyperdom`           | À la carte install — explicit dependency in `package.json`                |
| `@echojs-ecosystem/framework/hyperdom` | You already use the framework meta-package — one install, subpath imports |

```ts
// Standalone package
import { render, div, createView } from '@echojs-ecosystem/hyperdom'

// Same API via framework subpath
import { render, div, createView } from '@echojs-ecosystem/framework/hyperdom'
```

> [!tip] Pick **one style per app** and stay consistent. Mixing both paths works
> at runtime but clutters dependency graphs.

## Quick install

Standalone:

:::install @echojs-ecosystem/hyperdom

Reactivity is required for reactive children and props:

:::install @echojs-ecosystem/reactivity

Or install the full framework once (includes HyperDOM and reactivity):

:::install @echojs-ecosystem/framework

> [!tip] In EchoJS apps you usually install **framework** + **router** at the
> root; HyperDOM is still imported directly in views and widgets.

## Requirements

| Requirement                        | Notes                                               |
| ---------------------------------- | --------------------------------------------------- |
| **`@echojs-ecosystem/reactivity`** | Required peer-style dependency — install explicitly |
| **ESM bundler**                    | Vite, Bun, webpack with ESM output                  |
| **TypeScript** 5.x                 | Typed DSL tags and element props                    |

## Verify the import

```ts
import { render, div, button } from '@echojs-ecosystem/hyperdom'
// or: from "@echojs-ecosystem/framework/hyperdom"
import { signal } from '@echojs-ecosystem/reactivity'

const $n = signal(0)

const dispose = render(
  div(null, [
    button({ onClick: () => $n.update((v) => v + 1) }, () =>
      String($n.value())
    ),
  ]),
  document.getElementById('app')!
)

// dispose() when tearing down
```

## Strict context (recommended)

EchoJS apps enable checks via framework:

```ts
createEchoApp({ strictContextChecks: true })
```

Or manually:

```ts
import { setStrictContextChecks } from '@echojs-ecosystem/hyperdom'

setStrictContextChecks(true)
```

See [Important Defaults](/docs/packages/hyperdom/guides/important-defaults).

## Next steps

- [Important Defaults](/docs/packages/hyperdom/guides/important-defaults) —
  execution model and guardrails
- [Views & DSL](/docs/packages/hyperdom/guides/views-and-dsl) — first UI
  patterns
- [Examples](/docs/packages/hyperdom/example) — copy-paste patterns
- [Playground](/docs/packages/hyperdom/playground) — live demo
