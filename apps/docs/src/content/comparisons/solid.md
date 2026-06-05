---
title: EchoJS vs Solid
description: Deep comparison — signal-first JSX, SolidStart, createResource, stores, and full ecosystem mapping to EchoJS.
keywords: solid, solidjs, signals, jsx, solidstart, createResource, fine-grained, kobalte, tanstack
---

# EchoJS vs Solid

**SolidJS** and **EchoJS** share the same rendering bet: **fine-grained reactivity**, **no virtual DOM reconciliation**, updates proportional to **dependencies**, not tree size. Solid exposes that through **JSX that runs once** and compiles to real DOM bindings. EchoJS uses **HyperDOM** (`h`, `createView`, `createModel`) and a **documented multi-package platform** with **feature-first** dependency rules.

This guide is the **Solid migration reference** — primitives, mental model traps (Solid ≠ React), ecosystem, SolidStart, and **library-by-library** mapping.

## Table of contents (on this page)

1. [At a glance](#at-a-glance)
2. [Shared philosophy](#shared-philosophy)
3. [Reactivity primitives](#reactivity-primitives)
4. [Solid components vs Echo models/views](#solid-components-vs-echo-modelsviews)
5. [JSX vs HyperDOM](#jsx-vs-hyperdom)
6. [Control flow & UI primitives](#control-flow-ui-primitives)
7. [Architecture & folder structure](#architecture-folder-structure)
8. [State: five kinds + Solid libraries](#state-five-kinds-solid-libraries)
9. [Async: createResource, Query, mutations](#async-createresource-query-mutations)
10. [Routing: Solid Router & SolidStart](#routing-solid-router-solidstart)
11. [SSR, streaming, and deployment](#ssr-streaming-and-deployment)
12. [Forms & validation](#forms-validation)
13. [UI libraries & styling](#ui-libraries-styling)
14. [Auth & session](#auth-session)
15. [Errors, Suspense, boundaries](#errors-suspense-boundaries)
16. [Performance & bundle](#performance-bundle)
17. [Testing & DevTools](#testing-devtools)
18. [Master ecosystem map](#master-ecosystem-map)
19. [Providers & context](#providers-context)
20. [TypeScript & DX](#typescript-dx)
21. [Migration cookbook](#migration-cookbook)
22. [Anti-patterns](#anti-patterns-when-porting-from-solid)
23. [Decision matrix](#decision-matrix)
24. [FAQ](#faq)
25. [Summary](#summary)

---

## At a glance

| Dimension | Solid + typical stack | EchoJS |
| --- | --- | --- |
| **Update model** | Signals → compiled DOM bindings | Signals → HyperDOM bindings |
| **VDOM** | No | No |
| **View syntax** | JSX (runs once per component) | HyperDOM TS (`.view.ts`) |
| **Component re-run** | **Never** (function runs once) | Views are factories; models are plain |
| **Structure** | Team convention | **Feature-first** (documented) |
| **Routing** | `@solidjs/router` | `@echojs-ecosystem/router` |
| **Async** | `createResource`, TanStack Query | `@echojs-ecosystem/query` |
| **Global state** | `createStore`, context, signals | `@echojs-ecosystem/store` |
| **Meta-framework** | SolidStart (Vinxi/Nitro) | `@echojs-ecosystem/framework` + Vite SPA |
| **SSR** | SolidStart mature path | CSR-first today |
| **Looks like React?** | JSX similar — semantics differ | No JSX |

> [!TIP] Closest cousin
> Of all mainstream frameworks, **Solid is the closest to Echo philosophically**. The largest migration cost is usually **JSX → HyperDOM** and **platform boundaries**, not signals.

---

## Shared philosophy

| Idea | Solid | EchoJS |
| --- | --- | --- |
| Fine-grained updates | Yes | Yes |
| Avoid tree reconciliation | Yes | Yes |
| Explicit dependencies | `createMemo` / `createEffect` | `computed` / `effect` |
| Batch updates | `batch()` | `batch()` |
| Predictable work | deps, not component count | deps, not view tree size |

**Where they diverge:** Solid optimizes for **ergonomic JSX** and a **minimal core** you extend with community packages. Echo optimizes for **enterprise folder law**, **first-party router/query/store/i18n**, and **monorepo apps** (`apps/example`, `apps/docs`) as reference implementations.

---

## Reactivity primitives

| Solid | EchoJS | Notes |
| --- | --- | --- |
| `createSignal(initial)` → `[get, set]` | `signal(initial)` → `.value()` / `.set()` | Accessor vs object API |
| `createMemo(fn)` | `computed(fn)` | Cached derived |
| `createEffect(fn)` | `effect(fn)` | Auto-tracked deps |
| `createRenderEffect` | rare — use `effect` | Runs before paint |
| `batch(fn)` | `batch(fn)` | Coalesce writes |
| `on(fn, fn2)` | explicit in effect | Event wiring |
| `onCleanup(fn)` | `cleanup` / effect dispose | Teardown |
| `untrack(fn)` | read without subscribe | Advanced |
| `createRoot` | `scope` | Isolate effects |
| `children()` helper | explicit children props | HyperDOM children |
| `mergeProps` | object spread on `h()` | Manual merge |
| `splitProps` | destructure in view | TS destructuring |

```tsx
// Solid
const [count, setCount] = createSignal(0);
const double = createMemo(() => count() * 2);
createEffect(() => console.log(double()));
setCount((n) => n + 1);
```

```ts
// EchoJS
import { signal, computed, effect } from "@echojs-ecosystem/reactivity";

const count = signal(0);
const double = computed(() => count.value() * 2);
effect(() => console.log(double.value()));
count.update((n) => n + 1);
```

### Solid is not React (common trap)

| Looks like React | Solid reality |
| --- | --- |
| `function Component()` | Runs **once**, not per update |
| `props.count` | Accessors — `props.count()` if signal-backed |
| Re-assign JSX vars | **Not** how updates work — signals drive DOM |
| `useState` mental model | Wrong — use `createSignal` |

Echo avoids this trap entirely — no hook lookalikes.

---

## Solid components vs Echo models/views

### Solid component model

```tsx
function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      {count()}
    </button>
  );
}
```

The function body runs **once**. JSX describes **bindings**, not re-execution.

### Echo model + view

```ts
export const createCounterModel = createModel(() => {
  const count = signal(0);
  return { count, inc: () => count.update((c) => c + 1) };
});

export const CounterView = createView((vm) =>
  button({ onClick: vm.inc }, () => String(vm.count.value())),
);
```

| Concern | Solid | EchoJS |
| --- | --- | --- |
| State + logic | inside component | `*.model.ts` |
| DOM | JSX in same file | `*.view.ts` |
| Page wiring | route → component | page `bindModelView` |
| Testing | `@solidjs/testing-library` | test model without DOM |
| Reuse | split functions / stores | feature models + entities |

**Echo enforces separation** in docs; Solid **allows** mixing — teams must discipline themselves.

---

## JSX vs HyperDOM

| Feature | Solid JSX | Echo HyperDOM |
| --- | --- | --- |
| Syntax | `<div class="x">` | `div({ class: "x" }, [...])` |
| Dynamic text | `{count()}` | `() => String(count.value())` |
| Events | `onClick={fn}` | `onClick: fn` |
| Boolean attrs | JSX rules | explicit props |
| Fragments | `<>...</>` | child arrays |
| Portal | `<Portal>` | HyperDOM portal patterns |
| Dynamic tag | `<Dynamic component={C}>` | conditional `h()` |
| SSR markers | `hydratable` APIs | SPA-first |

**Migration effort:** plan a **view rewrite**, not a signal rewrite. Reactivity ports in hours; templates port in days per feature.

---

## Control flow & UI primitives

| Solid | EchoJS |
| --- | --- |
| `<Show when={cond}>` | `Show({ when, children })` |
| `<For each={list}>` | `.map` with keys |
| `<Switch>` / `<Match>` | `if/else` in view or `Show` |
| `<Index>` (index list) | map by index when needed |
| `<Suspense>` | route `loadingView`, query pending |
| `<ErrorBoundary>` | route `errorView` |
| `lazy()` | dynamic import on route |
| `children` prop | children functions |

```tsx
// Solid
<Show when={user()} fallback={<Spinner />}>
  <Profile user={user()!} />
</Show>
```

```ts
// Echo (illustrative)
Show({
  when: () => vm.user.value(),
  fallback: () => Spinner(),
  children: () => ProfileView(vm),
});
```

---

## Architecture & folder structure

### Typical Solid app

```
src/
  components/     # shared + feature mixed
  routes/         # file routes (SolidStart) or router config
  stores/         # createStore modules
  lib/            # utilities
```

Imports between features are **unrestricted** unless you add lint boundaries.

### EchoJS feature-first

| Layer | Role | Imports |
| --- | --- | --- |
| **App** | `createEchoApp`, providers | downward |
| **Pages** | routes, `bindModelView` | features, entities, widgets |
| **Widgets** | shell UI | features, entities |
| **Features** | capabilities | **entities + shared** |
| **Entities** | domain, API, routes | shared |
| **Shared** | pure | — |

:::callout type=tip
SolidStart `routes/` files map to Echo **pages** + `entities/__routes__` — keep URLs stable when migrating.
:::

### Solid patterns → Echo

| Solid | EchoJS |
| --- | --- |
| Component per feature | `features/x/ui` + `model` |
| `createContext` | `provide` / `inject` |
| Module stores | `@echojs-ecosystem/store` in entity |
| `createResource` in component | `createQuery` in model |
| Route `load` (Start) | `beforeLoad` |

---

## State: five kinds + Solid libraries

| State kind | Solid | EchoJS |
| --- | --- | --- |
| **Local UI** | `createSignal` | `signal` in model |
| **Screen** | component + memos | `createModel` |
| **Server / cache** | `createResource`, TanStack Query | `@echojs-ecosystem/query` |
| **URL** | router search, `useSearchParams` | `@echojs-ecosystem/url-state` |
| **App client** | `createStore`, context | `@echojs-ecosystem/store` + `@echojs-ecosystem/persist` |

### Library-by-library

| Library | Solid role | EchoJS |
| --- | --- | --- |
| **solid-js/store** `createStore` | nested immutable store | `@echojs-ecosystem/store` |
| **solid-js/store** `produce` | Immer-like | `store.update` |
| **context API** | DI + theme | framework `inject` |
| **@tanstack/solid-query** | `createQuery` | `@echojs-ecosystem/query` (same concepts) |
| **solid-primitives** | utilities | `shared/` + model |
| **@solidjs/meta** | head tags | SPA head / future SSR |
| **valtio** (rare) | proxy state | signals / store |
| **xstate** | machines | model transitions |

> [!WARNING] `createStore` everywhere
> Solid store is powerful — resist mirroring a single global `createStore` for API + UI + URL. Use **query + url-state + store** split like other guides.

---

## Async: createResource, Query, mutations

### createResource

```tsx
// Solid
const [user] = createResource(() => params.id, fetchUser);
return <Show when={!user.loading}>{user()?.name}</Show>;
```

```ts
// EchoJS
const user = userQuery.with(() => ({ id: params.id }));
// user.isPending(), user.data() in view
```

| createResource | `@echojs-ecosystem/query` |
| --- | --- |
| Source + fetcher | `queryKey` + `queryFn` |
| `refetch` | invalidate / refetch |
| Deduplication | query client cache |
| SSR on Start | `beforeLoad` + hydration TBD on Echo |

### TanStack Query (Solid)

| TanStack Solid | EchoJS |
| --- | --- |
| `useQuery(() => ({ queryKey, queryFn }))` | `createQuery` + `.with()` |
| `useMutation` | `createMutation` |
| `QueryClientProvider` | query provider on app |

Echo aligns closely with TanStack patterns — **easier port from Solid+Query than from raw createResource**.

### Mutations

```tsx
// Solid mutation (TanStack)
const mutation = createMutation(() => ({ mutationFn: saveUser }));
```

```ts
// Echo
export const saveUserMutation = createMutation({
  mutationFn: (input: UserInput) => api.users.save(input),
});
```

---

## Routing: Solid Router & SolidStart

### @solidjs/router

| Solid Router | `@echojs-ecosystem/router` |
| --- | --- |
| `<Router>` + routes | `createRouter` + `createRoutes` |
| `<Route path="/users/:id">` | `{ path: "users/:id", routeView }` |
| `useParams()` | `params` on route view |
| `useNavigate()` | `router.go()` |
| `<A href>` | `NavLink` |
| `load` / `action` (Start) | `beforeLoad` |
| Preload | `beforeLoad` + query prefetch |

```ts
export const userPage = createRouteView({
  name: "user",
  view: ({ params, data }) => UserView({ id: params.id, profile: data }),
  beforeLoad: ({ params }) => fetchUser(params.id),
});
```

### SolidStart

| SolidStart | EchoJS |
| --- | --- |
| File-based routes in `routes/` | code route table |
| Vinxi / Nitro server | Vite SPA (reference apps) |
| SSR + islands | CSR today |
| Server functions | API routes external |
| `createAsync` | query + `beforeLoad` |
| Deploy to Netlify/Vercel | static SPA hosting |

---

## SSR, streaming, and deployment

| Need | SolidStart | EchoJS |
| --- | --- | --- |
| SSR HTML | built-in | plan separately |
| Streaming | supported | N/A today |
| Hydration | `hydrate` APIs | N/A |
| SEO marketing | SolidStart SSG | split stack or prerender |
| Client dashboard | CSR | primary target |

:::callout type=note
Teams on SolidStart for SSR often keep **marketing on Start** and move **authenticated app** to Echo SPA — same split as Next/Nuxt.
:::

---

## Forms & validation

| Tool | Solid | EchoJS |
| --- | --- | --- |
| **@modular-forms/solid** | headless forms | model signals |
| **felte** | form helpers | model actions |
| **Zod** | schema | validate in `computed` |
| Controlled signals | `createSignal` per field | same in model |

```ts
export const createLoginModel = createModel(() => {
  const email = signal("");
  const password = signal("");
  const errors = computed(() => validateLogin(email.value(), password.value()));
  const submit = () => loginMutation.mutate({ email: email.value(), password: password.value() });
  return { email, password, errors, submit };
});
```

---

## UI libraries & styling

| Library | Solid | EchoJS |
| --- | --- | --- |
| **Kobalte** | headless a11y | `@echojs-ecosystem/ui` |
| **hope-ui** | component kit | feature views |
| **solid-ui** | shadcn port | Tailwind + ui package |
| **Tailwind** | common | docs/example |
| **UnoCSS** | supported | Vite |
| **solid-motionone** | animations | CSS / WAAPI |
| **corvu** | primitives | ui package roadmap |

Solid UI libs **do not port** — rebuild screens in HyperDOM or wrap raw DOM (not recommended).

---

## Auth & session

| Pattern | Solid | EchoJS |
| --- | --- | --- |
| Context session | `createContext` | `sessionStore` |
| Route guards | `Route` `beforeEnter` | `beforeLoad` |
| OAuth libs | community | provider + store |
| Protected `<Show>` | role signal | `computed` + `Show` |

---

## Errors, Suspense, boundaries

| Solid | EchoJS |
| --- | --- |
| `<ErrorBoundary fallback>` | `errorView` on route |
| `<Suspense>` | `loadingView`, query `isPending` |
| `createResource` loading | query pending state |
| Top-level boundary | app widget + route errors |

---

## Performance & bundle

| Topic | Solid | EchoJS |
| --- | --- | --- |
| Runtime size | very small core | modular `@echojs-ecosystem/*` |
| Compile JSX | babel/solid plugin | no JSX compile step |
| List performance | `<For>` keyed | map + signal per row |
| Dev rebuild | fast HMR | Vite HMR |
| Benchmarks | strong 10k updates | see home Compare (mock) |

Both avoid VDOM — differences show up in **ecosystem weight** and **view authoring style**, not fundamental update algorithm for simple counters.

---

## Testing & DevTools

| Tool | Solid | EchoJS |
| --- | --- | --- |
| **@solidjs/testing-library** | mount component | integration tests on views |
| **Vitest** | unit | unit on **models** |
| **@solidjs/testing-library** `userEvent` | UI tests | Playwright e2e |
| **DevTools** | Solid Inspector | `@echojs-ecosystem/devtools` planned |

```ts
const vm = createCartModel({ userId: "1" });
vm.addItem("sku_1");
expect(vm.total.value()).toBe(19.99);
```

---

## Master ecosystem map

### Core

| Problem | Solid | EchoJS |
| --- | --- | --- |
| Runtime | `solid-js` | `@echojs-ecosystem/reactivity` + `@echojs-ecosystem/hyperdom` |
| JSX compile | `babel-preset-solid` | none (TS views) |
| Bootstrap | `render(() => …)` | `createEchoApp().mount()` |

### Routing & data

| Problem | Solid | EchoJS |
| --- | --- | --- |
| Router | `@solidjs/router` | `@echojs-ecosystem/router` |
| Meta | SolidStart | `@echojs-ecosystem/framework` |
| REST cache | TanStack Query / resource | `@echojs-ecosystem/query` |
| URL state | manual / router | `@echojs-ecosystem/url-state` |
| Persist | localStorage manual | `@echojs-ecosystem/persist` |

### UI & i18n

| Problem | Solid | EchoJS |
| --- | --- | --- |
| Components | Kobalte, corvu | `@echojs-ecosystem/ui` |
| i18n | `@solid-primitives/i18n` | `@echojs-ecosystem/i18n` |
| Icons | solid-icons | SVG in views |

### Quality

| Problem | Solid | EchoJS |
| --- | --- | --- |
| Lint | eslint-plugin-solid | ESLint TS |
| E2E | Playwright | Playwright |

---

## Providers & context

```tsx
// Solid context
const ThemeCtx = createContext();
export function App() {
  return (
    <ThemeCtx.Provider value={theme}>
      <Router />
    </ThemeCtx.Provider>
  );
}
```

```ts
// EchoJS
createEchoApp({ root: () => AppRoot(), strictContextChecks: true })
  .use(uiProvider)
  .use(routerProvider)
  .use(queryProvider)
  .mount("#app");
```

| Concern | Solid | Echo |
| --- | --- | --- |
| Context | `createContext` / `useContext` | `inject` |
| Provider order | nesting in JSX | `.use()` chain |
| Missing provider | undefined | dev strict check |

---

## TypeScript & DX

| Topic | Solid | EchoJS |
| --- | --- |
| Component props | `ComponentProps` | view prop types |
| Signal types | `Accessor<T>` | `Signal<T>` / return of `signal()` |
| Generic components | JSX generics | generic view factories |
| Route typing | Solid Router types | route table names |
| Strict ESLint | `eslint-plugin-solid` | no “components run once” rule needed |

Echo views are **plain TS** — no JSX compiler plugin in CI.

---

## Migration cookbook

### Phase 0 — Inventory

1. List routes (Router config or SolidStart `routes/`).
2. Find `createResource` and TanStack queries.
3. Map `createStore` modules to five kinds.
4. Note SolidStart-only server APIs.

### Phase 1 — Shell

1. `createEchoApp` + providers.
2. Port routes — **same paths**.
3. Layout widget.

### Phase 2 — Data

1. `createResource` → `createQuery`.
2. TanStack Solid → Echo query definitions (often copy `queryKey` / `queryFn`).
3. Global `createStore` → split store / query / url-state.

### Phase 3 — UI

1. Extract component logic → `createModel`.
2. Rewrite JSX → HyperDOM per view.
3. Replace Kobalte with `@echojs-ecosystem/ui` where possible.

### Phase 4 — Cleanup

1. Remove `solid-js` deps from migrated app.
2. Delete unused context providers → inject tokens.

### Solid → Echo cheat sheet

| Solid | Echo |
| --- | --- |
| `createSignal` | `signal` |
| `createMemo` | `computed` |
| `createEffect` | `effect` |
| `createResource` | `createQuery` |
| `createStore` | `createStore` |
| `useContext` | `inject` |
| `useParams` | route `params` |
| `useNavigate` | `router.go()` |
| `<Show>` | `Show` |
| `<For>` | `.map` |
| Component file | `model` + `view` |

---

## Anti-patterns when porting from Solid

| Anti-pattern | Fix |
| --- | --- |
| Copy JSX 1:1 without models | model first |
| One giant `createStore` | query + url-state |
| `createResource` per keystroke | derived query key in `.with()` |
| Mixing feature imports | feature-first boundaries |
| Expecting components to re-run | Echo views still bind signals — don’t imperatively mutate DOM |
| SolidStart server in view | `beforeLoad` + api layer |

---

## Decision matrix

| Stay on Solid | Choose EchoJS |
| --- | --- |
| SolidStart SSR is core | Echo monorepo SPA |
| Team loves JSX + small core | Want enforced architecture |
| Kobalte UI investment | `@echojs-ecosystem/ui` + HyperDOM OK |
| Already shipped Solid app | Greenfield or gradual port |
| Hire Solid specialists | Standardize on Echo packages |

---

## FAQ

### Is Echo a fork of Solid?

No. Shared **signal-first** ideas; different view layer (HyperDOM), platform packages, and **feature-first** docs.

### Can we use Solid JSX components in Echo?

Not natively. Rewrite to HyperDOM or isolate in a separate Solid island (expensive).

### `createSignal` vs `signal`?

Same role. Echo uses object API (`.value()`); Solid uses tuple/getter `count()`.

### TanStack Query port?

Often **direct** — keys and fetchers move; binding becomes `.with()` in models.

### SolidStart server functions?

Keep on Nitro or move to your API; Echo client uses `queryFn` + `fetch`.

---

## Summary

| Dimension | Solid + ecosystem | EchoJS |
| --- | --- | --- |
| Reactivity | Nearly identical primitives | `signal` / `computed` / `effect` |
| Views | JSX (compile-time bindings) | HyperDOM TS |
| Architecture | Optional discipline | Feature-first rules |
| Data | Resource + TanStack | `@echojs-ecosystem/query` |
| Routing | solid-router / Start | `@echojs-ecosystem/router` |
| SSR | SolidStart | SPA-first |
| Platform | Minimal + community | Integrated `@echojs-ecosystem/*` |

**Other guides:** [Comparisons index](/docs/comparisons) · [React](/docs/comparisons/react) · [Vue](/docs/comparisons/vue) · [Angular](/docs/comparisons/angular) · [Svelte](/docs/comparisons/svelte)

## Related docs

- [@echojs-ecosystem/reactivity](/docs/packages/reactivity)
- [Feature-first design](/docs/architecture/feature-first)
- [Dependency flow](/docs/architecture/dependency-flow)
- [State overview](/docs/state/overview)
- [Data fetching](/docs/guides/data-fetching)
- [Providers](/docs/architecture/providers)
