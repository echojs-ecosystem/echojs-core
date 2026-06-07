---
title: Types
description: Child, Props, Component, and supporting type aliases.
package: '@echojs-ecosystem/hyperdom'
---

# Types

```ts
import type { Child, Props, Component } from '@echojs-ecosystem/hyperdom'
```

## `Child`

```ts
type Child =
  | string
  | number
  | boolean
  | null
  | undefined
  | Node
  | Child[]
  | (() => Child)
```

Anything that can appear in a view tree. Function form `() => Child` creates a
**dynamic region**.

`true`, `false`, `null`, `undefined` render nothing.

## `Component`

```ts
type Component<P = any> = (props: P & { children?: Child }) => Child
```

Function components receive props plus optional `children`.

## `Props<E>`

Intrinsic element props for element type `E`:

| Category              | Members                                                |
| --------------------- | ------------------------------------------------------ |
| Attributes            | Standard DOM attributes — reactive via `() => value`   |
| `class` / `className` | `ClassValue` — string, array, map, getter              |
| `style`               | String or `StyleObject`                                |
| `on*`                 | Typed `currentTarget` per event                        |
| `data-*`, `aria-*`    | Reactive primitives allowed                            |
| `ref`                 | `(el: E \| null) => void`                              |
| Modifiers             | `.propName` (property), `^attrName` (forced attribute) |

## Supporting aliases

```ts
type MaybeReactive<T> = T | (() => T);
type ClassValue = string | null | undefined | false | ClassObject | readonly ClassValue[];
type StyleValue = string | StyleObject | null | undefined | false | readonly ...;
```

## See also

- [Guides: Reactive Children](/docs/packages/hyperdom/guides/reactive-children)
- [Guides: Reactive Props](/docs/packages/hyperdom/guides/reactive-props)
- [Guides: Styling & Classes](/docs/packages/hyperdom/guides/styling-and-classes)
