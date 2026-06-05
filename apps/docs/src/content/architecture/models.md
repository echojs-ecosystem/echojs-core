---
title: Models
description: State and behavior with createModel — signals, effects, queries, and view models.
keywords: [createModel, createView, VM, signals]
---

# Models

In EchoJS, a **model** is the place for state and behavior. Views read a **view model (VM)** object and render HyperDOM; they do not own business logic.

## `createModel`

```ts
import { signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";

export type CounterVM = {
  count: () => number;
  increment: () => void;
};

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0);
  return {
    count: () => $count.value(),
    increment: () => $count.update((n) => n + 1),
  };
}, "CounterModel");
```

Always pass a **display name** (second argument) — it appears in debug tooling and error messages.

## Pairing with `createView`

```ts
import { createView, type Child } from "@echojs-ecosystem/hyperdom";
import { button } from "@echojs-ecosystem/hyperdom";

export const CounterView = createView((vm: CounterVM): Child =>
  button({ onClick: vm.increment }, () => String(vm.count())),
  "CounterView",
);
```

Glue with `createComponent` from `@echojs-ecosystem/hyperdom`:

```ts
import { createComponent } from "@echojs-ecosystem/hyperdom";

// No props — callable component
export const Counter = createComponent(createCounterModel, CounterView, { name: "Counter" });
// route: view: () => Counter()

// With props — bind model factory first: createModel(props)
export const DocArticle = (props: DocArticleProps): Child =>
  createComponent(createDocArticleModel(props), DocArticleView, { name: "DocArticle" })();
```

## VM design guidelines

| Do | Don’t |
| --- | --- |
| Expose read accessors (`count: () => number`) or signals for views | Pass raw DOM nodes through the VM |
| Run `effect()` for side effects (SEO, subscriptions) | Call `fetch` directly inside `createView` |
| Use `createQuery.with(() => params)` for async data | Duplicate query state in signals manually |
| Keep actions as methods (`increment`, `copy`) | Mutate closed-over variables views cannot see |

### Accessors vs public signals

Home page model (`apps/docs`) keeps `$codeTab` private and exposes `isCodeTabActive(index)` — views stay declarative and tests can target behavior.

Either pattern is valid; prefer **narrow public surfaces** on large VMs.

## Effects and cleanup

Models are the right place for `effect()`:

```ts
effect(() => {
  const doc = query.data();
  if (!doc) return;
  applySeo({ title: doc.frontmatter.title, path: "..." });
});
```

HyperDOM `createModel` runs inside a cleanup scope; effects registered there dispose when the model region unmounts.

## Queries in models

```ts
const docContentQuery = createQuery({
  name: "doc-content",
  queryKey: ({ contentId }) => ["doc-content", contentId] as const,
  queryFn: async ({ params }) => parseMarkdown(await loadContentRaw(params.contentId)),
});

export const createDocArticleModel = (props: DocArticleProps) =>
  createModel((): DocArticleVM => {
    const query = docContentQuery.with(() => ({ contentId: props.contentId }));
    return { props, query };
  }, "DocArticleModel");
```

Views use `query.isPending()`, `query.data()`, `query.error()` — no manual loading flags.

## Props and model lifetime

`createComponent(model, view)()` invokes the model factory **once per call**. For props that change per navigation, pass a **fresh** factory each time: `createComponent(createDocArticleModel(props), view)()` so each `contentId` gets a new model instance.

> [!NOTE]
> If props change but the same model instance is reused, stale state can leak between doc pages — always match lifetime to route params.

## Where models live

| Scope | Location |
| --- | --- |
| Single page | `pages/<name>/model/` |
| Reusable widget | `widgets/<name>/model/` |
| Feature | `features/<name>/model/` |

Do not import models from `pages/` into other pages — lift shared logic to `features/` or `core/`.

## Related

- Model & View (agents) — `/docs/agents/model-and-view`
- State overview — `/docs/state/overview`
- Data fetching guide — `/docs/guides/data-fetching`
