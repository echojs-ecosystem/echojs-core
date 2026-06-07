---
title: EchoJS vs React + ecosystem
description:
  Deep comparison — reactivity, React 19, meta-frameworks, state, routing, data,
  SSR/RSC, and full ecosystem mapping to EchoJS.
keywords:
  react, hooks, redux, react query, react router, next.js, signals,
  architecture, state, tanstack, zustand
---

# EchoJS vs React + ecosystem

React is a **UI runtime** (reconcile a component tree) surrounded by a **huge
optional ecosystem**. EchoJS is a **platform**: signal-first rendering,
documented **feature-first** structure, and first-party packages for routing,
async data, URL state, persistence, UI, and i18n — wired once through
`createEchoApp()`.

This guide is the **primary migration reference** for teams who know React,
Next.js, and the usual npm stack. It goes deep on **what maps to what**, **what
does not exist yet**, and **how to avoid re-building React’s worst habits** on
EchoJS.

## Table of contents (on this page)

1. [At a glance](#at-a-glance)
2. [Runtime & reactivity](#runtime-reactivity)
3. [React 18/19 features vs EchoJS](#react-1819-features-vs-echojs)
4. [Rendering: JSX, lists, refs, portals](#rendering-jsx-lists-refs-portals)
5. [Architecture & folder structure](#architecture-folder-structure)
6. [State: five kinds + React libraries](#state-five-kinds-react-libraries)
7. [Async data: Query, SWR, Apollo, RTK Query](#async-data-query-swr-apollo-rtk-query)
8. [Routing: React Router, TanStack Router, Next](#routing-react-router-tanstack-router-next)
9. [Meta-frameworks & deployment](#meta-frameworks-deployment)
10. [SSR, RSC, and SEO](#ssr-rsc-and-seo)
11. [Forms & validation](#forms-validation)
12. [Styling & design systems](#styling-design-systems)
13. [Auth & session](#auth-session)
14. [Errors, loading, Suspense](#errors-loading-suspense)
15. [Performance & memoization](#performance-memoization)
16. [Testing & DevTools](#testing-devtools)
17. [Master ecosystem map](#master-ecosystem-map)
18. [Provider composition](#provider-composition)
19. [TypeScript & DX](#typescript-dx)
20. [Migration cookbook](#migration-cookbook)
21. [Anti-patterns](#anti-patterns-when-porting-from-react)
22. [Decision matrix](#decision-matrix)
23. [FAQ](#faq)
24. [Summary](#summary)

---

## At a glance

| Dimension              | React + typical ecosystem                       | EchoJS                                                    |
| ---------------------- | ----------------------------------------------- | --------------------------------------------------------- |
| **Core loop**          | Render components → VDOM diff → patch DOM       | Read signals → run effects/computed → write DOM nodes     |
| **Granularity**        | Component (unless Compiler/memo)                | Signal / binding                                          |
| **Virtual DOM**        | Yes (core model)                                | No                                                        |
| **Structure**          | Team convention, lint rules optional            | **Feature-first** dependency direction (documented)       |
| **Routing**            | React Router, TanStack Router, Next file routes | `@echojs-ecosystem/router` (typed route table)            |
| **Server / cache**     | TanStack Query, SWR, Apollo, RTK Query          | `@echojs-ecosystem/query`                                 |
| **Client global**      | Redux, Zustand, Jotai, Context                  | `@echojs-ecosystem/store` (+ `@echojs-ecosystem/persist`) |
| **URL state**          | `useSearchParams`, nuqs, manual                 | `@echojs-ecosystem/url-state`                             |
| **UI**                 | MUI, Chakra, Radix + shadcn, Ant Design         | `@echojs-ecosystem/hyperdom` + `@echojs-ecosystem/ui`     |
| **App shell**          | Next.js, Remix, Vite SPA                        | `@echojs-ecosystem/framework` + Vite (reference apps)     |
| **Hooks rules**        | Yes (eslint-plugin-react-hooks)                 | No — models are plain functions                           |
| **Official SSR story** | Next / Remix mature                             | SPA-first today; plan SSR separately                      |

> [!NOTE] Performance numbers Illustrative benchmarks are on the
> [home page Compare section](/). Treat them as layout previews until official
> lab results ship.

---

## Runtime & reactivity

### How React schedules work

1. State update (hook, context, external store) marks a component dirty.
2. React re-runs the component function (and often children).
3. Reconciliation compares the new virtual tree to the previous one.
4. Commit phase applies DOM mutations.

Cost grows with **tree shape** and **how much you memoize**, not only with the
one label that changed.

### How EchoJS schedules work

1. `signal.set` / `store.update` notifies subscribers.
2. `computed` and `effect` re-run by dependency graph.
3. HyperDOM bindings update **the DOM nodes that subscribed** to those signals.

There is **no global “render this component subtree”** step analogous to
`function App() { ... }` re-executing.

```tsx
// React — entire Counter function re-runs
function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN((x) => x + 1)}>{n}</button>
}
```

```ts
// EchoJS — model + view; text node subscribed to count
import { signal } from '@echojs-ecosystem/reactivity'
import { createModel, createView, button } from '@echojs-ecosystem/hyperdom'

export const createCounterModel = createModel(() => {
  const count = signal(0)
  return { count, inc: () => count.update((n) => n + 1) }
})

export const CounterView = createView((vm) =>
  button({ onClick: vm.inc }, () => String(vm.count.value()))
)
```

### React primitives → EchoJS

| React                  | EchoJS                                 | Notes                                  |
| ---------------------- | -------------------------------------- | -------------------------------------- |
| `useState`             | `signal`                               | Explicit `.value()` / `.set()`         |
| `useReducer`           | `signal` + `computed` or `createStore` | Store for structured transitions       |
| `useMemo`              | `computed`                             | Cached derived signal                  |
| `useCallback`          | Stable methods on model/store          | No identity churn for child memo       |
| `useEffect`            | `effect`                               | Same dependency idea, no hook ordering |
| `useLayoutEffect`      | `effect` + sync DOM reads in view      | Prefer binding over post-paint fixes   |
| `useRef` (DOM)         | element refs via HyperDOM              | See HyperDOM usage docs                |
| `useContext`           | `provide` / `inject`                   | Via `@echojs-ecosystem/framework`      |
| `useSyncExternalStore` | `subscribe` on signals / store         | Rare at app level                      |
| `useImperativeHandle`  | expose API from model                  | No forwardRef ceremony                 |
| Custom hooks           | `createModel` factories                | Testable without `renderHook` wrappers |

### External stores (Redux, Zotai) in React

React 18+ integrates external stores via `useSyncExternalStore`. EchoJS prefers
**first-class signals** or `@echojs-ecosystem/store` so the UI graph and the
state graph share the same reactivity semantics.

---

## React 18/19 features vs EchoJS

| Feature                      | React                            | EchoJS                                                            |
| ---------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| **Concurrent rendering**     | Transitions, concurrent features | `batch()` coalesces signal updates; no concurrent VDOM            |
| **`useTransition`**          | Mark updates low priority        | Usually unnecessary — updates are localized                       |
| **`useDeferredValue`**       | Defer expensive render           | `computed` or throttle in model                                   |
| **Suspense for data**        | Boundaries + promises            | Router `loadingView`, query pending signals                       |
| **Suspense for code**        | `React.lazy`                     | Dynamic `import()` + route lazy pages                             |
| **Server Components (RSC)**  | Server-only components           | **Not equivalent** — Echo apps today are client-rendered SPAs     |
| **Server Actions**           | Mutations from server            | Use API routes / `fetch` in `queryFn` / mutations                 |
| **React Compiler**           | Auto-memoize components          | N/A — no component re-render loop                                 |
| **`use()` / Actions (19)**   | Async in render                  | Async stays in `beforeLoad` / query, not in view body             |
| **`useOptimistic`**          | Optimistic UI                    | Mutation + manual signal patch in model (patterns in Query guide) |
| **Strict Mode double mount** | Dev-only double invoke           | Different lifecycle — see HyperDOM mount rules                    |

:::callout type=warning **Do not expect RSC or Server Actions to port 1:1.** If
your product is built on Next.js App Router server components, EchoJS migration
is a **client-app rewrite**, not a drop-in runtime swap. :::

---

## Rendering: JSX, lists, refs, portals

| Topic             | React                     | EchoJS                                      |
| ----------------- | ------------------------- | ------------------------------------------- |
| Syntax            | JSX                       | `h()` / DSL + `createView`                  |
| Conditional       | `{cond && <A />}`         | `Show({ when, children })` or `() => child` |
| Lists             | `.map` → keys on elements | `.map` with stable keys on `h()` children   |
| Fragments         | `<>...</>`                | arrays of children                          |
| Portals           | `createPortal`            | HyperDOM portal patterns (see package docs) |
| Event delegation  | Synthetic events          | DOM events on created nodes                 |
| Controlled inputs | `value` + `onChange`      | Bind `value` signal to input props          |

**JSX → HyperDOM** is the largest syntax migration. Reactivity and state
patterns migrate more directly than templates.

---

## Architecture & folder structure

### Typical React drift

| Folder               | What goes wrong                  |
| -------------------- | -------------------------------- |
| `components/`        | God components, props drilling   |
| `hooks/`             | Business logic far from features |
| `pages/`             | Imports from anywhere            |
| `store/` or `redux/` | One slice per unrelated concern  |
| `utils/`             | Becomes junk drawer              |

Boundaries are **social**, not structural — unless you adopt a meta-framework
with opinions.

### EchoJS feature-first (enforced in docs)

| Layer        | Responsibility                         | May import from                            |
| ------------ | -------------------------------------- | ------------------------------------------ |
| **App**      | `createEchoApp`, providers, global CSS | entities, features, pages, widgets, shared |
| **Pages**    | Route entry, `bindModelView`           | features, entities, widgets, shared        |
| **Widgets**  | Shells: sidebar, header, doc layout    | features, entities, shared                 |
| **Features** | User-facing capability                 | **entities + shared only**                 |
| **Entities** | Domain types, API, `__routes__`        | shared only                                |
| **Shared**   | Pure utils, tokens                     | —                                          |

Reference layouts: `apps/example`, `apps/docs`.

:::callout type=tip Read
[Feature-first design](/docs/architecture/feature-first) and
[Dependency flow](/docs/architecture/dependency-flow) before moving a React
monolith folder-by-folder. :::

### React patterns → EchoJS home

| React habit                | EchoJS home                                           |
| -------------------------- | ----------------------------------------------------- |
| Smart + dumb components    | `*.model.ts` + `*.view.ts`                            |
| Container / presentational | Page binds model → view                               |
| Custom hook per feature    | `createFeatureModel()`                                |
| Prop drilling              | `inject()` for rare cross-cutting; prefer composition |
| Compound components        | Widgets + small views                                 |
| Render props               | `() => reactive child` in HyperDOM                    |
| HOCs                       | `createView` wrappers (rare)                          |

---

## State: five kinds + React libraries

EchoJS classifies state **by kind** so you do not dump everything into Redux or
Context.

| State kind         | Holds                      | React + ecosystem                   | EchoJS                                                  |
| ------------------ | -------------------------- | ----------------------------------- | ------------------------------------------------------- |
| **Local UI**       | modals, hover, field focus | `useState`                          | `signal` in model                                       |
| **Screen model**   | step wizard, derived UI    | hooks + `useMemo`                   | `createModel`                                           |
| **Server / async** | API lists, detail          | React Query, SWR, Apollo, RTK Query | `@echojs-ecosystem/query`                               |
| **URL**            | filters, tab, pagination   | `useSearchParams`, nuqs             | `@echojs-ecosystem/url-state`                           |
| **App client**     | session, theme, cart       | Redux, Zustand, Jotai, Context      | `@echojs-ecosystem/store` + `@echojs-ecosystem/persist` |

### Library-by-library (client state)

| Library                   | React role              | EchoJS replacement                                       |
| ------------------------- | ----------------------- | -------------------------------------------------------- |
| **Redux Toolkit**         | Global normalized store | `@echojs-ecosystem/store` + feature-local models         |
| **Zustand**               | Lightweight global      | `createStore` or feature model                           |
| **Jotai / Recoil**        | Atomic global           | `signal` / small stores                                  |
| **MobX**                  | Observable OOP          | `signal` + `computed` (similar mental model)             |
| **Context**               | DI + theme + session    | `provide` / `inject`, `@echojs-ecosystem/ui` theme       |
| **Apollo Client (local)** | Cache + local state     | `@echojs-ecosystem/query` for server; store for UI       |
| **react-use** misc        | One-off hooks           | model methods or `core/` utils                           |
| **Immer**                 | Immutable patches       | `store.update` / `set` with spread                       |
| **xstate**                | State machines          | model + explicit transitions (or port machine in shared) |

> [!WARNING] Avoid mirroring Redux on day one Most React apps are
> **over-centralized**. Split by kind first; delete redundant global slices
> early.

### Local UI — side by side

```tsx
// React
const [open, setOpen] = useState(false)
```

```ts
// EchoJS
export const createPanelModel = createModel(() => {
  const open = signal(false)
  return { open, toggle: () => open.set(!open.value()) }
})
```

### Global store — Redux vs Echo

```ts
// Redux Toolkit (simplified)
const slice = createSlice({
  name: 'session',
  initialState: { token: null as string | null },
  reducers: {
    setToken: (s, a) => {
      s.token = a.payload
    },
  },
})
```

```ts
// EchoJS store
import { createStore, withActions } from '@echojs-ecosystem/store'

export const sessionStore = createStore({
  token: null as string | null,
}).extend(
  withActions((store) => ({
    setToken: (token: string | null) => store.set({ token }),
    logout: () => store.reset(),
  }))
)
```

---

## Async data: Query, SWR, Apollo, RTK Query

### TanStack Query → `@echojs-ecosystem/query`

| TanStack Query                    | EchoJS                                      |
| --------------------------------- | ------------------------------------------- |
| `useQuery({ queryKey, queryFn })` | `createQuery({ queryKey, queryFn, name })`  |
| `useMutation`                     | `createMutation`                            |
| `queryClient.invalidateQueries`   | query client on provider                    |
| `enabled` option                  | `.with(() => ({ enabled: ... }))`           |
| `select`                          | `computed` over query result in model       |
| Hook per component                | **One definition**, many `.with()` bindings |

```ts
// Definition (entity or feature api layer)
export const usersQuery = createQuery({
  name: 'users',
  queryKey: () => ['users'] as const,
  queryFn: ({ signal }) => api.users.list({ signal }),
})
```

```ts
// Model — bind params reactively
export const createUsersPageModel = createModel(() => {
  const q = usersQuery.with()
  const rows = computed(() => q.data() ?? [])
  return { q, rows }
})
```

```ts
// View — read signals (no hook)
export const UsersView = createView((vm) =>
  div(null, [
    () => (vm.q.isPending() ? p(null, 'Loading…') : null),
    ul(null, () => vm.rows.value().map((u) => li(null, u.name))),
  ])
)
```

### SWR

| SWR                    | EchoJS                                       |
| ---------------------- | -------------------------------------------- |
| `useSWR(key, fetcher)` | `createQuery` with key factory               |
| `mutate`               | invalidate / setQueryData patterns on client |
| Revalidate on focus    | configure on query client (see Usage)        |

### Apollo Client

| Apollo                     | EchoJS                                                         |
| -------------------------- | -------------------------------------------------------------- |
| GraphQL queries            | `queryFn` calling GraphQL endpoint                             |
| Normalized cache           | Not built-in — model + store for normalized entities if needed |
| `useQuery` / `useMutation` | `createQuery` / `createMutation`                               |
| Subscriptions              | WebSocket + `effect` or dedicated client (roll your own)       |

### RTK Query

| RTK Query           | EchoJS                               |
| ------------------- | ------------------------------------ |
| API slices          | `createQuery` per endpoint           |
| Tags / invalidation | query client invalidation            |
| Generated hooks     | No codegen required — TS infers keys |

---

## Routing: React Router, TanStack Router, Next

### React Router 6/7

| React Router           | `@echojs-ecosystem/router`        |
| ---------------------- | --------------------------------- |
| `<Routes>` / `<Route>` | `createRoutes([...])` tree        |
| `useParams()`          | `params` on route view            |
| `useNavigate()`        | `router.go()`                     |
| `<Link>`               | `NavLink`                         |
| Loaders (RR 6.4+)      | `beforeLoad` on `createRouteView` |
| `errorElement`         | `errorView`                       |
| Lazy `React.lazy`      | lazy route modules in table       |

```ts
export const userPage = createRouteView({
  name: 'user',
  view: ({ params, data }) => UserView({ id: params.id, data }),
  beforeLoad: async ({ params }) => fetchUser(params.id),
  loadingView: () => RouterLoading(),
  errorView: ({ error }) => RouterError(error),
})
```

### TanStack Router

| TanStack Router           | EchoJS                                          |
| ------------------------- | ----------------------------------------------- |
| File-based or code routes | Code-first route table in `entities/__routes__` |
| Type-safe params          | Typed route names + params                      |
| Search param schemas      | `@echojs-ecosystem/url-state` parsers           |
| Router context            | `inject(router)`                                |

### Next.js App Router

| Next.js                              | EchoJS                                        |
| ------------------------------------ | --------------------------------------------- |
| `app/page.tsx`                       | `pages/*/*.page.ts` + route registration      |
| `layout.tsx`                         | `createLayoutView`                            |
| `loading.tsx`                        | `loadingView`                                 |
| `error.tsx`                          | `errorView`                                   |
| Server Components                    | **No direct equivalent**                      |
| `generateMetadata`                   | SPA: meta via head management / SSR layer TBD |
| Middleware                           | server / edge — outside Echo client router    |
| `useRouter()` from `next/navigation` | `@echojs-ecosystem/router` signals            |

Keep **URLs stable** when migrating so SEO bookmarks and API callbacks still
work.

---

## Meta-frameworks & deployment

| Stack            | Role                   | EchoJS analogue                                     |
| ---------------- | ---------------------- | --------------------------------------------------- |
| **CRA** (legacy) | Bundled SPA            | Vite + `createEchoApp`                              |
| **Vite + React** | Modern SPA             | Vite + Echo packages (same bundler)                 |
| **Next.js**      | SSR, RSC, API routes   | Echo **SPA**; API stays separate or future SSR      |
| **Remix**        | Web standards, loaders | `beforeLoad` + query (similar data-on-navigation)   |
| **Gatsby**       | SSG content            | SSG is build-time; Echo for app shell after hydrate |
| **Expo / RN**    | Mobile                 | **Not covered** — stay React Native                 |
| **Electron**     | Desktop shell          | Can host Echo SPA in WebView                        |

Deployment today matches any **static/Vite SPA**: `apps/docs`, `apps/example`.

---

## SSR, RSC, and SEO

| Need               | React world                | EchoJS today                           |
| ------------------ | -------------------------- | -------------------------------------- |
| Marketing SEO      | Next SSG/SSR, Astro        | Plan SSR or prerender; docs app is CSR |
| Authenticated app  | CSR fine                   | Echo target use case                   |
| Streaming HTML     | RSC + Suspense             | Not built-in                           |
| Hydration mismatch | `suppressHydrationWarning` | N/A without SSR                        |

:::callout type=note **Pragmatic path:** public marketing on Next/Astro; product
app in EchoJS SPA behind auth — common split for teams leaving pure Next. :::

---

## Forms & validation

| Tool                     | React                   | EchoJS                                  |
| ------------------------ | ----------------------- | --------------------------------------- |
| **React Hook Form**      | Uncontrolled + register | Model-owned signals per field           |
| **Formik**               | Controlled form state   | `createModel` form slice                |
| **Zod / Yup**            | Schema validation       | Validate in model actions before submit |
| **@tanstack/react-form** | Headless form           | Model + store pattern                   |
| **Final Form**           | Subscriptions           | `computed` for errors                   |

Pattern: **one model per form** — field signals, `computed` for `canSubmit`,
`createMutation` for POST.

```ts
// EchoJS shape (illustrative)
export const createLoginModel = createModel(() => {
  const email = signal('')
  const password = signal('')
  const errors = computed(() =>
    validate({ email: email.value(), password: password.value() })
  )
  const submit = () =>
    loginMutation.mutate({ email: email.value(), password: password.value() })
  return { email, password, errors, submit }
})
```

---

## Styling & design systems

| Approach                        | React                 | EchoJS                                                       |
| ------------------------------- | --------------------- | ------------------------------------------------------------ |
| **Tailwind**                    | Very common           | Used in docs/example (`tailwind-variants`)                   |
| **CSS Modules**                 | `*.module.css`        | Global + component classes on `h()` props                    |
| **styled-components / Emotion** | CSS-in-JS             | Prefer TV / Tailwind (no runtime CSS-in-JS in core)          |
| **MUI / Chakra / Ant**          | Large component libs  | `@echojs-ecosystem/ui` primitives; wrap if porting gradually |
| **Radix + shadcn**              | Copy-paste components | Rebuild as HyperDOM views or wrap DOM                        |
| **Framer Motion**               | Animation             | CSS / WAAPI / targeted transitions in views                  |

---

## Auth & session

| Pattern                      | React                    | EchoJS                                                                  |
| ---------------------------- | ------------------------ | ----------------------------------------------------------------------- |
| **Auth0 / Clerk / NextAuth** | React SDKs               | Same OAuth flows; session in `sessionStore`                             |
| **JWT in memory**            | Context                  | `createStore` + optional `@echojs-ecosystem/persist` (careful with XSS) |
| **Cookie session**           | HTTP-only cookie         | `fetch` credentials; `beforeLoad` guards                                |
| **Route guards**             | `<ProtectedRoute>`       | `beforeLoad` redirect                                                   |
| **RBAC**                     | HOC / wrapper components | model `computed` + conditional `Show`                                   |

See [Authentication guide](/docs/guides/authentication).

---

## Errors, loading, Suspense

| React                          | EchoJS                            |
| ------------------------------ | --------------------------------- |
| Error Boundary class           | `errorView` on route              |
| `Suspense` + `fallback`        | `loadingView` + query `isPending` |
| `React.lazy`                   | dynamic import in route config    |
| `errorElement` (RR)            | `errorView`                       |
| Toast libraries (sonner, etc.) | Widget + store/event              |

---

## Performance & memoization

| Technique                 | React                   | EchoJS                                         |
| ------------------------- | ----------------------- | ---------------------------------------------- |
| `React.memo`              | Skip re-render          | Unnecessary for signal-driven leaves           |
| `useMemo` / `useCallback` | Stabilize identities    | `computed` / stable model API                  |
| Virtual lists             | `react-window`          | Render visible rows; bind signals per row      |
| Code splitting            | `lazy` + Suspense       | Lazy route modules                             |
| Profiling                 | React DevTools Profiler | Planned `@echojs-ecosystem/devtools`           |
| Bundle size               | react + react-dom       | Echo packages modular (tree-shake per package) |

**Lists:** In React, 10k rows often need virtualization + memo. In Echo, still
virtualize for **DOM node count**, but you avoid **reconciliation** over 10k
vnodes.

---

## Testing & DevTools

| Tool                      | React                          | EchoJS                                                        |
| ------------------------- | ------------------------------ | ------------------------------------------------------------- |
| **React Testing Library** | Render components, user events | Test models directly; mount views integration-style           |
| **Vitest / Jest**         | Standard                       | Same runners                                                  |
| **`renderHook`**          | Test hooks                     | Test `createModel()` return value                             |
| **MSW**                   | Mock HTTP                      | Mock `fetch` in `queryFn`                                     |
| **Storybook**             | UI stories                     | HyperDOM stories (pattern from `ui` package roadmap)          |
| **React DevTools**        | Components tree                | `@echojs-ecosystem/devtools` planned (signals, query, routes) |

---

## Master ecosystem map

### Platform & runtime

| Problem       | React ecosystem       | EchoJS                                                        |
| ------------- | --------------------- | ------------------------------------------------------------- |
| UI runtime    | `react` + `react-dom` | `@echojs-ecosystem/hyperdom` + `@echojs-ecosystem/reactivity` |
| App bootstrap | manual root / Next    | `@echojs-ecosystem/framework`                                 |
| Strict DI     | Context + custom      | `createProvider`, `inject`, strict checks                     |
| Monorepo      | Nx, Turborepo         | Bun workspaces (this repo)                                    |

### Routing & navigation

| Problem             | React               | EchoJS                         |
| ------------------- | ------------------- | ------------------------------ |
| SPA routing         | React Router        | `@echojs-ecosystem/router`     |
| Type-safe routes    | TanStack Router     | Route table + typed names      |
| URL search state    | nuqs, manual        | `@echojs-ecosystem/url-state`  |
| Active link styling | `NavLink` className | `NavLink` from router/hyperdom |

### Data & network

| Problem         | React                    | EchoJS                      |
| --------------- | ------------------------ | --------------------------- |
| REST cache      | TanStack Query, SWR      | `@echojs-ecosystem/query`   |
| GraphQL         | Apollo, urql             | `queryFn` + optional client |
| WebSockets      | socket.io-client + hooks | `effect` + client in entity |
| Upload progress | xhr + state              | model signals               |
| Offline         | RTK + persist            | `@echojs-ecosystem/persist` |

### UI & UX

| Problem             | React                  | EchoJS                              |
| ------------------- | ---------------------- | ----------------------------------- |
| Headless primitives | Radix                  | `@echojs-ecosystem/ui` (growing)    |
| Icons               | lucide-react           | Same SVG sets in views              |
| Modals / dialogs    | Radix Dialog           | views + signals                     |
| Tables              | TanStack Table         | model + mapped rows                 |
| Dates               | date-fns + picker libs | `Intl` via `@echojs-ecosystem/i18n` |
| Drag and drop       | dnd-kit                | DOM events in feature               |

### i18n & a11y

| Problem   | React                  | EchoJS                                          |
| --------- | ---------------------- | ----------------------------------------------- |
| i18n      | react-i18next          | `@echojs-ecosystem/i18n`                        |
| RTL       | CSS + i18n             | Same                                            |
| a11y lint | eslint-plugin-jsx-a11y | semantic `h()` elements, `@echojs-ecosystem/ui` |

### Build & quality

| Problem   | React                    | EchoJS                    |
| --------- | ------------------------ | ------------------------- |
| Bundler   | Vite, Webpack, Turbopack | Vite (reference)          |
| Typecheck | `tsc`                    | `tsc`                     |
| Lint      | eslint + hooks plugin    | ESLint without hook rules |
| Format    | Prettier                 | Prettier                  |
| E2E       | Playwright, Cypress      | Playwright against SPA    |

---

## Provider composition

React (typical):

```tsx
<QueryClientProvider client={qc}>
  <BrowserRouter>
    <ThemeProvider theme={t}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
</QueryClientProvider>
```

EchoJS:

```ts
createEchoApp({ root: () => AppRoot(), strictContextChecks: true })
  .use(queryProvider)
  .use(routerProvider)
  .use(uiProvider)
  .use(i18nProvider)
  .mount('#app')
```

| Concern          | React pain           | Echo benefit                   |
| ---------------- | -------------------- | ------------------------------ |
| Provider order   | Subtle bugs          | Documented plugin order        |
| Missing provider | Runtime `undefined`  | Dev-time strict inject failure |
| Testing          | Wrap every test tree | Register only needed providers |

---

## TypeScript & DX

| Topic           | React                  | EchoJS                    |
| --------------- | ---------------------- | ------------------------- |
| Component props | `FC<Props>`            | View props from model     |
| Hook typing     | Generics + overloads   | Plain functions           |
| Route params    | RR generics / TanStack | Inferred from route table |
| Query keys      | `as const` tuples      | Same, on `createQuery`    |
| Ref typing      | `forwardRef`           | Rare — direct DOM refs    |
| eslint          | hooks rules mandatory  | No hook plugin            |

React 19 improves ref and context typing; **folder architecture** is still your
choice unless you use Next.

---

## Migration cookbook

### Phase 0 — Inventory (1–2 days)

1. List all **routes** and URL params.
2. Classify every state slice (five kinds table).
3. Mark **React-only** deps (MUI, Next APIs, RN).
4. Identify **leaf widgets** to port first.

### Phase 1 — Skeleton

1. `createEchoApp` + router + query providers.
2. Port **route table** — URLs unchanged.
3. Empty pages with `bindModelView` stubs.

### Phase 2 — Data layer

1. Each `useQuery` → `createQuery` definition.
2. Mutations → `createMutation`.
3. Delete duplicate `useEffect` fetches.

### Phase 3 — Features

1. One feature folder per React feature module.
2. `createModel` from former hooks.
3. Rewrite views HyperDOM-first.

### Phase 4 — Global cleanup

1. Shrink Redux/Zustand to true cross-cutting only.
2. Move filters to `@echojs-ecosystem/url-state`.
3. Add `@echojs-ecosystem/persist` only where needed.

### Hook → model cheat sheet

| React hook           | Echo migration                |
| -------------------- | ----------------------------- |
| `useState`           | `signal` in model             |
| `useEffect` on fetch | `createQuery`                 |
| `useEffect` on DOM   | prefer binding; else `effect` |
| `useContext`         | `inject`                      |
| `useReducer`         | `createStore` or signals      |
| `useRef`             | model field or DOM ref        |
| `useMemo`            | `computed`                    |
| `useCallback`        | model method                  |
| `useParams`          | route view `params`           |
| `useSearchParams`    | `@echojs-ecosystem/url-state` |

:::callout type=note Running React and Echo as **two SPAs** linked by URLs is
possible but expensive. Prefer **one SPA**, feature-by-feature cutover. :::

---

## Anti-patterns when porting from React

| Anti-pattern                    | Why it hurts          | Do instead                  |
| ------------------------------- | --------------------- | --------------------------- |
| One global Redux for everything | Same as React smell   | Split query / url / store   |
| `useEffect` for derived data    | Stale closures        | `computed`                  |
| Copying JSX 1:1 without models  | Hard to test          | `createModel` first         |
| Giant shared `components/`      | Boundary rot          | `widgets/` + `features/`    |
| Fetch in views                  | Breaks HyperDOM rules | query in model              |
| Context for all DI              | Hidden deps           | `inject` + providers        |
| Recreating RSC mental model     | Mismatch              | `beforeLoad` + client views |

---

## Decision matrix

| Stay on React                     | Move to EchoJS                                |
| --------------------------------- | --------------------------------------------- |
| Next.js RSC is core product       | SPA / dashboard / admin / docs                |
| Huge MUI/Ant investment           | Greenfield or gradual UI rewrite              |
| React Native mobile               | Web app in Echo monorepo                      |
| Hiring pool React-only short term | Team wants strict architecture                |
| Need mature Storybook + RN        | Need signal-native data + router in one stack |

---

## FAQ

### Is EchoJS “React without VDOM”?

Partly. Closest cousins are **Solid** (signals) + **opinionated platform**
(router, query, store). JSX is not required.

### Can we use npm React libraries?

DOM-agnostic utils (date-fns, zod) — yes. Components that return React elements
— no, unless you mount a React root (not recommended).

### Does Echo replace Next.js?

Not today for **SSR/RSC**. Echo replaces the **client application layer** and
many npm packages around React.

### How do hooks rules map?

They disappear. **Models** replace custom hooks; test them as pure functions.

### What about React Compiler?

Compiler reduces React re-render cost. Echo removes the **component re-render
loop** for UI updates by design.

---

## Summary

| Dimension       | React + ecosystem           | EchoJS                                                      |
| --------------- | --------------------------- | ----------------------------------------------------------- |
| Core loop       | Render → diff → patch       | Signal → targeted write                                     |
| State libraries | Many overlapping            | Layered + `@echojs-ecosystem/store` / `query` / `url-state` |
| Data fetching   | TanStack Query, SWR, Apollo | `@echojs-ecosystem/query`                                   |
| Routing         | RR, TanStack, Next          | `@echojs-ecosystem/router`                                  |
| Meta-framework  | Next, Remix                 | `@echojs-ecosystem/framework` + Vite SPA                    |
| Architecture    | Convention                  | Feature-first rules                                         |
| SSR / RSC       | Mature                      | Plan separately; SPA-first                                  |
| DX guardrails   | Hooks eslint                | Provider + inject checks                                    |

**Other frameworks:** [Comparisons index](/docs/comparisons) ·
[Vue](/docs/comparisons/vue) · [Angular](/docs/comparisons/angular) ·
[Solid](/docs/comparisons/solid) · [Svelte](/docs/comparisons/svelte)

## Related docs

- [Why EchoJS](/docs/introduction/why-echojs)
- [Architecture overview](/docs/architecture/overview)
- [State overview](/docs/state/overview)
- [Data fetching](/docs/guides/data-fetching)
- [Routing guide](/docs/guides/routing)
- [Providers](/docs/architecture/providers)
- [@echojs-ecosystem/reactivity](/docs/packages/reactivity) ·
  [@echojs-ecosystem/query](/docs/packages/query) ·
  [@echojs-ecosystem/router](/docs/packages/router)
