---
title: EchoJS vs Svelte
description:
  Deep comparison — Svelte 5 runes, compiler, SvelteKit, stores, SSR, and full
  ecosystem mapping to EchoJS.
keywords:
  svelte, sveltekit, runes, compiler, stores, load, server actions, superforms,
  skeleton
---

# EchoJS vs Svelte

**Svelte** shifts work to the **compiler**: `.svelte` files become lean
JavaScript that updates the DOM with **fine-grained** reactions. **Svelte 5
runes** (`$state`, `$derived`, `$effect`) make reactivity explicit in source.
**SvelteKit** adds file-based routing, `load`, server hooks, and adapters.
**EchoJS** uses **runtime signals**, **HyperDOM** views, and a **first-party
platform** (router, query, store, url-state) with **feature-first** boundaries.

This guide is the **Svelte migration reference** — runes vs signals, SvelteKit,
legacy stores, compiler ergonomics, and **library-by-library** mapping.

## Table of contents (on this page)

1. [At a glance](#at-a-glance)
2. [Compiler vs runtime reactivity](#compiler-vs-runtime-reactivity)
3. [Svelte 5 runes vs EchoJS](#svelte-5-runes-vs-echojs)
4. [Legacy stores (Svelte 4)](#legacy-stores-svelte-4)
5. [SFC, templates, and snippets](#sfc-templates-and-snippets)
6. [Architecture & folder structure](#architecture-folder-structure)
7. [State: five kinds + Svelte libraries](#state-five-kinds-svelte-libraries)
8. [Data: load, server, Query](#data-load-server-query)
9. [SvelteKit routing & files](#sveltekit-routing-files)
10. [SSR, adapters, and prerender](#ssr-adapters-and-prerender)
11. [Forms & validation](#forms-validation)
12. [UI libraries & styling](#ui-libraries-styling)
13. [Auth & hooks](#auth-hooks)
14. [Errors, loading, transitions](#errors-loading-transitions)
15. [Performance & bundle](#performance-bundle)
16. [Testing & DevTools](#testing-devtools)
17. [Master ecosystem map](#master-ecosystem-map)
18. [Providers & app shell](#providers-app-shell)
19. [TypeScript & DX](#typescript-dx)
20. [Migration cookbook](#migration-cookbook)
21. [Anti-patterns](#anti-patterns-when-porting-from-svelte)
22. [Decision matrix](#decision-matrix)
23. [FAQ](#faq)
24. [Summary](#summary)

---

## At a glance

| Dimension          | Svelte 5 + SvelteKit            | EchoJS                                         |
| ------------------ | ------------------------------- | ---------------------------------------------- |
| **Reactivity**     | Runes (compiler-instrumented)   | Runtime `signal` / `computed` / `effect`       |
| **VDOM**           | No (compiled updates)           | No (HyperDOM bindings)                         |
| **Authoring**      | `.svelte` SFC                   | `.view.ts` + `.model.ts`                       |
| **Routing**        | File routes (`+page.svelte`)    | `createRoutes` in entities                     |
| **Server data**    | `load`, `+server`, form actions | `@echojs-ecosystem/async`, API routes external |
| **Global client**  | runes modules, stores (legacy)  | `@echojs-ecosystem/store`                      |
| **URL state**      | `$page.url.searchParams`        | `@echojs-ecosystem/url-state`                  |
| **SSR**            | SvelteKit adapters (mature)     | SPA-first today                                |
| **Meta-framework** | SvelteKit                       | `@echojs-ecosystem/framework` + Vite           |
| **Compile step**   | `svelte-check`, Vite plugin     | `tsc` on TS views only                         |

> [!TIP] Closest cousins **Solid** and **Svelte 5** are philosophically near
> Echo (fine-grained, no VDOM). Svelte adds a **compiler**; Echo adds a
> **platform** and **folder law**.

---

## Compiler vs runtime reactivity

### Svelte model

1. Compiler analyzes `.svelte` and runes.
2. Generated code wires **DOM update functions** to reactive sources.
3. On change, only bound DOM nodes update.

Dependencies are **implicit** in source — you do not call `.value()` on runes in
templates.

### Echo model

1. You write explicit `signal` / `computed` / `effect`.
2. HyperDOM subscribes when building reactive children `() => …`.
3. Same fine-grained DOM outcome, **visible dependency graph** in TS.

| Aspect               | Svelte              | EchoJS                 |
| -------------------- | ------------------- | ---------------------- |
| Dependency discovery | compile time        | runtime reads          |
| Refactor safety      | `svelte-check`      | `tsc` + explicit reads |
| Non-SFC tooling      | needs compiler      | plain TS               |
| Bundle               | compile away unused | tree-shake packages    |

Both avoid reconciling a virtual tree.

---

## Svelte 5 runes vs EchoJS

| Svelte 5                 | EchoJS                   | Notes              |
| ------------------------ | ------------------------ | ------------------ |
| `$state(initial)`        | `signal(initial)`        | Writable           |
| `$state.raw(initial)`    | `signal` + no deep track | flat signals       |
| `$state.frozen(initial)` | readonly patterns        | immutable snapshot |
| `$derived(expr)`         | `computed(() => expr)`   | Cached             |
| `$derived.by(() => …)`   | `computed(() => …)`      | Multi-statement    |
| `$effect(() => …)`       | `effect(() => …)`        | Side effects       |
| `$effect.pre(() => …)`   | rare — sync effect       | Before paint       |
| `$props()`               | view props               | Parent passes in   |
| `$bindable()`            | model + two-way handler  | Explicit bind API  |
| `$inspect(…)`            | dev logging in effect    | Debug              |
| `untrack()`              | read without subscribe   | Advanced           |
| `tick()`                 | `batch` / microtask      | After DOM flush    |

```svelte
<!-- Svelte 5 -->
<script lang="ts">
  let count = $state(0);
  let double = $derived(count * 2);
  $effect(() => console.log(double));
</script>

<button onclick={() => count++}>{double}</button>
```

```ts
// EchoJS
const count = signal(0)
const double = computed(() => count.value() * 2)
effect(() => console.log(double.value()))

// view: button onClick -> count.update, child () => String(double.value())
```

### Svelte 4 → 5 (migration context)

| Svelte 4                | Svelte 5       | Echo port target        |
| ----------------------- | -------------- | ----------------------- |
| `let x = 0` reactive    | `$state(0)`    | `signal(0)`             |
| `$:` derived            | `$derived`     | `computed`              |
| `$:` { effect }         | `$effect`      | `effect`                |
| `export let prop`       | `$props()`     | view props              |
| `createEventDispatcher` | callback props | model methods           |
| `onMount`               | `$effect`      | effect / view lifecycle |

Teams on Svelte 4 should upgrade to **runes** first; Echo migration is then
**SFC → HyperDOM**, not rune syntax.

---

## Legacy stores (Svelte 4)

| Store API                  | EchoJS                       |
| -------------------------- | ---------------------------- |
| `writable(initial)`        | `signal` or `createStore`    |
| `readable(initial, start)` | `signal` + setup in model    |
| `derived(a, fn)`           | `computed`                   |
| `get(store)`               | `.value()`                   |
| `store.subscribe`          | `effect` or `subscribe`      |
| Custom store contract      | `createStore` with selectors |

```ts
// Svelte writable + derived
// const count = writable(0);
// const double = derived(count, ($c) => $c * 2);

// Echo
const count = signal(0)
const double = computed(() => count.value() * 2)
```

**Do not** port auto-subscribe `$store` syntax — bind signals in views
explicitly.

---

## SFC, templates, and snippets

| Feature             | Svelte                            | EchoJS                        |
| ------------------- | --------------------------------- | ----------------------------- |
| Markup              | HTML in `.svelte`                 | `h()` / DSL                   |
| Logic block         | `<script>`                        | `*.model.ts`                  |
| Style               | `<style>`                         | CSS modules / Tailwind global |
| Conditionals        | `{#if}`                           | `Show` / conditional          |
| Lists               | `{#each}`                         | `.map` + keys                 |
| Await               | `{#await}`                        | query pending / `beforeLoad`  |
| Keyed each          | `{#each items as item (item.id)}` | `key` on children             |
| Snippets (Svelte 5) | `{#snippet}` `{@render}`          | view child functions          |
| Slots (legacy)      | `<slot>`                          | composition in views          |
| `bind:value`        | two-way                           | model signal + handler        |
| `use:action`        | actions                           | DOM callbacks in view         |
| `transition:`       | Svelte transitions                | CSS / WAAPI                   |
| `class:` directive  | boolean classes                   | `class` prop object           |

```svelte
{#each users as user (user.id)}
  <li>{user.name}</li>
{/each}
```

```ts
ul(null, () => vm.users.value().map((u) => li({ key: u.id }, u.name)))
```

---

## Architecture & folder structure

### Typical SvelteKit

```
src/
  routes/           # +page.svelte, +page.ts, +layout.svelte
  lib/              # components, stores, utils
  hooks.server.ts   # server hooks
```

**File-based routing is the structure** — `lib/` often becomes a shared
component pile.

### EchoJS feature-first

| Layer        | Role                 | Imports                     |
| ------------ | -------------------- | --------------------------- |
| **App**      | providers            | downward                    |
| **Pages**    | route entry          | features, entities, widgets |
| **Widgets**  | shell                | features, entities          |
| **Features** | capabilities         | entities + shared           |
| **Entities** | domain, `__routes__` | shared                      |
| **Shared**   | pure                 | —                           |

| SvelteKit                       | EchoJS                       |
| ------------------------------- | ---------------------------- |
| `routes/dashboard/+page.svelte` | `pages/dashboard/*.page.ts`  |
| `+layout.svelte`                | `createLayoutView`           |
| `+page.ts` `load`               | `beforeLoad` + query         |
| `+server.ts`                    | backend API (external)       |
| `$lib/components`               | `widgets/` + `features/*/ui` |

---

## State: five kinds + Svelte libraries

| State kind     | Svelte / Kit                | EchoJS                                                  |
| -------------- | --------------------------- | ------------------------------------------------------- |
| **Local UI**   | `$state` in component       | `signal` in model                                       |
| **Screen**     | runes in `.svelte` / module | `createModel`                                           |
| **Server**     | `load`, server actions      | `@echojs-ecosystem/async`                               |
| **URL**        | `$page.url.searchParams`    | `@echojs-ecosystem/url-state`                           |
| **App client** | stores / rune modules       | `@echojs-ecosystem/store` + `@echojs-ecosystem/persist` |

### Library-by-library

| Library                    | Svelte role       | EchoJS                         |
| -------------------------- | ----------------- | ------------------------------ |
| **TanStack Query Svelte**  | `createQuery`     | `@echojs-ecosystem/async`      |
| **sveltekit-superforms**   | forms + zod       | model + mutation               |
| **formsnap**               | accessible fields | `@echojs-ecosystem/ui` + model |
| **nanostores**             | tiny stores       | signals / store                |
| **@tanstack/svelte-query** | cache             | `@echojs-ecosystem/async`      |
| **paraglide**              | i18n              | `@echojs-ecosystem/i18n`       |
| **svelte-i18n**            | dictionaries      | `@echojs-ecosystem/i18n`       |
| **lucide-svelte**          | icons             | SVG in views                   |

> [!WARNING] Module-level `$state` Runes in `.svelte.ts` modules are convenient
> — easy to create **hidden globals**. Echo prefers **entity store** or
> **feature model** with clear ownership.

---

## Data: load, server, Query

### SvelteKit `load`

```ts
// +page.ts
export const load = async ({ params, url }) => {
  const users = await api.users.list()
  return { users }
}
```

```ts
// Echo — query definition + beforeLoad optional
export const usersQuery = createQuery({
  name: 'users',
  queryKey: () => ['users'] as const,
  queryFn: ({ signal }) => api.users.list({ signal }),
})

export const usersPage = createRouteView({
  name: 'users',
  view: () => bindModelView(createUsersModel, UsersView),
  beforeLoad: () => usersQuery.prefetch?.(), // or rely on .with() in model
})
```

| SvelteKit                | EchoJS                        |
| ------------------------ | ----------------------------- |
| `load` (universal)       | `beforeLoad` + query          |
| `load` (server-only)     | server API + client query     |
| `depends('app:xxx')`     | `invalidateQueries`           |
| `invalidateAll`          | query client scope            |
| `error()` / `redirect()` | throw in `beforeLoad`         |
| Streaming `load`         | not 1:1 — query streaming TBD |
| Form `actions`           | `createMutation` + POST       |

### Server routes `+server.ts`

Keep **HTTP endpoints** on your backend or SvelteKit server during hybrid
migration. Echo client calls them inside `queryFn` with `fetch`.

### TanStack Query (Svelte)

| TanStack Svelte                              | Echo                       |
| -------------------------------------------- | -------------------------- |
| `createQuery(() => ({ queryKey, queryFn }))` | `createQuery` + `.with()`  |
| `createMutation`                             | `createMutation`           |
| Hydration from SSR                           | manual dehydrate if hybrid |

---

## SvelteKit routing & files

| File              | Role            | EchoJS                       |
| ----------------- | --------------- | ---------------------------- |
| `+page.svelte`    | UI              | `*.view.ts` + page           |
| `+page.ts`        | `load`, actions | `beforeLoad`, mutations      |
| `+layout.svelte`  | shell           | layout view                  |
| `+layout.ts`      | layout load     | layout `beforeLoad`          |
| `+error.svelte`   | error UI        | `errorView`                  |
| `+loading.svelte` | pending UI      | `loadingView`                |
| `hooks.server.ts` | auth, headers   | server middleware (external) |
| `hooks.client.ts` | client boot     | app bootstrap                |
| `params`          | `[id]` folders  | `:id` in route path          |
| `goto()`          | imperative nav  | `router.go()`                |
| `$app/navigation` | imports         | `@echojs-ecosystem/router`   |

**URL stability:** map `src/routes/foo/[id]` → path `foo/:id` unchanged.

---

## SSR, adapters, and prerender

| Feature                         | SvelteKit                     | EchoJS today                  |
| ------------------------------- | ----------------------------- | ----------------------------- |
| SSR                             | adapter-node, vercel, etc.    | CSR SPA                       |
| Prerender                       | `prerender = true`            | static export / separate site |
| Hydration                       | client `hydrate`              | N/A                           |
| `csr = false`                   | SSR-only page                 | N/A                           |
| `trailingSlash` config          | kit config                    | router config                 |
| SEO `+page.ts` metadata         | Echo head in SPA or SSR later |
| Images `@sveltejs/enhanced-img` | build pipeline specific       | standard img / CDN            |

:::callout type=note **Hybrid:** marketing on SvelteKit prerender; product on
Echo SPA — same pattern as Next/Nuxt/SolidStart splits. :::

---

## Forms & validation

| Tool                     | Svelte               | EchoJS                 |
| ------------------------ | -------------------- | ---------------------- |
| **superforms**           | load + zod + enhance | model + mutation       |
| **Native `use:enhance`** | progressive          | fetch in mutation      |
| **felte**                | form lib             | model signals          |
| **zod**                  | schema               | `computed` errors      |
| `bind:value`             | two-way              | signal + input handler |

```ts
export const createSignupModel = createModel(() => {
  const email = signal('')
  const password = signal('')
  const errors = computed(() => validateSignup(email.value(), password.value()))
  const submit = () =>
    signupMutation.mutate({ email: email.value(), password: password.value() })
  return { email, password, errors, submit }
})
```

---

## UI libraries & styling

| Library             | Svelte                | EchoJS                            |
| ------------------- | --------------------- | --------------------------------- |
| **Skeleton UI**     | design system         | `@echojs-ecosystem/ui` + Tailwind |
| **shadcn-svelte**   | copy components       | rebuild in HyperDOM               |
| **Melt UI**         | headless              | `@echojs-ecosystem/ui`            |
| **Flowbite Svelte** | Tailwind kit          | feature views                     |
| **Tailwind**        | first-class           | docs/example                      |
| **Sass in Svelte**  | `<style lang="scss">` | global / CSS modules              |
| **svelte-motion**   | animation             | CSS transitions                   |

Svelte components **do not port** — budget UI rewrite per screen.

---

## Auth & hooks

| Pattern                   | SvelteKit                 | EchoJS                  |
| ------------------------- | ------------------------- | ----------------------- |
| `hooks.server` session    | cookie session            | server + `sessionStore` |
| `locals.user` in `load`   | `beforeLoad` + inject api |
| OAuth                     | `@auth/sveltekit`         | provider + store        |
| Route groups `(app)`      | layout routes             | layout views            |
| `+page.server` auth check | `beforeLoad` redirect     |

---

## Errors, loading, transitions

| Svelte                     | EchoJS                     |
| -------------------------- | -------------------------- |
| `+error.svelte`            | route `errorView`          |
| `+loading.svelte`          | `loadingView`              |
| `{#await promise}`         | query `isPending`          |
| `try/catch` in `load`      | `beforeLoad` throw         |
| `fade` / `fly` transitions | CSS in view                |
| `svelte:window`            | `effect` + window listener |

---

## Performance & bundle

| Technique              | Svelte                     | EchoJS                              |
| ---------------------- | -------------------------- | ----------------------------------- |
| Compile-time dead code | yes                        | tree-shake                          |
| No runtime framework   | mostly                     | small `@echojs-ecosystem/*` modules |
| `each` keyed lists     | required for perf          | keys on children                    |
| Virtual list           | `svelte-virtual-list`      | windowed map                        |
| HMR                    | Vite + svelte plugin       | Vite                                |
| Bundle analyze         | `rollup-plugin-visualizer` | vite build                          |

Measure **real apps** — Svelte wins on tiny widgets; Echo wins on **integrated
stack clarity**, not always raw KB.

---

## Testing & DevTools

| Tool                                     | Svelte          | EchoJS                |
| ---------------------------------------- | --------------- | --------------------- |
| **Vitest** + **@testing-library/svelte** | component tests | model unit tests      |
| **Playwright**                           | e2e Kit apps    | e2e SPA               |
| **svelte-check**                         | template types  | `tsc` on views        |
| **Browser DevTools**                     | Svelte tab      | Echo devtools planned |

```ts
const vm = createFilterModel()
vm.query.set('echo')
expect(vm.results.value().length).toBeGreaterThan(0)
```

---

## Master ecosystem map

### Core

| Problem       | Svelte                         | EchoJS                        |
| ------------- | ------------------------------ | ----------------------------- |
| Compiler      | `svelte` package               | none                          |
| Vite plugin   | `@sveltejs/vite-plugin-svelte` | Vite TS only                  |
| App framework | SvelteKit                      | `@echojs-ecosystem/framework` |

### Routing & data

| Problem    | Svelte                        | EchoJS                        |
| ---------- | ----------------------------- | ----------------------------- |
| Routes     | filesystem                    | `createRoutes`                |
| Prefetch   | `data-sveltekit-preload-data` | router / query prefetch       |
| Mutations  | form actions                  | `createMutation`              |
| REST cache | TanStack / load               | `@echojs-ecosystem/async`     |
| URL params | `$page.url`                   | `@echojs-ecosystem/url-state` |

### UI & content

| Problem       | Svelte                 | EchoJS                   |
| ------------- | ---------------------- | ------------------------ |
| Markdown docs | mdsvex                 | Echo docs pattern        |
| Charts        | layercake              | wrap in view             |
| i18n          | paraglide, svelte-i18n | `@echojs-ecosystem/i18n` |

### Deploy

| Problem          | Svelte         | EchoJS       |
| ---------------- | -------------- | ------------ |
| Vercel / Netlify | adapters       | static SPA   |
| Node server      | adapter-node   | API separate |
| Docker           | Kit Dockerfile | static nginx |

---

## Providers & app shell

```ts
// SvelteKit — hooks + layout (conceptual)
// export const load = …
// +layout.svelte wraps children
```

```ts
// EchoJS
createEchoApp({ root: () => AppRoot(), strictContextChecks: true })
  .use(routerProvider)
  .use(queryProvider)
  .use(i18nProvider)
  .use(uiProvider)
  .mount('#app')
```

| Concern        | SvelteKit                   | Echo                     |
| -------------- | --------------------------- | ------------------------ |
| Global context | `setContext` / `getContext` | `inject`                 |
| App state      | layout `load` data          | providers + stores       |
| Env vars       | `$env/static/public`        | `import.meta.env` (Vite) |

---

## TypeScript & DX

| Topic                 | Svelte                 | EchoJS            |
| --------------------- | ---------------------- | ----------------- |
| Template typing       | `svelte-check`         | TS in views       |
| Generics in templates | limited                | full TS           |
| `bind:` types         | inferred               | explicit handlers |
| Route types           | Kit generated `$types` | route table       |
| Strict null           | supported              | supported         |

Echo: **one TS pipeline** — no split between script and template checkers.

---

## Migration cookbook

### Phase 0 — Inventory

1. List `src/routes` tree and URLs.
2. Catalog `load` functions and form actions.
3. List stores and `.svelte.ts` rune modules.
4. Note Kit-only hooks and adapters.

### Phase 1 — Shell

1. `createEchoApp` + providers.
2. Port route paths to `createRoutes`.
3. Layout widget from `+layout.svelte`.

### Phase 2 — Data

1. `load` fetchers → `createQuery`.
2. Form actions → `createMutation`.
3. `searchParams` → `@echojs-ecosystem/url-state`.

### Phase 3 — UI

1. Extract `<script>` logic → `createModel`.
2. Rewrite markup → HyperDOM views.
3. Replace Skeleton/shadcn-svelte incrementally.

### Phase 4 — Server split

1. Keep `+server.ts` as API during transition, or move to backend.
2. Remove Kit adapter deploy for migrated app — ship Vite SPA.

### Svelte → Echo cheat sheet

| Svelte         | Echo                 |
| -------------- | -------------------- |
| `$state`       | `signal`             |
| `$derived`     | `computed`           |
| `$effect`      | `effect`             |
| `$props`       | view props           |
| `load`         | `beforeLoad` + query |
| `goto`         | `router.go()`        |
| `writable`     | `signal` / store     |
| `{#if}`        | `Show` / conditional |
| `{#each}`      | `.map`               |
| `bind:`        | model handler        |
| `+page.svelte` | page + view          |

---

## Anti-patterns when porting from Svelte

| Anti-pattern                         | Fix                           |
| ------------------------------------ | ----------------------------- |
| Global rune module for everything    | store / query / model         |
| `load` duplicating query cache       | single `createQuery`          |
| Copying `{#each}` without keys       | stable keys                   |
| Keeping `.svelte` in Echo app        | `.view.ts` only               |
| Kit form actions without mutation    | `createMutation`              |
| `$app/stores` page store for filters | `@echojs-ecosystem/url-state` |

---

## Decision matrix

| Stay on SvelteKit                  | Choose EchoJS                |
| ---------------------------------- | ---------------------------- |
| SSR/adapter deploy is product core | CSR dashboard / admin / docs |
| Heavy Skeleton/shadcn-svelte       | UI rewrite OK                |
| Love SFC + runes ergonomics        | Plain TS + strict layers     |
| Content sites with `prerender`     | Echo monorepo product        |
| Small bundle for marketing widgets | Platform consistency         |

---

## FAQ

### Is Echo “Svelte without compiler”?

Roughly — **runtime signals** + **HyperDOM** instead of compile-time runes. You
trade SFC magic for explicit TS.

### Can we keep `.svelte` files?

Not in core Echo apps. Use HyperDOM views.

### Runes vs signals 1:1?

Yes for most app logic; accessor syntax differs (`.value()`).

### `load` vs query?

`load` is route-bound; Echo query is **definition-bound** and reused across
routes.

### SvelteKit auth?

Replace with `beforeLoad` + session store; keep server hooks until API moved.

### Closest Echo comparison doc?

[EchoJS vs Solid](/docs/comparisons/solid) — also fine-grained, no VDOM, but JSX
not compiler.

---

## Summary

| Dimension    | Svelte + SvelteKit | EchoJS                           |
| ------------ | ------------------ | -------------------------------- |
| Reactivity   | Runes (compiled)   | Runtime signals                  |
| UI           | `.svelte`          | HyperDOM `.view.ts`              |
| Routing      | File-based Kit     | Code route table                 |
| Data         | `load`, actions    | `@echojs-ecosystem/async`        |
| SSR          | Mature adapters    | SPA-first                        |
| Architecture | Kit + `lib/`       | Feature-first rules              |
| Platform     | Kit + community    | `@echojs-ecosystem/*` integrated |

**Other guides:** [Comparisons index](/docs/comparisons) ·
[Solid](/docs/comparisons/solid) · [React](/docs/comparisons/react) ·
[Vue](/docs/comparisons/vue) · [Angular](/docs/comparisons/angular)

## Related docs

- [@echojs-ecosystem/reactivity](/docs/packages/reactivity)
- [Feature-first design](/docs/architecture/feature-first)
- [Data fetching](/docs/guides/data-fetching)
- [Routing guide](/docs/guides/routing)
- [State overview](/docs/state/overview)
- [Why EchoJS](/docs/introduction/what-is-echojs#why-echojs)
