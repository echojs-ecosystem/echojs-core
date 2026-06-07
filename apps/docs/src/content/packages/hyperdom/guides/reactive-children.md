---
title: Reactive Children
description:
  Function children create dynamic regions that re-run when signals change.
package: '@echojs-ecosystem/hyperdom'
---

# Reactive Children

A **function child** `() => Child` creates a **dynamic region**. HyperDOM
re-runs it when any signal read inside via `.value()` changes.

## Basic pattern

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { div, button } from '@echojs-ecosystem/hyperdom'

const $open = signal(false)

div(null, [
  button({ onClick: () => $open.update((v) => !v) }, 'Toggle'),
  () => ($open.value() ? panel() : null),
])
```

Only the dynamic region updates when `$open` changes — sibling nodes stay
untouched.

## Displaying signal values

The most common form in views:

```ts
span(null, () => String(vm.$count.value()))
```

The `() => …` wrapper registers an effect. When `$count` changes, only that text
node updates.

## Empty output

Primitives `true`, `false`, `null`, and `undefined` render nothing. Return them
from function children to omit UI without extra wrappers:

```ts
;() => ($visible.value() ? content() : null)
```

## Nested dynamic regions

Function children can return other function children. Each `() => Child`
boundary is its own reactive scope:

```ts
div(null, [() => header(), () => ($loading.value() ? spinner() : body())])
```

## Models own the signals

In EchoJS, signals usually live inside `createModel`. Views read them through
the VM inside reactive children — not by importing signals at module scope.

```ts
export const CounterView = createView(
  (vm) => span(null, () => String(vm.$count.value())),
  'CounterView'
)
```

See
[Reactivity: HyperDOM Integration](/docs/packages/reactivity/guides/hyperdom-integration).

## Related

- [Reactive Props](/docs/packages/hyperdom/guides/reactive-props) — reactive
  attributes
- [Show & List](/docs/packages/hyperdom/guides/show-and-list) — control-flow
  helpers
- [API: Types — Child](/docs/packages/hyperdom/api/types)
