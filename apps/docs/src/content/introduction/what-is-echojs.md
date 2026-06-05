---
title: What is EchoJS
description: Signal-first framework for scalable web applications.
keywords: [echojs, signals, hyperdom, framework, spa]
---

# What is EchoJS

EchoJS is a **signal-first** frontend platform for building fast, documented, and maintainable web applications. It combines fine-grained reactivity, direct DOM rendering, typed routing, and a provider-based app shell — without a virtual DOM.

## The stack in one sentence

**Reactivity** holds state, **HyperDOM** renders it, **Framework** boots the app, and optional packages (**Router**, **Query**, **Store**, **UI**, …) cover everything else.

## Core ideas

### Signals drive the UI

State lives in `@echojs-ecosystem/reactivity`. Views read `signal.value()` (or computed/effects) and update only what depends on that state.

```ts
import { signal } from "@echojs-ecosystem/reactivity";

const count = signal(0);
count.set(1);
```

@echojs-ecosystem/reactivity

### HyperDOM renders to the DOM

`@echojs-ecosystem/hyperdom` exposes `div`, `button`, `createView`, `createModel`, and control helpers (`Show`, `List`). There is **no reconciliation step** over a virtual tree.

```ts
import { button, div } from "@echojs-ecosystem/hyperdom";

div(null, [
  button({ onClick: () => count.update((n) => n + 1) }, () => String(count.value())),
]);
```

@echojs-ecosystem/hyperdom

### Apps compose through providers

`createEchoApp()` from `@echojs-ecosystem/framework` registers router, query, UI, and other services once, then mounts a single root view.

```ts
import { createEchoApp } from "@echojs-ecosystem/framework/app";

createEchoApp({ strictContextChecks: true })
  .use(routerProvider)
  .mount("#app");
```

@echojs-ecosystem/framework

> [!NOTE]
> EchoJS documentation and the `apps/example` lab are real apps built with the same patterns — not a separate demo framework.

## What is in the box

| Area | Package |
| --- | --- |
| Routing & `NavLink` | `@echojs-ecosystem/router` |
| Server/async data | `@echojs-ecosystem/query` |
| Client store | `@echojs-ecosystem/store` |
| URL-bound state | `@echojs-ecosystem/url-state` |
| Local persistence | `@echojs-ecosystem/persist` |
| Components & theme | `@echojs-ecosystem/ui` |
| Translations | `@echojs-ecosystem/i18n` |

Browse the **Packages** section in the sidebar for per-package installation and API pages.

## How to read these docs

1. **Introduction** — motivation and principles (you are here)
2. **Getting Started** — install, bootstrap, folder layout
3. **Architecture** — feature-first rules and providers
4. **Guides** — task-oriented recipes
5. **Examples** — end-to-end scenarios
6. **For agents** — conventions for contributors and AI tools
