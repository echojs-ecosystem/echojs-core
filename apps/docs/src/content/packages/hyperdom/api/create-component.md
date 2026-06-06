---
title: createComponent
description: createComponent(model, view, options?) — bind model factory and view into a component.
package: "@echojs-ecosystem/hyperdom"
---

# createComponent

```ts
type ModelFactory<VM> = () => VM;
type ViewFn<VM> = (vm: VM) => Child;

type CreateComponentOptions = {
  name?: string;
};

function createComponent<VM>(
  model: ModelFactory<VM>,
  view: ViewFn<VM>,
  options?: CreateComponentOptions,
): () => Child
```

Binds a model factory and view into a callable `() => Child`. Each invocation runs `model()` then `view(vm)`.

## No props

```ts
export const Counter = createComponent(createCounterModel, CounterView, {
  name: "Counter",
});

// route: view: () => Counter()
```

Optional `options.name` sets `displayName` on the returned function.

## With props

Pass a **bound** model factory when props are required:

```ts
export const DocArticle = (props: { contentId: string }) =>
  createComponent(createDocArticleModel(props), DocArticleView, {
    name: "DocArticle",
  })();
```

Here `createDocArticleModel(props)` returns `() => VM`.

## See also

- [Guides: Models & Components](/docs/packages/hyperdom/guides/models-and-components)
- [Examples: Model + View Counter](/docs/packages/hyperdom/examples/model-view-counter)
- [Examples: Doc Article](/docs/packages/hyperdom/examples/doc-article)
