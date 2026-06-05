---
title: API Reference
description: Public API for @echojs/hyperdom — render, h, DSL, controls, models, views.
package: "@echojs/hyperdom"
---

# API Reference

## Package entry `@echojs/hyperdom`

```ts
import {
  h,
  render,
  mount,
  createView,
  createModel,
  createComponent,
  Show,
  List,
  setStrictContextChecks,
  getStrictContextChecks,
  isInViewContext,
  isInModelContext,
  cx,
  on,
  aria,
  data,
  // DSL tags: div, button, span, section, input, ...
} from "@echojs/hyperdom";

import type { Child, Props, Component } from "@echojs/hyperdom";
```

Subpath:

```ts
import { mount } from "@echojs/hyperdom/lifecycle/mount";
```

(`mount` from main entry = app `render()` helper in `mount.ts`; lifecycle `mount` = on-mount child hook.)

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
  | (() => Child);
```

## `h(tag, props?, children?, ...rest)`

| `tag` | Behavior |
| --- | --- |
| string | Intrinsic element (`"div"`, `"button"`, SVG tags, …) |
| `Component` | Call function `(props) => Child` |

Convenience: `h("div", "text")` when second arg is not a props object.

Throws if `setStrictContextChecks(true)` and called outside view/render scope.

## `render(view, container)`

Returns `dispose(): void`.

- Clears `container` (`textContent = ""`)
- Mounts `view` under a cleanup scope
- Activates reactive bindings in the tree

## DSL tags

Each export (`div`, `button`, `nav`, …) mirrors `h` with typed element props.

Also exported: `h1`–`h6`, `p`, `form`, `input`, `table`, semantic sections, media tags, etc.

## `Show(condition, then, else?)`

| Param | Type |
| --- | --- |
| `condition` | `() => boolean` |
| `then` | `() => Child` |
| `else` | optional `() => Child` |

Returns `() => Child` (dynamic region).

## `List(source, renderItem)`

| Param | Type |
| --- | --- |
| `source` | `{ value(): readonly T[] }` or `() => readonly T[]` |
| `renderItem` | `(item: T, index: () => number) => Child` |

Returns `() => Child`.

## `createView(viewFn, name)`

Returns `(vm) => Child` with `displayName`. Runs `viewFn` inside view context.

## `createModel(factory, name)`

Returns `() => VM` with `displayName`. Sets model context during factory execution.

## `createComponent(modelFactory, viewFn, options?)`

Returns `() => Child` — calls `modelFactory()` then `viewFn(vm)` once per invocation. Optional `options.name` sets `displayName`.

With props, pass the bound factory: `createComponent(createFooModel(props), view)()` (where `createFooModel(props)` returns `() => VM`).

## `createModel` / view guards

| Export | Returns |
| --- | --- |
| `isInModelContext()` | `true` while model factory runs |
| `isInViewContext()` | `true` while view fn runs |

## `setStrictContextChecks(enabled)` / `getStrictContextChecks()`

Toggle strict `h()` / lifecycle guardrails (default **true** in HyperDOM config module).

## `cx(...classValues)`

Join class strings / conditional maps (tailwind-friendly).

## `on` / `aria` / `data`

Small prop bag helpers:

- `on.click(fn)` → `{ onClick: fn }`
- `aria.label("…")`, `aria.expanded(bool)`, …
- `data.testid("…")`

## `Props<E>` (intrinsic elements)

Includes:

- Standard attributes (reactive allowed via `() => value`)
- `class` / `className` — `ClassValue`
- `style` — string or object
- `on*` — typed `currentTarget` per event
- `data-*`, `aria-*`
- `ref?: (el: E | null) => void`
- Modifiers `.propName`, `^attrName`

## `mount` (from `@echojs/hyperdom` index)

**App mount helper** — same as `render` pattern: `mount(view, { container?, className? })` → `{ node, dispose }`.

See `mount.ts` for standalone demos.

## `mount` (from `@echojs/hyperdom/lifecycle/mount`)

Lifecycle child: `mount(() => { …; return cleanup? })` inserted in the tree; runs after DOM insert.

## Errors (common)

| Message | Cause |
| --- | --- |
| `h() called outside of view/render context` | Strict mode + UI built at module scope |
| `mount() called outside of view/render context` | Lifecycle mount not inside a view |
| `cleanup(fn) must be called inside scope()` | Reactivity cleanup misuse (see reactivity package) |

## Not in this package

- Virtual DOM / reconciliation
- JSX compiler (planned separately)
- Router (`@echojs/router/hyperdom`)

## Related

- Usage guide — `/docs/packages/hyperdom/usage`
- Overview — `/docs/packages/hyperdom`
