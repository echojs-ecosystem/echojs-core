---
title: h
description: h(tag, props?, children?) — hyperscript for intrinsic elements and components.
package: "@echojs-ecosystem/hyperdom"
---

# h

```ts
function h(tag: string, props?: Props | null, children?: Child, ...rest: Child[]): Child
function h<P>(component: Component<P>, props?: P & { children?: Child }, children?: Child, ...rest: Child[]): Child
```

Low-level hyperscript. DSL tags (`div`, `button`, …) delegate to `h` internally.

## Tag behavior

| `tag` | Behavior |
| --- | --- |
| string | Intrinsic element (`"div"`, `"button"`, SVG tags, …) |
| `Component` | Call `(props) => Child` |

## Convenience overload

When the second argument is not a props object, it is treated as a child:

```ts
h("div", "text only");
h("div", childA, childB);
```

## Strict context

Throws if `setStrictContextChecks(true)` and called outside view/render scope:

```
hyperdom: h() called outside of view/render context
```

Wrap UI in `createView` or pass to `render()`. See [Strict Context](/docs/packages/hyperdom/api/strict-context).

## Example

```ts
import { h } from "@echojs-ecosystem/hyperdom";

h("button", { class: "btn", onClick: save }, "Save");
h("div", null, ["Hello", () => dynamicPiece()]);
```

## See also

- [Guides: Views & DSL](/docs/packages/hyperdom/guides/views-and-dsl)
- [DSL Tags](/docs/packages/hyperdom/api/dsl)
