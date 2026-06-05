---
title: Usage
description: Build UIs with h, DSL tags, reactive children, Show, List, createView, and createModel.
package: "@echojs-ecosystem/hyperdom"
---

# Usage

HyperDOM turns a **view tree** into real DOM nodes. Dynamic parts are functions or reactive props backed by `@echojs-ecosystem/reactivity`.

## Two styles: `h` and DSL

Low-level hyperscript:

```ts
import { h } from "@echojs-ecosystem/hyperdom";

h("button", { class: "btn", onClick: () => {} }, "Save");
h("div", null, ["Hello", () => dynamicPiece()]);
```

Ergonomic tags (same runtime, better inference):

```ts
import { div, button, span } from "@echojs-ecosystem/hyperdom";

div({ class: "card" }, [
  button({ type: "button", onClick: save }, "Save"),
  span(null, () => statusText()),
]);
```

### Call shapes (Vue-like)

```ts
div();
div({ id: "app" });
div("text only");
div({ class: "x" }, "child");
div({ class: "x" }, childA, childB);
div(childA, childB); // no props object
```

## Components as functions

Any function `(props) => Child` can be a tag:

```ts
const Card = (props: { title: string; children?: Child }): Child =>
  section({ class: "card" }, [h2(null, props.title), props.children ?? null]);

div(null, [Card({ title: "Docs", children: p(null, "…") })]);
```

## Reactive children

A **function child** `() => Child` creates a dynamic region — HyperDOM re-runs it when signals read inside change:

```ts
import { signal } from "@echojs-ecosystem/reactivity";

const $open = signal(false);

div(null, [
  button({ onClick: () => $open.update((v) => !v) }, "Toggle"),
  () => ($open.value() ? panel() : null),
]);
```

Primitives `true` / `false` / `null` / `undefined` render nothing.

## Reactive props

Props can be values or getters:

```ts
button({
  class: () => ($active.value() ? "btn btn--on" : "btn"),
  disabled: () => $pending.value(),
  onClick: submit,
}, "Submit");
```

Function props (except `ref`) register effects and update the DOM when dependencies change.

## Events

Use `onClick`, `onInput`, `onChange`, … — mapped to DOM event names with cleanup on unmount:

```ts
input({
  value: () => $query.value(),
  onInput: (e) => $query.set((e.currentTarget as HTMLInputElement).value),
});
```

Helpers:

```ts
import { on } from "@echojs-ecosystem/hyperdom";

button({ ...on.click(() => {}) }, "Click");
```

## `Show` — conditional UI

```ts
import { Show } from "@echojs-ecosystem/hyperdom";

Show(
  () => $loggedIn.value(),
  () => dashboard(),
  () => loginForm(),
);
```

Returns a dynamic child — omit the third argument for no fallback.

## `List` — collections

```ts
import { List } from "@echojs-ecosystem/hyperdom";
import { signal } from "@echojs-ecosystem/reactivity";

const $items = signal(["Todo", "Done"]);

ul(null, List($items, (label, index) => li(null, () => `${index()}: ${label}`)));
```

Source can be a **signal of array** or `() => readonly T[]`.

> [!NOTE]
> Current `List` re-renders the full list when the array reference or contents trigger an update. Keyed diff optimization is planned.

## `render` and teardown

```ts
import { render } from "@echojs-ecosystem/hyperdom";

const dispose = render(appView, document.getElementById("app")!);
// later: dispose() — removes listeners, effects, DOM
```

`render` clears the container before mount.

## `createView` and `createModel`

EchoJS convention — not required by the runtime, but enforced in docs/example apps:

```ts
export const CounterView = createView((vm: CounterVM): Child =>
  button({ onClick: vm.increment }, () => String(vm.count())),
  "CounterView",
);

export const createCounterModel = createModel((): CounterVM => {
  /* signals, effects */
}, "CounterModel");
```

`createView` wraps execution in **view context** (for strict `h()` checks). `createModel` marks **model context** for debugging.

Glue:

```ts
import { createComponent } from "@echojs-ecosystem/hyperdom";

const Counter = createComponent(createCounterModel, CounterView);
```

Or app-level `bindModelView` (see Architecture → Models).

## `ref` — DOM access

```ts
nav({
  ref: (el) => {
    if (el) el.scrollTop = savedScroll;
    else persistScroll();
  },
}, children);
```

`ref(null)` runs on cleanup when the node is removed.

## Classes and styles

```ts
import { cx } from "@echojs-ecosystem/hyperdom";

span({
  class: () => cx("badge", $active.value() && "badge--on"),
  style: { color: "var(--fg)" },
}, "Echo");
```

`class` accepts strings, arrays, or `{ "token": boolean }` maps.

## Prop modifiers

| Syntax | Meaning |
| --- | --- |
| `.value` | Set DOM **property** |
| `^href` | Force **attribute** even if a property exists |

## `innerHTML` and trusted HTML

Use only for sanitized content (e.g. Shiki output in docs):

```ts
div({ ".innerHTML": trustedHtml });
```

Prefer structured `Child` trees for app UI.

## Lifecycle `mount` child

Register after-insert hooks inside a view tree:

```ts
import { mount } from "@echojs-ecosystem/hyperdom/lifecycle/mount";

div(null, [
  mount(() => {
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return () => ro.disconnect();
  }),
  content(),
]);
```

Must run while rendering (as a child), not at module top level.

## JSX (future)

HyperDOM is designed so a future JSX compiler can target `h()` / `Show` / `List`. Today EchoJS docs and apps use TypeScript + DSL tags.

## Related

- API reference — `/docs/packages/hyperdom/api`
- Model & View — `/docs/agents/model-and-view`
- Reactivity — `/docs/packages/reactivity`
