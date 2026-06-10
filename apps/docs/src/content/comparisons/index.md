---
title: Framework Comparisons
description:
  In-depth comparisons between EchoJS and mainstream frameworks — reactivity,
  architecture, state, and ecosystem.
keywords: compare, react, vue, angular, solid, svelte, signals, ecosystem
---

# Framework Comparisons

EchoJS solves the same product problems as React, Vue, Angular, Solid, and
Svelte — with a **signal-first runtime**, **strict feature-first architecture**,
and an **integrated package ecosystem** instead of a pick-and-compose toolchain.

Use these guides when you evaluate a migration or design a greenfield app with
explicit boundaries.

:::framework-comparison

## Ecosystem map (who owns what)

| Concern             | EchoJS                        | React                         | Vue                            | Angular             | Solid                       | Svelte           |
| ------------------- | ----------------------------- | ----------------------------- | ------------------------------ | ------------------- | --------------------------- | ---------------- |
| Routing             | `@echojs-ecosystem/router`    | React Router, TanStack Router | Vue Router                     | `@angular/router`   | `@solidjs/router`           | SvelteKit        |
| Async data          | `@echojs-ecosystem/async`     | TanStack Query, SWR           | Pinia + fetch / TanStack Query | HttpClient + RxJS   | `createResource` / TanStack | load + stores    |
| Global client state | `@echojs-ecosystem/store`     | Redux, Zustand, Jotai         | Pinia                          | NgRx, signals       | stores, context             | runes / writable |
| URL search params   | `@echojs-ecosystem/url-state` | router + ad hoc               | `useRoute` query               | `ActivatedRoute`    | router search               | `$page.url`      |
| Persistence         | `@echojs-ecosystem/persist`   | redux-persist, custom         | pinia-plugin-persistedstate    | custom              | localStorage                | localStorage     |
| UI kit              | `@echojs-ecosystem/ui`        | MUI, shadcn, Chakra           | Vuetify, PrimeVue              | Material, CDK       | solid-ui, Kobalte           | Skeleton, Melt   |
| i18n                | `@echojs-ecosystem/i18n`      | react-i18next                 | vue-i18n                       | `@angular/localize` | solid-i18n                  | svelte-i18n      |
| App shell           | `@echojs-ecosystem/framework` | Next, Remix, Vite SPA         | Nuxt, Vite SPA                 | Angular CLI         | SolidStart, Vite            | SvelteKit        |

## What every comparison covers

1. **Reactivity** — how updates propagate and what work runs on each change.
2. **Architecture** — folder conventions and allowed dependency direction.
3. **State** — local UI, server/async, URL, forms, app-wide client.
4. **Ecosystem** — in-box vs assemble-yourself.
5. **Fit** — when to stay on the incumbent stack vs adopt EchoJS.

## Related

- [Why EchoJS](/docs/introduction/what-is-echojs#why-echojs)
- [Architecture overview](/docs/architecture/overview)
- [State overview](/docs/state/overview)
