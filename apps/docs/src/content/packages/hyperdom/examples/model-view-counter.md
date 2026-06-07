---
title: Model + View Counter
description:
  createModel, createView, createComponent, Show, and List in the example app.
package: '@echojs-ecosystem/hyperdom'
---

# Model + View Counter

EchoJS convention: signals in the model, presentation in the view,
`createComponent` for the route.

## Problem

Structure a feature with reusable model/view boundaries and compose `Show` +
`List` in the view.

## Component glue

```ts
import { createComponent } from '@echojs-ecosystem/hyperdom'
import {
  createCounterModel,
  CounterView,
} from '@features/reactivity-counter/index.js'

export const Counter = createComponent(createCounterModel, CounterView, {
  name: 'Counter',
})

// page route: view: () => Counter()
```

## View

```ts
import {
  createView,
  Show,
  List,
  article,
  span,
  p,
} from '@echojs-ecosystem/hyperdom'

export const CounterView = createView(
  (vm) =>
    article(null, [
      List(vm.$items, (item) => span(null, item)),
      Show(
        () => vm.$count.value() > 0,
        () => p(null, 'Positive')
      ),
    ]),
  'CounterView'
)
```

`createView` / `createModel` names enable **strict context checks** in dev.

## Takeaways

- `List(vm.$items, …)` accepts a signal with `.value()`
- `Show` returns a dynamic child — use directly in the children array
- `displayName` on model/view aids debugging

## Live source

`apps/example/src/features/reactivity-counter/`

## Related

- [Guides: Models & Components](/docs/packages/hyperdom/guides/models-and-components)
- [Guides: Show & List](/docs/packages/hyperdom/guides/show-and-list)
- [API: createComponent](/docs/packages/hyperdom/api/create-component)
