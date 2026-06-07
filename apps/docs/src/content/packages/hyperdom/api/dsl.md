---
title: DSL Tags
description: Typed element factories — div, button, section, input, and more.
package: '@echojs-ecosystem/hyperdom'
---

# DSL Tags

Each DSL export mirrors `h()` with **typed props** for that intrinsic element.
Imported from the main package entry.

```ts
import {
  div,
  button,
  span,
  section,
  article,
  nav,
  h1,
  h2,
  h3,
  p,
  form,
  input,
  textarea,
  select,
  ul,
  ol,
  li,
  table,
  img,
  svg,
  // ...
} from '@echojs-ecosystem/hyperdom'
```

## Call shapes

Vue-like overloads per tag:

```ts
div()
div({ id: 'app' })
div('text only')
div({ class: 'x' }, 'child')
div({ class: 'x' }, childA, childB)
div(childA, childB)
```

## Categories

| Group    | Tags                                                                                |
| -------- | ----------------------------------------------------------------------------------- |
| Headings | `h1`–`h6`                                                                           |
| Text     | `p`, `span`, `strong`, `em`, `code`, `pre`, `blockquote`, `small`, `kbd`            |
| Layout   | `div`, `header`, `main`, `footer`, `nav`, `section`, `article`, `aside`, `hr`, `br` |
| Lists    | `ul`, `ol`, `li`, `dl`, `dt`, `dd`                                                  |
| Forms    | `form`, `label`, `input`, `textarea`, `select`, `option`, `button`                  |
| Media    | `img`, `picture`, `source`, `video`, `audio`, `svg`                                 |
| Tables   | `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`                     |

## Typed events

`onClick`, `onInput`, etc. infer `currentTarget` from the tag:

```ts
button({ onClick: (e) => e.currentTarget.disabled })
input({ onInput: (e) => console.log(e.currentTarget.value) })
```

## See also

- [Guides: Views & DSL](/docs/packages/hyperdom/guides/views-and-dsl)
- [h](/docs/packages/hyperdom/api/h)
- [Types: Props](/docs/packages/hyperdom/api/types)
