<div align="center">

# @echojs-ecosystem/hyperdom

**Direct DOM rendering — no virtual DOM, no JSX required.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/hyperdom)](https://www.npmjs.com/package/@echojs-ecosystem/hyperdom)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/hyperdom)

</div>

---

The view layer of EchoJS. Maps **views to real DOM nodes** with a hyperscript API (`h`), reactive children, and control helpers (`Show`, `List`). Designed as the foundation for a future JSX compiler.

## Features

- **`h()`** — create elements, components, and reactive regions
- **`createView` / `createModel`** — structured UI with context checks
- **`Show` / `If` / `List`** — conditional and list rendering
- **Reactive props & children** — `() => value` registers effects; only what changed updates
- **`render()` + `dispose()`** — mount with full cleanup (listeners, effects, DOM)

## Install

```bash
npm install @echojs-ecosystem/hyperdom @echojs-ecosystem/reactivity
```

## Quick start

```ts
import { h, render, Show, button, div, span } from "@echojs-ecosystem/hyperdom";
import { signal } from "@echojs-ecosystem/reactivity";

const $count = signal(0);

const view = div({ class: "app" }, [
  button({ onClick: () => $count.update((n) => n + 1) }, "Increment"),
  span(null, () => String($count.value())),
  Show(
    () => $count.value() > 0,
    () => span(null, "Count is positive"),
  ),
]);

const dispose = render(view, document.getElementById("app")!);
// dispose() when unmounting
```

## API

| Export | Description |
|--------|-------------|
| `h`, `div`, `button`, … | Hyperscript & HTML DSL |
| `render(view, container)` | Mount view, return `dispose()` |
| `createView` / `createModel` | View/model factories |
| `createComponent` | Model + view composition |
| `mount` | Mount view tree into a DOM container |
| `Show` | Boolean toggle (`display: none`) |
| `effect` | Model lifecycle — reactive side effects |
| `If(cond, render).IfElse().Else()` | If / else-if / else with explicit conditions |
| `Match().When().Otherwise()` | Pattern matching on objects |

## Package layout

```
src/
  core/           types, config, view-context
  hyperscript/    h()
  dsl/            div, button, span, …
  render/         render(), mount()
  view/           createView
  model/          createModel
  lifecycle/      effect (model), render scopes (cleanup)
  component/      createComponent, createAsyncComponent
  compound/       createCompoundView (slots)
  control/        Show, If, List, Match
  dom/            DOM mount engine (internal)
```

### Reactive patterns

```ts
// Reactive child
h("span", null, () => $count.value());

// Reactive prop
h("input", { value: () => $text.value(), onInput: (e) => $text.set(e.currentTarget.value) });
```

## Related packages

| Package | Role |
|---------|------|
| [`@echojs-ecosystem/reactivity`](https://www.npmjs.com/package/@echojs-ecosystem/reactivity) | Signals for dynamic regions |
| [`@echojs-ecosystem/router`](https://www.npmjs.com/package/@echojs-ecosystem/router) | SPA routing bindings |
| [`@echojs-ecosystem/ui`](https://www.npmjs.com/package/@echojs-ecosystem/ui) | Accessible UI components |

## Documentation

[echojs.dev/docs/packages/hyperdom](https://echojs.dev/docs/packages/hyperdom)
