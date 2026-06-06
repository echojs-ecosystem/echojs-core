---
title: Examples
description: Practical @echojs-ecosystem/hyperdom patterns — counter, model+view, Show, List, docs article.
package: "@echojs-ecosystem/hyperdom"
---

# Examples

Focused, copy-paste patterns for real UI problems. Each example shows **view code** and, where relevant, **model glue** using EchoJS conventions.

> [!tip]
> Try the interactive lab in the [Playground](/docs/packages/hyperdom/playground).

## Pick an example

| Example | Teaches |
| --- | --- |
| [Counter](/docs/packages/hyperdom/examples/counter) | Minimal `render()` + reactive child |
| [Model + View Counter](/docs/packages/hyperdom/examples/model-view-counter) | `createModel`, `createView`, `createComponent` |
| [Conditional UI](/docs/packages/hyperdom/examples/conditional-ui) | `Show` for login/dashboard toggle |
| [Todo List](/docs/packages/hyperdom/examples/todo-list) | `List` over a signal array |
| [Doc Article](/docs/packages/hyperdom/examples/doc-article) | Props-bound component in the docs site |
| [Lifecycle Mount](/docs/packages/hyperdom/examples/lifecycle-resize) | `ResizeObserver` with cleanup |

## Shared component pattern

EchoJS features typically export a bound component:

```ts
export const Feature = createComponent(createFeatureModel, FeatureView, {
  name: "Feature",
});

// page route: view: () => Feature()
```

With props:

```ts
export const Feature = (props: Props) =>
  createComponent(createFeatureModel(props), FeatureView)();
```

## Live source in the repo

| Resource | Path |
| --- | --- |
| Counter + List + Show | `apps/example/src/features/reactivity-counter/` |
| Docs pages | `apps/docs/src/pages/doc/` |

## Related

- [Guides & Concepts](/docs/packages/hyperdom/guides/important-defaults)
- [API Reference](/docs/packages/hyperdom/api)
- [Reactivity Examples](/docs/packages/reactivity/example)
