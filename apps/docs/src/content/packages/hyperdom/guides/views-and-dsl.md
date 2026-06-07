---
title: Views & DSL
description: Build view trees with h(), DSL tags, and function components.
package: '@echojs-ecosystem/hyperdom'
---

# Views & DSL

HyperDOM offers two equivalent styles for building UI: low-level **`h()`**
hyperscript and ergonomic **DSL tags** (`div`, `button`, `section`, …). Both
compile to the same runtime.

## Low-level `h()`

```ts
import { h } from '@echojs-ecosystem/hyperdom'

h('button', { class: 'btn', onClick: () => {} }, 'Save')
h('div', null, ['Hello', () => dynamicPiece()])
```

| `tag` argument | Behavior                                             |
| -------------- | ---------------------------------------------------- |
| string         | Intrinsic element (`"div"`, `"button"`, SVG tags, …) |
| `Component`    | Call function `(props) => Child`                     |

Convenience: `h("div", "text")` when the second argument is not a props object.

See [API: h](/docs/packages/hyperdom/api/h).

## DSL tags

Same runtime, better TypeScript inference for element props:

```ts
import { div, button, span } from '@echojs-ecosystem/hyperdom'

div({ class: 'card' }, [
  button({ type: 'button', onClick: save }, 'Save'),
  span(null, () => statusText()),
])
```

Each tag mirrors `h` with typed props for that element. See
[API: DSL Tags](/docs/packages/hyperdom/api/dsl).

## Call shapes (Vue-like)

DSL tags accept flexible argument patterns:

```ts
div()
div({ id: 'app' })
div('text only')
div({ class: 'x' }, 'child')
div({ class: 'x' }, childA, childB)
div(childA, childB) // no props object
```

## Components as functions

Any function `(props) => Child` can be used as a tag or passed to `h`:

```ts
const Card = (props: { title: string; children?: Child }): Child =>
  section({ class: 'card' }, [h2(null, props.title), props.children ?? null])

div(null, [Card({ title: 'Docs', children: p(null, '…') })])
```

For EchoJS apps, prefer `createView` so strict context checks apply. See
[Models & Components](/docs/packages/hyperdom/guides/models-and-components).

## Related

- [Reactive Children](/docs/packages/hyperdom/guides/reactive-children) —
  `() => Child` dynamic regions
- [API: Types](/docs/packages/hyperdom/api/types) — `Child`, `Props`,
  `Component`
