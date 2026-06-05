<div align="center">

# @echojs/core

**Minimal UI runtime — components, mount, directives, and DOM utilities.**

[![npm](https://img.shields.io/npm/v/@echojs/core)](https://www.npmjs.com/package/@echojs/core)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/architecture/overview)

</div>

---

Low-level building blocks for EchoJS UI: **`createComponent`**, **`createModel`**, **`createView`**, **`mount`**, and reactive DOM helpers. Re-exports `@echojs/reactivity` for convenience.

Most applications should prefer [`@echojs/hyperdom`](https://www.npmjs.com/package/@echojs/hyperdom) or [`@echojs/framework`](https://www.npmjs.com/package/@echojs/framework). Use `@echojs/core` when you need the component runtime directly.

## Features

- **Model / View split** — `createModel` + `createView` + `createComponent`
- **Direct DOM** — `mount`, `render`, `createElement`, reactive text & props
- **Directives** — `_$if`, `_$switch`, `showDirective`
- **Reactivity re-export** — `signal`, `effect`, `computed`, `batch`

## Install

```bash
npm install @echojs/core @echojs/reactivity
```

## Quick start

```ts
import { createComponent, mount, signal } from "@echojs/core";

const Counter = createComponent(
  () => {
    const $count = signal(0);
    return { $count };
  },
  (vm) => {
    const btn = document.createElement("button");
    btn.onclick = () => vm.$count.update((v) => v + 1);
    btn.textContent = `count: ${vm.$count.value()}`;
    return btn;
  },
);

mount(document.getElementById("app")!, Counter());
```

## API

| Export | Description |
|--------|-------------|
| `createModel` / `createView` / `createComponent` | Component composition |
| `mount` / `unmount` / `render` / `createRoot` | DOM mounting |
| `createElement`, `setProp`, `setProps` | Element helpers |
| `insert`, `createReactiveText` | Reactive DOM updates |
| `signal`, `computed`, `effect`, `batch` | From `@echojs/reactivity` |

## Related packages

| Package | Role |
|---------|------|
| [`@echojs/reactivity`](https://www.npmjs.com/package/@echojs/reactivity) | Required peer-style dependency |
| [`@echojs/hyperdom`](https://www.npmjs.com/package/@echojs/hyperdom) | Higher-level `h()` DSL and views |

## Documentation

[echojs.dev/docs/architecture/overview](https://echojs.dev/docs/architecture/overview)
