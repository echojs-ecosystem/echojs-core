---
title: Examples
description:
  Practical @echojs-ecosystem/reactivity patterns — counter, computed, batch,
  todos, scope, cart.
package: '@echojs-ecosystem/reactivity'
---

# Examples

Focused, copy-paste patterns for real UI problems. Each example shows **model
code first**, then how HyperDOM reads reactive state.

> [!tip] Run the interactive lab in the EchoJS example app at
> `/docs/reactivity`, or try the
> [Playground](/docs/packages/reactivity/playground).

## Pick an example

| Example                                                                 | Teaches                                            |
| ----------------------------------------------------------------------- | -------------------------------------------------- |
| [Counter](/docs/packages/reactivity/examples/counter)                   | Writable `signal`, actions, reactive view children |
| [Derived Greeting](/docs/packages/reactivity/examples/derived-greeting) | Chained `computed`, derived strings                |
| [Batch Updates](/docs/packages/reactivity/examples/batch-updates)       | One notification for multiple writes               |
| [Todo List](/docs/packages/reactivity/examples/todo-list)               | Immutable list updates in a signal                 |
| [Scope & Timer](/docs/packages/reactivity/examples/scope-timer)         | `scope`, `effect`, `cleanup` for intervals         |
| [Shopping Cart](/docs/packages/reactivity/examples/shopping-cart)       | `computed` totals over object collections          |

## Shared model pattern

All examples use `createModel` from HyperDOM — signals live inside the factory,
actions mutate them, views read via `.value()` in reactive children:

```ts
export const createFeatureModel = createModel((): FeatureVM => {
  const $state = signal(initial)
  return {
    /* readonly accessors + actions */
  }
}, 'FeatureModel')
```

See
[HyperDOM Integration](/docs/packages/reactivity/guides/hyperdom-integration)
for why views rarely call `effect()` directly.

## Related

- [Guides & Concepts](/docs/packages/reactivity/guides/important-defaults)
- [Functions](/docs/packages/reactivity/functions)
