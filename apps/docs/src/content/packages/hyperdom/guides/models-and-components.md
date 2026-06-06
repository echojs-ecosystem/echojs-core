---
title: Models & Components
description: EchoJS createView, createModel, and createComponent patterns.
package: "@echojs-ecosystem/hyperdom"
---

# Models & Components

EchoJS convention separates **state** (models) from **presentation** (views). The runtime does not require these helpers — but docs and example apps use them for strict context checks and consistent structure.

## `createModel`

Runs a factory inside **model context** and returns a callable `() => VM` with `displayName`:

```ts
import { createModel } from "@echojs-ecosystem/hyperdom";
import { signal } from "@echojs-ecosystem/reactivity";

export interface CounterVM {
  $count: Signal<number>;
  increment: () => void;
}

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0);
  return {
    $count,
    increment: () => $count.update((n) => n + 1),
  };
}, "CounterModel");
```

Keep signals inside the factory. Expose accessors and actions on the VM — views should not mutate signals directly.

See [API: createModel](/docs/packages/hyperdom/api/create-model).

## `createView`

Wraps a view function in **view context** so `h()` and lifecycle `mount()` pass strict checks:

```ts
import { createView, button } from "@echojs-ecosystem/hyperdom";

export const CounterView = createView((vm: CounterVM) =>
  button({ onClick: vm.increment }, () => String(vm.$count.value())),
  "CounterView",
);
```

`displayName` helps debugging and devtools. Keep `.view.ts` free of `fetch` — use models + `@echojs-ecosystem/query` for async data.

See [API: createView](/docs/packages/hyperdom/api/create-view).

## `createComponent`

Binds model factory + view into a callable `() => Child`:

```ts
import { createComponent } from "@echojs-ecosystem/hyperdom";

export const Counter = createComponent(createCounterModel, CounterView, {
  name: "Counter",
});

// route page: view: () => Counter()
```

Each invocation calls `modelFactory()` then `viewFn(vm)` once.

### With props

When the model needs props, pass a **bound** factory:

```ts
export const DocArticle = (props: { contentId: string }) =>
  createComponent(createDocArticleModel(props), DocArticleView, {
    name: "DocArticle",
  })();
```

See [API: createComponent](/docs/packages/hyperdom/api/create-component) and [Examples: Doc Article](/docs/packages/hyperdom/examples/doc-article).

## App-level glue

EchoJS apps may also use `bindModelView` from the framework layer. See [Architecture: Models](/docs/architecture/models).

## Context guards

| Export | Returns `true` when |
| --- | --- |
| `isInModelContext()` | Model factory is running |
| `isInViewContext()` | View function is running |

See [API: Strict Context](/docs/packages/hyperdom/api/strict-context).

## Related

- [Reactivity package](/docs/packages/reactivity)
- [Examples: Model + View Counter](/docs/packages/hyperdom/examples/model-view-counter)
