---
title: Framework Comparisons
description: In-depth comparisons between EchoJS and mainstream frameworks — reactivity, architecture, state, and ecosystem.
keywords: compare, react, vue, angular, solid, svelte, signals, ecosystem
---

# Framework Comparisons

EchoJS solves the same product problems as React, Vue, Angular, Solid, and Svelte — with a **signal-first runtime**, **strict feature-first architecture**, and an **integrated package ecosystem** instead of a pick-and-compose toolchain.

Use these guides when you evaluate a migration or design a greenfield app with explicit boundaries.

## Reactivity at a glance

| Framework | Update model | Granularity | Virtual DOM? | Typical mental model |
| --- | --- | --- | --- | --- |
| **EchoJS** | Signals → targeted DOM writes | Fine-grained | No | `signal` / `computed` / `effect` + HyperDOM |
| **React** | Re-render → reconcile | Component tree | Yes (core) | `useState` + hooks + memo |
| **Vue 3** | Proxy reactivity → render effect | Component + deep tracking | Optional (compiler often skips much) | `ref` / `reactive` + SFC |
| **Angular** | Zone or signals (v19+) → CD | Component (default) / signal (new) | No (incremental DOM) | Services + RxJS + signals migration |
| **Solid** | Signals → direct DOM | Fine-grained | No | `createSignal` + JSX primitives |
| **Svelte** | Compile-time + `$.state` (v5) | Fine-grained (runes) | No | Runes / stores / `.svelte` files |

EchoJS and **Solid** are closest in *rendering philosophy* (no VDOM diff). EchoJS adds **enforced feature-first layout** and **first-party router/query/store** as one platform. **Vue** and **Svelte** ship more in the core framework; **React** and **Angular** rely on larger external ecosystems.

## Guides

| Guide | Focus |
| --- | --- |
| [EchoJS vs React + ecosystem](/docs/comparisons/react) | **Full guide:** hooks, React 19, Next/RSC, Redux/Query/Apollo, routing, forms, SSR, migration |
| [EchoJS vs Vue + ecosystem](/docs/comparisons/vue) | **Full guide:** Composition API, Pinia, Nuxt, VueUse, SFC → HyperDOM, migration |
| [EchoJS vs Angular](/docs/comparisons/angular) | **Full guide:** Zone/signals, NgRx, HttpClient, Material, SSR, DI, migration |
| [EchoJS vs Solid](/docs/comparisons/solid) | **Full guide:** JSX, SolidStart, createResource, stores, migration |
| [EchoJS vs Svelte](/docs/comparisons/svelte) | **Full guide:** runes, SvelteKit, load/actions, stores, SSR, migration |

## Ecosystem map (who owns what)

| Concern | EchoJS | React | Vue | Angular | Solid | Svelte |
| --- | --- | --- | --- | --- | --- | --- |
| Routing | `@echojs/router` | React Router, TanStack Router | Vue Router | `@angular/router` | `@solidjs/router` | SvelteKit |
| Async data | `@echojs/query` | TanStack Query, SWR | Pinia + fetch / TanStack Query | HttpClient + RxJS | `createResource` / TanStack | load + stores |
| Global client state | `@echojs/store` | Redux, Zustand, Jotai | Pinia | NgRx, signals | stores, context | runes / writable |
| URL search params | `@echojs/url-state` | router + ad hoc | `useRoute` query | `ActivatedRoute` | router search | `$page.url` |
| Persistence | `@echojs/persist` | redux-persist, custom | pinia-plugin-persistedstate | custom | localStorage | localStorage |
| UI kit | `@echojs/ui` | MUI, shadcn, Chakra | Vuetify, PrimeVue | Material, CDK | solid-ui, Kobalte | Skeleton, Melt |
| i18n | `@echojs/i18n` | react-i18next | vue-i18n | `@angular/localize` | solid-i18n | svelte-i18n |
| App shell | `@echojs/framework` | Next, Remix, Vite SPA | Nuxt, Vite SPA | Angular CLI | SolidStart, Vite | SvelteKit |

## What every comparison covers

1. **Reactivity** — how updates propagate and what work runs on each change.
2. **Architecture** — folder conventions and allowed dependency direction.
3. **State** — local UI, server/async, URL, forms, app-wide client.
4. **Ecosystem** — in-box vs assemble-yourself.
5. **Fit** — when to stay on the incumbent stack vs adopt EchoJS.

> [!TIP]
> For a quick matrix on the landing page, see [Compare on the home page](/).

## Related

- [Why EchoJS](/docs/introduction/why-echojs)
- [Architecture overview](/docs/architecture/overview)
- [State overview](/docs/state/overview)
