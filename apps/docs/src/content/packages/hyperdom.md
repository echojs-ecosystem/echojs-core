---
title: HyperDOM
description: Direct DOM rendering with views, models, and reactive children.
package: '@echojs-ecosystem/hyperdom'
keywords: [hyperdom, createView, createModel, h, Show]
---

:::package-overview hyperdom

:::install @echojs-ecosystem/hyperdom

## Key APIs

| Export | Role |
| ------ | ---- |
| [`createView`](/docs/packages/hyperdom/api/create-view) | Pure render function — receives VM props, returns DOM tree |
| [`createModel`](/docs/packages/hyperdom/api/create-model) | Stateful logic factory with signals and lifecycle |
| [`createComponent`](/docs/packages/hyperdom/api/create-component) | Wire model + view into a reusable component |
| [`Show`](/docs/packages/hyperdom/api/show) | Conditional child — tracks reactive predicate |
| [`List`](/docs/packages/hyperdom/api/list) | Keyed lists without virtual DOM diffing |
| [`render`](/docs/packages/hyperdom/api/render) | Mount a tree into a DOM target |

## Common patterns

- **FSD slice** — `model/*.model.ts` owns state; `ui/*.view.ts` renders; page
  wires them with `createComponent`.
- **Reactive children** — pass `() => value` for text and props that should
  update when signals change.
- **No JSX required** — use `h`, `div`, `button` DSL tags or `h()` for custom
  elements.

> [!tip] HyperDOM reads signals during render — you rarely call `effect` in views.
> See [Important Defaults](/docs/packages/hyperdom/guides/important-defaults).

## Documentation map

| Section | Description |
| ------- | ----------- |
| [Installation](/docs/packages/hyperdom/installation) | Package install |
| [Functions](/docs/packages/hyperdom/functions) | Full index by category |
| [Guides & Concepts](/docs/packages/hyperdom/guides/important-defaults) | Views, DSL, reactivity |

Each API page: **Usage** → **Type Declarations** → **API** (see [createView](/docs/packages/hyperdom/api/create-view)).
