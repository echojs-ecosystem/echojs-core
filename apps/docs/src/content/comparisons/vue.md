---
title: EchoJS vs Vue + ecosystem
description: Deep comparison — Proxy reactivity, Composition API, Pinia, Vue Router, Nuxt, and full ecosystem mapping to EchoJS.
keywords: vue, pinia, vue router, nuxt, composition api, ref, reactive, signals, vee-validate, vueuse
---

# EchoJS vs Vue + ecosystem

Vue 3 is a **progressive framework**: SFC templates or JSX, **Proxy-based reactivity**, and an ecosystem you assemble (Vue Router, Pinia, Nuxt, TanStack Query). EchoJS is a **platform**: **explicit signals**, HyperDOM (no VDOM diff), **feature-first** boundaries, and first-party packages composed through `createEchoApp()`.

This guide is the **Vue migration reference** — reactivity, templates, state, routing, Nuxt, and a **library-by-library** map to EchoJS.

## Table of contents (on this page)

1. [At a glance](#at-a-glance)
2. [Runtime & reactivity](#runtime-reactivity)
3. [Vue 3 APIs vs EchoJS](#vue-3-apis-vs-echojs)
4. [Templates, SFC, and rendering](#templates-sfc-and-rendering)
5. [Composition API vs models](#composition-api-vs-models)
6. [Architecture & folder structure](#architecture-folder-structure)
7. [State: five kinds + Vue libraries](#state-five-kinds-vue-libraries)
8. [Async data: Pinia, Query, ofetch, Nuxt](#async-data-pinia-query-ofetch-nuxt)
9. [Routing: Vue Router & Nuxt pages](#routing-vue-router-nuxt-pages)
10. [Nuxt & full-stack](#nuxt-full-stack)
11. [SSR, islands, and SEO](#ssr-islands-and-seo)
12. [Forms & validation](#forms-validation)
13. [Styling & UI libraries](#styling-ui-libraries)
14. [Auth & session](#auth-session)
15. [Errors, loading, Suspense](#errors-loading-suspense)
16. [Performance & compiler](#performance-compiler)
17. [Testing & DevTools](#testing-devtools)
18. [Master ecosystem map](#master-ecosystem-map)
19. [Provider composition](#provider-composition)
20. [TypeScript & DX](#typescript-dx)
21. [Migration cookbook](#migration-cookbook)
22. [Anti-patterns](#anti-patterns-when-porting-from-vue)
23. [Decision matrix](#decision-matrix)
24. [FAQ](#faq)
25. [Summary](#summary)

---

## At a glance

| Dimension | Vue 3 + typical ecosystem | EchoJS |
| --- | --- | --- |
| **Core loop** | Track deps in `setup`/render → re-run component → patch VDOM (compiler-optimized) | Signal notify → `computed`/`effect` → targeted DOM writes |
| **Reactivity** | Proxy (`reactive`) + ref boxes | Explicit `signal` cells |
| **Templates** | SFC `.vue` + compiler | HyperDOM `h()` / DSL in `.view.ts` |
| **Structure** | Flexible; Nuxt adds opinions | **Feature-first** dependency rules |
| **Routing** | Vue Router 4 | `@echojs-ecosystem/router` |
| **Global store** | Pinia (Vuex legacy) | `@echojs-ecosystem/store` |
| **Server / cache** | Pinia actions, TanStack Query, `useFetch` | `@echojs-ecosystem/query` |
| **URL state** | `route.query`, manual sync | `@echojs-ecosystem/url-state` |
| **Meta-framework** | Nuxt 3/4 | Vite + `@echojs-ecosystem/framework` (SPA-first) |
| **SSR** | Nuxt mature | Plan separately; docs/example are CSR |
| **DX** | `script setup`, auto-imports | Models + providers; no `ref` unwrap in templates |

> [!NOTE] Performance numbers
> See the [home page Compare section](/). Vue’s compiler reduces real-world VDOM cost; EchoJS removes the reconciliation pass entirely.

---

## Runtime & reactivity

### How Vue 3 tracks dependencies

1. `ref` / `reactive` create Proxy-backed reactive objects.
2. During `setup`, render, or `watchEffect`, property reads register **active subscriber**.
3. On write, subscribers re-run (component render function, computed, watcher).

**Deep reactivity** on large POJOs is convenient but can over-track unless you use `shallowRef`, `shallowReactive`, or `markRaw`.

### How EchoJS tracks dependencies

1. `signal`, `computed`, `effect` form an explicit graph.
2. Reads call `.value()`; writes call `.set()` / `.update()`.
3. HyperDOM bindings subscribe at DOM boundaries.

No Proxy wrapper around arbitrary objects — **ownership of mutability is clear** in code review.

```ts
// Vue 3
import { ref, watchEffect } from "vue";

const count = ref(0);
watchEffect(() => console.log(count.value));
count.value++;
```

```ts
// EchoJS
import { signal, effect } from "@echojs-ecosystem/reactivity";

const count = signal(0);
effect(() => console.log(count.value()));
count.set(count.value() + 1);
```

### Vue 2 → 3 (migration context)

| Vue 2 | Vue 3 | EchoJS note |
| --- | --- | --- |
| `data()` | `ref` / `reactive` | Use signals, not Options API |
| `this.$store` | Pinia | `@echojs-ecosystem/store` |
| Filters | removed | `computed` |
| Event bus | mitt / Pinia | store events or feature models |

Teams still on Vue 2 should plan **Vue 3 first**, then evaluate Echo — the mental shift (explicit signals + no SFC) is similar in effort to Vue 3 + Composition API.

### Compiler vs runtime-only

Vue’s **SFC compiler** hoists static nodes, caches static parts, and can skip diffing unchanged blocks. That narrows the gap with fine-grained updates for **well-written SFCs**.

EchoJS **never** builds a virtual tree for diffing — bindings are always direct. Trade-off: you lose SFC `<template>` ergonomics, gain **uniform TS views** and no template compiler in CI.

---

## Vue 3 APIs vs EchoJS

| Vue 3 API | EchoJS | Notes |
| --- | --- | --- |
| `ref()` | `signal()` | `.value` vs `.value()` |
| `reactive()` | multiple `signal`s or `createStore` | Avoid one giant reactive blob |
| `computed()` | `computed()` | Same idea |
| `watch` / `watchEffect` | `effect()` | `watch` with source tuple → explicit deps in effect |
| `readonly()` | `readonly(signal)` | Package support |
| `shallowRef` / `shallowReactive` | flat signals per field | Prefer explicit over shallow proxies |
| `toRef` / `toRefs` | pass signals from store/model | No unwrap magic |
| `provide` / `inject` | `provide` / `inject` (framework) | Typed tokens |
| `onMounted` etc. | view mount / `effect` with cleanup | See HyperDOM lifecycle |
| `nextTick` | `batch` or microtask after signal flush | Rare if bindings correct |
| `defineProps` | view function args | Props from parent view |
| `defineEmits` | callbacks on model/view | Explicit functions |
| `defineExpose` | return model API from factory | Test models directly |
| `useTemplateRef` | DOM ref in view | HyperDOM ref API |

---

## Templates, SFC, and rendering

| Feature | Vue SFC | EchoJS HyperDOM |
| --- | --- | --- |
| Syntax | `<template>`, `v-if`, `v-for` | `h()`, `Show`, reactive `() => child` |
| Two-way bind | `v-model` | signal + `onInput` on model |
| Class/style | `:class` object | `class` prop on `h()` |
| Slots | `<slot>` | children functions / composition in views |
| Teleport | `<Teleport>` | portal patterns in HyperDOM docs |
| Async component | `defineAsyncComponent` | lazy route + dynamic import |
| Keep-alive | `<KeepAlive>` | route-level cache / manual (no built-in clone) |
| Directives | `v-custom` | prefer explicit view logic |
| JSX | `@vue/babel-plugin-jsx` | native HyperDOM TS |

### `v-if` / `v-for` equivalents

```vue
<!-- Vue -->
<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
```

```ts
// EchoJS (illustrative)
ul(null, () =>
  vm.users.value().map((user) => li({ key: user.id }, user.name)),
);
```

### `v-model`

Vue merges `modelValue` + `onUpdate:modelValue`. EchoJS keeps **field signals on the model** and passes handlers into presentational views — clearer data flow, no magic prop names.

---

## Composition API vs models

| Vue pattern | EchoJS pattern |
| --- | --- |
| `composables/useX.ts` | `features/x/model/x.model.ts` |
| `setup()` in SFC | `createModel` + `createView` |
| Logic shared via composable | shared factory or entity service |
| `storeToRefs(pinia)` | `select` / store signals |

```ts
// Vue composable
export function useCounter() {
  const n = ref(0);
  const inc = () => n.value++;
  return { n, inc };
}
```

```ts
// EchoJS model
export const createCounterModel = createModel(() => {
  const n = signal(0);
  return { n, inc: () => n.update((x) => x + 1) };
});
```

**Why models over composables?** Same testability, but **no implicit component instance** — models run in pages, features, and tests with identical rules.

---

## Architecture & folder structure

### Typical Vue / Nuxt layout

| Path | Common use |
| --- | --- |
| `src/components/` | Shared + feature UI mixed |
| `src/composables/` | Cross-feature hooks |
| `src/stores/` | Pinia modules |
| `src/views/` or `pages/` | Route targets |
| `server/` (Nuxt) | API routes, middleware |

Boundaries are **conventional** — imports between features are rarely forbidden by tooling.

### EchoJS feature-first

| Layer | Role | Imports |
| --- | --- | --- |
| **App** | Bootstrap, providers | downward only |
| **Pages** | Route composition | features, entities, widgets |
| **Widgets** | Shells (sidebar, header) | features, entities |
| **Features** | User capabilities | **entities + shared** |
| **Entities** | Domain, API, routes | shared |
| **Shared** | Pure utils | — |

:::callout type=tip
Nuxt `pages/` maps mentally to Echo **pages** + **entities/__routes__** — not to `features/`.
:::

### Vue patterns → Echo home

| Vue | EchoJS |
| --- | --- |
| Pinia store per domain | entity store + feature models |
| Composable per screen | `createXModel` colocated |
| Global `components/` | `widgets/` + feature `ui/` |
| `plugins/` | `createEchoApp().use()` |
| Nuxt modules | framework providers |

---

## State: five kinds + Vue libraries

| State kind | Vue + ecosystem | EchoJS |
| --- | --- | --- |
| **Local UI** | `ref`, `shallowRef` | `signal` in model |
| **Screen model** | composables + `computed` | `createModel` |
| **Server / async** | Pinia + fetch, TanStack Query, `useAsyncData` | `@echojs-ecosystem/query` |
| **URL** | `useRoute().query` | `@echojs-ecosystem/url-state` |
| **App client** | Pinia, persisted state plugins | `@echojs-ecosystem/store` + `@echojs-ecosystem/persist` |

### Library-by-library (client & server)

| Library | Vue role | EchoJS |
| --- | --- | --- |
| **Pinia** | Global + feature stores | `createStore` + feature models |
| **Vuex** (legacy) | Mutations/actions | migrate to store/query split |
| **TanStack Query Vue** | `useQuery` | `createQuery` + `.with()` |
| **VueUse** | 100+ composables | model/shared utilities (pick what you need) |
| **mitt / tiny-emitter** | Event bus | store `.on` / feature events |
| **Apollo Vue** | GraphQL | `queryFn` + optional client |
| **pinia-plugin-persistedstate** | localStorage | `@echojs-ecosystem/persist` |
| **@vueuse/core `useStorage`** | synced ref | persist on store slice |

> [!WARNING] Pinia as “god object”
> Pinia often absorbs server lists, UI flags, and session. On Echo, **query owns server cache**, **url-state owns shareable filters**, **store owns session/theme**.

### Pinia → Echo store (example)

```ts
// Pinia
export const usePrefsStore = defineStore("prefs", {
  state: () => ({ theme: "system" as "light" | "dark" | "system" }),
  actions: {
    setTheme(theme: "light" | "dark" | "system") {
      this.theme = theme;
    },
  },
});
```

```ts
// EchoJS
export const prefsStore = createStore({ theme: "system" as const }).extend(
  withActions((s) => ({
    setTheme: (theme: "light" | "dark" | "system") => s.set({ theme }),
  })),
);
```

---

## Async data: Pinia, Query, ofetch, Nuxt

### Pinia + API actions

```ts
// Vue — fetch in action, state in store
async fetchUsers() {
  this.users = await api.users.list();
}
```

Prefer Echo **query** for cache, dedupe, stale time, and shared loading state:

```ts
export const usersQuery = createQuery({
  name: "users",
  queryKey: () => ["users"] as const,
  queryFn: ({ signal }) => api.users.list({ signal }),
});
```

### TanStack Query (Vue)

| TanStack Vue | EchoJS |
| --- | --- |
| `useQuery({ queryKey, queryFn })` | `createQuery` |
| `useMutation` | `createMutation` |
| `useQueryClient` | inject query client |
| `enabled: computed(...)` | `.with(() => ({ enabled: ... }))` |
| `select` | `computed` in model |

### Nuxt data fetching

| Nuxt API | EchoJS analogue |
| --- | --- |
| `useAsyncData` | `beforeLoad` + query or route `data` |
| `useFetch` / `$fetch` | `queryFn` with `fetch` |
| `refreshNuxtData` | `invalidateQueries` |
| Server route handlers | stay on server; client uses query |

### ofetch / $fetch

Use plain `fetch` or your HTTP wrapper inside `queryFn` — no Nuxt auto-import magic; **explicit imports** match Echo dependency rules.

---

## Routing: Vue Router & Nuxt pages

### Vue Router 4

| Vue Router | `@echojs-ecosystem/router` |
| --- | --- |
| `createRouter({ routes })` | `createRoutes([...])` |
| `router.push` | `router.go()` |
| `<RouterLink>` | `NavLink` |
| `beforeEach` guard | `beforeLoad` / global hooks |
| Named routes | unique `name` per route |
| Lazy `() => import()` | lazy page modules in route table |
| `props: true` | `params` on route view |
| `meta` fields | extend route defs or guards |

```ts
// Echo route view with loader
export const userPage = createRouteView({
  name: "user",
  view: ({ params, data }) => UserView({ id: params.id, profile: data }),
  beforeLoad: ({ params }) => fetchProfile(params.id),
  loadingView: () => RouterLoading(),
  errorView: ({ error }) => RouterError(error),
});
```

### Nuxt file-based routing

| Nuxt | EchoJS |
| --- | --- |
| `pages/users/[id].vue` | `pages/users/user.page.ts` + path `users/:id` |
| `layouts/default.vue` | `createLayoutView` |
| `middleware/auth.ts` | `beforeLoad` redirect |
| `definePageMeta` | route config on `createRouteView` |
| `navigateTo` | `router.go()` |

Keep **URL paths identical** when migrating Nuxt → Echo SPA to avoid breaking links.

---

## Nuxt & full-stack

| Concern | Nuxt 3/4 | EchoJS today |
| --- | --- | --- |
| SSR / SSG | First-class | CSR SPA; SSR roadmap separate |
| Server API | `server/api/*` | Backend of your choice |
| Auto-imports | components, composables | explicit imports (clearer graph) |
| Modules ecosystem | `@nuxtjs/i18n`, etc. | `@echojs-ecosystem/*` providers |
| Nitro deploy | Vercel, Node, edge | Static/Vite hosting for SPA |
| Hybrid rendering | route rules | not 1:1 |

:::callout type=note
**Split stack:** marketing on Nuxt SSG, authenticated app on EchoJS SPA is a common pattern — same as React + Next splits.
:::

---

## SSR, islands, and SEO

| Need | Vue / Nuxt | EchoJS |
| --- | --- | --- |
| SEO landing pages | `ssr: true`, prerender | prerender or keep Nuxt for marketing |
| Client-only dashboard | CSR | Ideal Echo target |
| Islands architecture | Nuxt components | manual partial hydration N/A |
| `useSeoMeta` | Nuxt | head management in SPA or SSR layer |

---

## Forms & validation

| Tool | Vue | EchoJS |
| --- | --- | --- |
| **VeeValidate** | schema + fields | model signals + validate fn |
| **FormKit** | declarative forms | HyperDOM fields + model |
| **Vuelidate** | composable validators | `computed` error map |
| Native `v-model` on forms | two-way | model owns values + submit |

```ts
// Echo form model sketch
export const createSignupModel = createModel(() => {
  const email = signal("");
  const password = signal("");
  const errors = computed(() => validateSignup(email.value(), password.value()));
  const submit = () => signupMutation.mutate({ email: email.value(), password: password.value() });
  return { email, password, errors, submit };
});
```

---

## Styling & UI libraries

| Approach | Vue ecosystem | EchoJS |
| --- | --- | --- |
| **Tailwind** | common | `tailwind-variants` in docs/example |
| **UnoCSS** | Vite plugin | same Vite pipeline |
| **Vuetify** | Material Vue | `@echojs-ecosystem/ui` or gradual port |
| **PrimeVue** | enterprise widgets | feature-specific views |
| **Naive UI / Element Plus** | admin UIs | rebuild critical screens |
| **Headless UI Vue** | accessible primitives | `@echojs-ecosystem/ui` |
| **Vue Transition** | `<Transition>` | CSS classes on DOM updates |
| **@vueuse/motion** | animations | CSS / WAAPI in views |

---

## Auth & session

| Pattern | Vue / Nuxt | EchoJS |
| --- | --- | --- |
| `@sidebase/nuxt-auth` | session modules | store + `beforeLoad` |
| Pinia auth store | user + token | `sessionStore` + persist |
| Route middleware | `defineNuxtRouteMiddleware` | `beforeLoad` |
| RBAC in template | `v-if="can('edit')"` | `computed` + `Show` |

---

## Errors, loading, Suspense

| Vue | EchoJS |
| --- | --- |
| `<Suspense>` | `loadingView` + query pending |
| `onErrorCaptured` | route `errorView` |
| Nuxt `<NuxtLoadingIndicator>` | router `$pending` / top bar widget |
| `error.vue` page | `errorView` on route |
| Toast (`vue-sonner`) | widget + store event |

---

## Performance & compiler

| Technique | Vue | EchoJS |
| --- | --- | --- |
| `v-once` | static subtree | static DOM in view |
| `v-memo` | skip child diff | narrow signal deps |
| `shallowRef` for big data | avoid deep track | split signals / store slices |
| Virtual scroll | `vue-virtual-scroller` | virtual list in view |
| Bundle | vue runtime + compiler (SFC) | per-package imports |
| Devtools perf | Vue Perf | planned Echo devtools |

Vue’s compiler **reduces** update cost; Echo **removes** reconciliation — profile your real screens before deciding.

---

## Testing & DevTools

| Tool | Vue | EchoJS |
| --- | --- | --- |
| **Vitest** | unit + component | test **models** first |
| **@vue/test-utils** | mount SFC | mount views integration-style |
| **`@pinia/testing`** | mock stores | mock store factories |
| **MSW** | mock API | mock `fetch` in queries |
| **Vue DevTools** | Pinia, router, components | `@echojs-ecosystem/devtools` planned |
| **Storybook Vue** | stories | HyperDOM stories (roadmap) |

```ts
// Echo — model unit test (no mount)
const vm = createLoginModel();
vm.email.set("a@b.c");
expect(vm.errors.value().email).toBeUndefined();
```

---

## Master ecosystem map

### Core platform

| Problem | Vue stack | EchoJS |
| --- | --- | --- |
| UI + reactivity | `vue` | `@echojs-ecosystem/reactivity` + `@echojs-ecosystem/hyperdom` |
| App entry | `createApp` | `createEchoApp` |
| Build | Vite + `@vitejs/plugin-vue` | Vite (no SFC compiler) |
| TS in SFC | `vue-tsc` | `tsc` on `.ts` views |

### Routing & navigation

| Problem | Vue | EchoJS |
| --- | --- | --- |
| SPA router | Vue Router | `@echojs-ecosystem/router` |
| Nuxt pages | file routes | code route table |
| URL query sync | manual / vue-router | `@echojs-ecosystem/url-state` |
| i18n routes | `@nuxtjs/i18n` | `@echojs-ecosystem/i18n` + router |

### Data & state

| Problem | Vue | EchoJS |
| --- | --- | --- |
| REST cache | TanStack Query | `@echojs-ecosystem/query` |
| GraphQL | Villus, Apollo | `queryFn` |
| Global store | Pinia | `@echojs-ecosystem/store` |
| Persistence | pinia-plugin-persistedstate | `@echojs-ecosystem/persist` |
| Realtime | socket.io + ref | `effect` + client |

### UI & content

| Problem | Vue | EchoJS |
| --- | --- | --- |
| Component libraries | Vuetify, PrimeVue, … | `@echojs-ecosystem/ui` |
| Icons | `@iconify/vue` | SVG / icon components in views |
| Markdown docs | VitePress | Echo docs app pattern |
| Charts | vue-echarts | wrap chart lib in view |
| Tables | TanStack Table Vue | model + row mapping |

### Quality & ops

| Problem | Vue | EchoJS |
| --- | --- | --- |
| Lint | `eslint-plugin-vue` | ESLint TS |
| Format | Prettier + Volar | Prettier |
| E2E | Cypress, Playwright | Playwright on SPA |
| i18n | vue-i18n | `@echojs-ecosystem/i18n` |

---

## Provider composition

```ts
// Vue
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(i18n);
app.mount("#app");
```

```ts
// EchoJS
createEchoApp({ root: () => AppRoot(), strictContextChecks: true })
  .use(routerProvider)
  .use(queryProvider)
  .use(i18nProvider)
  .use(uiProvider)
  .mount("#app");
```

| Concern | Vue plugins | Echo providers |
| --- | --- | --- |
| Order-sensitive setup | multiple `app.use` | ordered `.use()` chain |
| Nuxt module config | `nuxt.config` | app bootstrap TS |
| Missing dependency | runtime undefined | strict inject errors in dev |

---

## TypeScript & DX

| Topic | Vue 3 + Volar | EchoJS |
| --- | --- | --- |
| SFC type inference | strong in IDE | N/A — TS views only |
| Props typing | `defineProps<{...}>()` | view props interface |
| Emit typing | `defineEmits` | callback types on model |
| Pinia typing | `StoreDefinition` | `createStore` inference |
| Route typing | typed-router, unplugin | route table names |
| Ref unwrapping in template | automatic | always `.value()` in TS |

Echo avoids **template-only type checking** split — what you see in `.view.ts` is what `tsc` checks.

---

## Migration cookbook

### Phase 0 — Inventory

1. List routes (Vue Router or Nuxt `pages/`).
2. Export all Pinia stores — classify by five kinds.
3. List composables and which components use them.
4. Note Nuxt-only APIs (`useSeoMeta`, server routes).

### Phase 1 — Shell

1. `createEchoApp` + providers.
2. Port route table (same paths).
3. Layout widget (ex-`layouts/default.vue`).

### Phase 2 — Data

1. Pinia actions that fetch → `createQuery`.
2. Keep Pinia only for true session/UI globals → `createStore`.
3. Move `route.query` filters → `@echojs-ecosystem/url-state`.

### Phase 3 — Features

1. One feature folder per Vue feature/module.
2. `useX` composable → `createXModel`.
3. SFC → `XView.ts` (template last).

### Phase 4 — Cleanup

1. Remove unused global components.
2. Drop VueUse imports replaced by models.
3. Delete empty Pinia modules.

### Composable → model cheat sheet

| Vue | Echo |
| --- | --- |
| `ref` / `reactive` | `signal` / store |
| `computed` | `computed` |
| `watch` | `effect` |
| `watchEffect` | `effect` |
| `onMounted` | view lifecycle / effect |
| `useRoute` | route view args + router inject |
| `useRouter` | `inject(router)` |
| `storeToRefs` | store fields as signals |
| `useAsyncData` | `beforeLoad` + query |

---

## Anti-patterns when porting from Vue

| Anti-pattern | Fix |
| --- | --- |
| One Pinia store for API + UI + URL | Split query / url-state / store |
| `reactive()` on huge API DTOs | query data + narrow signals |
| Copying SFC line-by-line without model | model first, view second |
| `watchEffect` for derived state | `computed` |
| Global `components/` dump | widgets vs features |
| Fetch in `setup` without cache | `createQuery` |
| Recreating Nuxt auto-import magic | explicit imports |

---

## Decision matrix

| Stay on Vue / Nuxt | Choose EchoJS |
| --- | --- |
| Nuxt SSR/ISR is product core | SPA dashboard, admin, docs |
| Heavy PrimeVue / Vuetify investment | Greenfield or UI rewrite OK |
| Team mastery of SFC + Volar | Want strict feature boundaries |
| `@nuxt/content` marketing site | Product app in monorepo Echo stack |
| VueUse everywhere for convenience | Prefer small explicit models |

---

## FAQ

### Is EchoJS “Vue without templates”?

Partly. Closest overlap: **Composition API + signals**. You lose SFC and Proxy auto-tracking; you gain **explicit deps** and **no VDOM**.

### Can we keep `.vue` files?

Not in core Echo. Use HyperDOM `.view.ts`. Micro-frontend with Vue island is possible but costly.

### Pinia vs Echo store?

Pinia ≈ `createStore` + devtools ergonomics. Echo splits **server cache** into query — stores stay smaller.

### Nuxt 4 migration?

Treat Nuxt as **server + routing host**; Echo migration targets the **client app** unless you replace Nuxt entirely with Vite SPA.

### VueUse `useDark`?

Theme → `prefsStore` + `@echojs-ecosystem/persist` or UI provider.

---

## Summary

| Dimension | Vue + ecosystem | EchoJS |
| --- | --- | --- |
| Reactivity | Proxy + ref | Explicit signals |
| UI | SFC + optional compiler opts | HyperDOM direct |
| Structure | Progressive / Nuxt opinions | Feature-first rules |
| Data | Pinia + Query + useFetch | `@echojs-ecosystem/query` + store |
| Routing | Vue Router / Nuxt pages | `@echojs-ecosystem/router` |
| Full-stack | Nuxt mature | SPA-first; split marketing SSR |
| DX | Volar, script setup | Models, providers, strict layers |

**Other guides:** [Comparisons index](/docs/comparisons) · [EchoJS vs React](/docs/comparisons/react) · [Solid](/docs/comparisons/solid) · [Svelte](/docs/comparisons/svelte) · [Angular](/docs/comparisons/angular)

## Related docs

- [Why EchoJS](/docs/introduction/why-echojs)
- [Feature-first design](/docs/architecture/feature-first)
- [State overview](/docs/state/overview)
- [Data fetching](/docs/guides/data-fetching)
- [Routing guide](/docs/guides/routing)
- [@echojs-ecosystem/reactivity](/docs/packages/reactivity) · [@echojs-ecosystem/store](/docs/packages/store) · [@echojs-ecosystem/query](/docs/packages/query)
