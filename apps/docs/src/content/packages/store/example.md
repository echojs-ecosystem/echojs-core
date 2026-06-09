---
title: Examples
description:
  Practical @echojs-ecosystem/store patterns — theme, counter, views, combine,
  session.
package: '@echojs-ecosystem/store'
---

# Examples

Focused, copy-paste patterns for shared application state. Each example shows
**store definitions first**, then how models and views consume them.

> [!tip] Run the interactive lab in the EchoJS example app at `/docs/state`, or
> try the [Playground](/docs/packages/store/playground).

## Pick an example

| Example                                                            | Teaches                                |
| ------------------------------------------------------------------ | -------------------------------------- |
| [Theme & Counter](/docs/packages/store/examples/theme-and-counter) | `createStore`, `withActions`, `select` |
| [View Reads Store](/docs/packages/store/examples/view-integration) | HyperDOM views and `effect()`          |
| [combine Full Name](/docs/packages/store/examples/combine-names)   | Multi-source derived state             |
| [Session Stores](/docs/packages/store/examples/session-stores)     | Persist extensions for auth            |

## Shared pattern

Stores live at module scope. Views and models import them and call actions —
never raw `set` from UI code:

```ts
export const counterStore = createStore(0, { name: 'counter' }).extend(
  withActions({
    increment: (store) => () => store.update((v) => v + 1),
  })
)
```

See [HyperDOM Integration](/docs/packages/store/guides/hyperdom-integration) for
model vs store boundaries.

## Related

- [Guides & Concepts](/docs/packages/store/guides/creating-stores)
- [Functions](/docs/packages/store/functions)
