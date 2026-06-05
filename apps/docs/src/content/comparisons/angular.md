---
title: EchoJS vs Angular
description: Deep comparison — Zone.js, signals, RxJS, NgRx, DI, Material, SSR, and full ecosystem mapping to EchoJS.
keywords: angular, rxjs, ngrx, signals, dependency injection, change detection, material, standalone, zoneless
---

# EchoJS vs Angular

**Angular** is a **batteries-included enterprise platform**: TypeScript-first, hierarchical **dependency injection**, **RxJS** in the core, **incremental DOM**, and a multi-year shift toward **signals** and **zoneless** apps. **EchoJS** targets similar goals — typed structure, providers, layered state — with a **lighter client runtime**, **explicit signal graph**, and **HyperDOM** (no zone.js, no NgRx ceremony by default).

This guide is the **Angular migration reference**: change detection, templates, RxJS/NgRx, router, forms, Material, SSR, and **library-by-library** mapping.

## Table of contents (on this page)

1. [At a glance](#at-a-glance)
2. [Runtime: zones, CD, and signals](#runtime-zones-cd-and-signals)
3. [Angular signal APIs vs EchoJS](#angular-signal-apis-vs-echojs)
4. [Templates, directives, and pipes](#templates-directives-and-pipes)
5. [Components, standalone, and modules](#components-standalone-and-modules)
6. [Architecture & folder structure](#architecture-folder-structure)
7. [State: five kinds + Angular libraries](#state-five-kinds-angular-libraries)
8. [RxJS, HttpClient, and async](#rxjs-httpclient-and-async)
9. [NgRx and alternatives](#ngrx-and-alternatives)
10. [Routing & guards](#routing-guards)
11. [SSR, hydration, and prerender](#ssr-hydration-and-prerender)
12. [Forms & validation](#forms-validation)
13. [Material, CDK, and UI](#material-cdk-and-ui)
14. [Auth & interceptors](#auth-interceptors)
15. [Errors, loading, and defer](#errors-loading-and-defer)
16. [Performance & bundle size](#performance-bundle-size)
17. [Testing & DevTools](#testing-devtools)
18. [Master ecosystem map](#master-ecosystem-map)
19. [DI vs Echo providers](#di-vs-echo-providers)
20. [TypeScript & DX](#typescript-dx)
21. [Migration cookbook](#migration-cookbook)
22. [Anti-patterns](#anti-patterns-when-porting-from-angular)
23. [Decision matrix](#decision-matrix)
24. [FAQ](#faq)
25. [Summary](#summary)

---

## At a glance

| Dimension | Angular (17–19+) | EchoJS |
| --- | --- | --- |
| **Update model** | Zone (legacy) or signal-driven CD | Signal subscribers → DOM bindings |
| **Reactivity** | `signal`, `computed`, `effect` + RxJS | `signal`, `computed`, `effect` only in UI path |
| **Templates** | HTML + directives + pipes | HyperDOM `.view.ts` |
| **DI** | Hierarchical injectors | `provide` / `inject` on `createEchoApp` |
| **Async default** | Observables (`HttpClient`) | `fetch` + `@echojs-ecosystem/query` |
| **Global state** | NgRx, ComponentStore, services | `@echojs-ecosystem/store` |
| **Routing** | `@angular/router` | `@echojs-ecosystem/router` |
| **Forms** | Reactive / template-driven | model signals + views |
| **UI kit** | Material, CDK | `@echojs-ecosystem/ui` |
| **CLI** | `ng` workspace | Vite + `@echojs-ecosystem/cli` (planned) |
| **SSR** | `@angular/ssr` mature | SPA-first; SSR planned separately |
| **Structure** | Modules → standalone; team-defined | **Feature-first** (documented) |

> [!NOTE] Performance numbers
> See the [home page Compare section](/). Angular bundle size is typically larger than Echo’s modular packages — measure your feature set.

---

## Runtime: zones, CD, and signals

### Classic Angular (Zone.js)

1. Zone.js patches async APIs (XHR, `setTimeout`, promises).
2. Async completion marks the app **unstable** → **change detection** runs.
3. CD walks the component tree (Default or OnPush rules).

**Cost:** entire subtrees can be checked even when one field changed — mitigated with **OnPush** + immutable inputs.

### Modern Angular (signals + zoneless)

- **`signal` / `computed` / `effect`** align with Echo’s primitives.
- **`input()` / `output()` / `model()`** for component API.
- **Zoneless** (experimental → stable path) removes global CD triggers; updates follow signal graph.

**EchoJS** never shipped Zone.js — updates are always **dependency-driven** at signal + DOM binding level.

| Era | Trigger | EchoJS |
| --- | --- | --- |
| Zone + Default CD | any async | N/A |
| OnPush + immutability | input ref change | signal change |
| Signals in templates | `count()` read tracking | `count.value()` in bindings |
| Zoneless Angular | signal/effect graph | same idea as Echo |

```ts
// Angular 19+ (signals)
import { signal, computed, effect } from "@angular/core";

const count = signal(0);
const double = computed(() => count() * 2);
effect(() => console.log(double()));
count.set(1);
```

```ts
// EchoJS
import { signal, computed, effect } from "@echojs-ecosystem/reactivity";

const count = signal(0);
const double = computed(() => count.value() * 2);
effect(() => console.log(double.value()));
count.set(1);
```

**Syntax difference:** Angular signals call `count()`; Echo uses `count.value()` — same graph, different accessor.

---

## Angular signal APIs vs EchoJS

| Angular | EchoJS | Notes |
| --- | --- | --- |
| `signal()` | `signal()` | Writable cell |
| `computed()` | `computed()` | Derived |
| `effect()` | `effect()` | Side effects |
| `linkedSignal()` | `computed` + setter pattern | Advanced derived writable |
| `input()` | view props | Parent passes values |
| `output()` | callbacks | Event emitters as functions |
| `model()` | two-way bind via model | field signal + handler |
| `viewChild()` / `contentChild()` | refs in view | HyperDOM ref API |
| `toSignal()` / `toObservable()` | use signals at boundary | Rx only at integration edge |
| `inject()` | `inject(token)` | Framework provider |
| `DestroyRef` | `cleanup` / effect dispose | Scope cleanup |

### RxJS interop

| Angular | EchoJS |
| --- | --- |
| `http.get().pipe(map…)` | `queryFn` returns Promise |
| `async` pipe in template | `() => signal.value()` in view |
| `toSignal(obs$)` | prefer query/store signals |
| NgRx `Store.select` | `select` on store or query |

**Guideline:** In Echo ports, **end RxJS at the HTTP boundary** — do not thread `Observable` through views.

---

## Templates, directives, and pipes

| Feature | Angular template | EchoJS HyperDOM |
| --- | --- | --- |
| Binding | `{{ expr() }}`, `[prop]`, `(click)` | `h()` props, `() =>` reactive children |
| Control flow | `@if`, `@for`, `@switch` (v17+) | `Show`, `.map`, conditional children |
| Structural | `*ngIf`, `*ngFor` (legacy) | explicit in TS |
| Pipes | `{{ price \| currency }}` | `Intl` via `@echojs-ecosystem/i18n` or utils |
| Class/style | `[ngClass]`, `[ngStyle]` | `class` / `style` props |
| Two-way | `[(ngModel)]` | model signals |
| i18n attrs | `i18n` | `t()` keys |
| Host bindings | `@HostBinding` | props on root `h()` |

```html
<!-- Angular -->
<ul>
  @for (user of users(); track user.id) {
    <li>{{ user.name }}</li>
  }
</ul>
```

```ts
// EchoJS
ul(null, () => vm.users.value().map((u) => li({ key: u.id }, u.name)));
```

---

## Components, standalone, and modules

| Concept | Angular | EchoJS |
| --- | --- | --- |
| Component | `@Component` class + template | `createView` |
| Standalone | `standalone: true` | always “standalone” views |
| NgModule | `imports: [...]` | providers on app |
| Declarations | module declarations | export view from feature |
| Lifecycle | `ngOnInit`, `ngOnDestroy` | view mount / effect cleanup |
| ChangeDetectionStrategy | Default / OnPush | N/A — signal bindings |
| Smart/ dumb split | container + presentational | model + view |
| Content projection | `ng-content` | children in `h()` |

```ts
// Angular standalone bootstrap
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
});
```

```ts
// EchoJS
createEchoApp({ root: () => AppRoot() })
  .use(routerProvider)
  .use(queryProvider)
  .mount("#app");
```

---

## Architecture & folder structure

### Typical Angular enterprise layout

| Path | Role |
| --- | --- |
| `core/` | Singleton services, guards |
| `shared/` | SharedModule, pipes, dumb components |
| `features/*/` | Lazy feature modules |
| `layout/` | shell components |
| `environments/` | config |

Imports between features are **allowed** unless the team forbids it — ESLint boundary rules optional.

### EchoJS feature-first (stricter)

| Layer | Role | May import |
| --- | --- | --- |
| **App** | bootstrap, providers | downward |
| **Pages** | route pages | features, entities, widgets |
| **Widgets** | app shell | features, entities |
| **Features** | user flows | **entities + shared only** |
| **Entities** | domain, routes, API | shared |
| **Shared** | pure utils | — |

Angular **feature modules** ≈ Echo **features/** — but Echo **blocks** feature-to-feature imports.

### Pattern mapping

| Angular | EchoJS |
| --- | --- |
| `@Injectable()` service | provider factory + optional model |
| Facade service over NgRx | thin model + store/query |
| Smart component | page + `bindModelView` |
| Dumb component | `createView` only |
| Resolver | `beforeLoad` |
| Guard | `beforeLoad` redirect |
| Interceptor | `fetch` wrapper on api provider |

---

## State: five kinds + Angular libraries

| State kind | Angular typical | EchoJS |
| --- | --- | --- |
| **Local UI** | signal, component fields | `signal` in model |
| **Screen** | component + service | `createModel` |
| **Server / cache** | HttpClient, NgRx, TanStack | `@echojs-ecosystem/query` |
| **URL** | `queryParams` observable | `@echojs-ecosystem/url-state` |
| **App client** | NgRx, services, signals | `@echojs-ecosystem/store` + `@echojs-ecosystem/persist` |

### Library-by-library

| Library | Angular role | EchoJS |
| --- | --- | --- |
| **NgRx Store** | global normalized state | `@echojs-ecosystem/store` + query |
| **NgRx Effects** | side effects on actions | query mutations, model actions |
| **NgRx Entity** | entity adapters | store slices + typed maps |
| **ComponentStore** | local feature store | feature `createStore` |
| **NGXS** | class stores | `createStore` |
| **Akita** | entity stores | store + query |
| **TanStack Query Angular** | `injectQuery` | `createQuery` |
| **Signals store (community)** | lightweight | `createStore` |
| **@ngrx/signals** | signal store APIs | native Echo signals |

> [!WARNING] NgRx-shaped Echo app
> Do not port every action/reducer/effect trio. Classify state by **kind** — most NgRx apps shrink to **query + 1–2 stores**.

---

## RxJS, HttpClient, and async

### HttpClient

```ts
// Angular
this.http.get<User[]>("/api/users").subscribe((users) => this.users.set(users));
```

```ts
// EchoJS — cached query
export const usersQuery = createQuery({
  name: "users",
  queryKey: () => ["users"] as const,
  queryFn: ({ signal }) =>
    fetch("/api/users", { signal }).then((r) => r.json() as Promise<User[]>),
});
```

| HttpClient feature | EchoJS |
| --- | --- |
| Interceptors | wrap `fetch` in api provider |
| `HttpParams` | `URLSearchParams` / url-state |
| Progress events | custom xhr in model (rare) |
| Typed responses | generics on `queryFn` |

### When you still need RxJS on Echo

- WebSocket streams with complex operators
- Existing SDKs that return `Observable`

**Pattern:** subscribe in a provider or model `effect`, write results into **signals** — views never import `rxjs`.

---

## NgRx and alternatives

### NgRx flow → Echo flow

| NgRx | EchoJS |
| --- | --- |
| Action `loadUsers` | `usersQuery` fetch |
| Reducer | store `.update` or query cache |
| Effect `loadUsers$` | `queryFn` (no effect file) |
| Selector `selectUsers` | `computed(() => q.data())` |
| Dispatch in component | call model method / `invalidate` |
| EntityAdapter | normalized store slice |

```ts
// NgRx (conceptual)
// dispatch(loadUsers()) → effect → success → reducer

// Echo
const users = usersQuery.with();
// users.data(), users.isPending(), queryClient.invalidate(...)
```

### ComponentStore → feature store

```ts
// Angular ComponentStore
// readonly users$ = this.select(...)

// Echo
export const createUsersFeatureStore = () =>
  createStore({ filter: "" }).extend(withActions(/* ... */));
```

---

## Routing & guards

| `@angular/router` | `@echojs-ecosystem/router` |
| --- | --- |
| `Routes` config | `createRoutes` tree |
| `Router.navigate` | `router.go()` |
| `routerLink` | `NavLink` |
| `canActivate` | `beforeLoad` |
| `canMatch` | route guards / conditions |
| `resolve` | `beforeLoad` return data |
| Lazy `loadChildren` | lazy route modules |
| `ActivatedRoute.params` | `params` on route view |
| `queryParams` | `@echojs-ecosystem/url-state` or router |
| `RouterOutlet` | layout `outlet()` |

```ts
export const adminPage = createRouteView({
  name: "admin",
  view: ({ data }) => AdminView(data),
  beforeLoad: async () => {
    if (!sessionStore.get().token) throw redirect("/login");
    return loadAdminBootstrap();
  },
});
```

---

## SSR, hydration, and prerender

| Feature | Angular | EchoJS today |
| --- | --- | --- |
| `@angular/ssr` | Universal + hydration | CSR SPA |
| `provideClientHydration` | client hydrate | N/A |
| Prerender routes | `prerender` config | static hosting / separate site |
| TransferState | server → client | manual bootstrap payload |
| SEO meta | `Title`, `Meta` services | head in SPA or SSR layer |

:::callout type=note
**Enterprise split:** public site on Angular SSR or static prerender; authenticated Echo SPA is a common migration path.
:::

---

## Forms & validation

| Approach | Angular | EchoJS |
| --- | --- | --- |
| Template-driven | `NgModel` | avoid — use model signals |
| Reactive forms | `FormGroup`, `FormControl` | signals per control |
| Validators | sync/async validators | validate in `computed` |
| `valueChanges` | Observable | `effect` on signal (rare) |
| Signal forms (newer) | signal-based form API | native Echo model pattern |

```ts
// Angular reactive (simplified)
readonly form = new FormGroup({
  email: new FormControl("", Validators.email),
});

// Echo model
const email = signal("");
const errors = computed(() => validateEmail(email.value()));
```

---

## Material, CDK, and UI

| Library | Angular | EchoJS |
| --- | --- | --- |
| **Angular Material** | full design system | `@echojs-ecosystem/ui` + Tailwind |
| **CDK** | a11y primitives | HyperDOM semantics + ui package |
| **PrimeNG** | enterprise widgets | feature views |
| **ng-bootstrap** | Bootstrap | Tailwind components |
| **Tailwind in Angular** | supported | same as docs app |
| **Schematics** | `ng add @angular/material` | manual / future CLI |

Material **cannot** drop in — plan screen-by-screen rewrite in HyperDOM.

---

## Auth & interceptors

| Pattern | Angular | EchoJS |
| --- | --- | --- |
| `HTTP_INTERCEPTORS` | Bearer token | `fetch` wrapper in api provider |
| `CanActivateFn` | auth guard | `beforeLoad` |
| `APP_INITIALIZER` | boot config | provider init before mount |
| OAuth libraries | angular-oauth2-oidc | same flows + session store |
| Role directives | `*ngIf="isAdmin"` | `computed` + `Show` |

---

## Errors, loading, and defer

| Angular | EchoJS |
| --- | --- |
| Route `resolve` failure | `errorView` |
| `http` error handler | query `isError` / model |
| `@defer` block (v17+) | lazy route / conditional view |
| Loading spinner in template | `loadingView`, query pending |
| Global error handler | `ErrorHandler` → widget toast |

---

## Performance & bundle size

| Technique | Angular | EchoJS |
| --- | --- | --- |
| OnPush | reduce CD scope | signal bindings |
| `trackBy` in `@for` | list identity | `key` on children |
| Lazy routes | `loadChildren` | lazy page imports |
| Tree-shaking | partial | per-package imports |
| Budgets in `angular.json` | enforced | Vite build analyze |
| Zone polyfill removal | zoneless build | never included |

Angular **incremental DOM** is not VDOM — still different from Echo’s **per-binding** updates. Profile both with **your** component count.

---

## Testing & DevTools

| Tool | Angular | EchoJS |
| --- | --- | --- |
| **Jasmine + Karma** | classic | Vitest |
| **Jest** | common in NG workspaces | Vitest |
| **TestBed** | configure module | test model; mount view optional |
| **Spectator** | sugar | plain factories |
| **NgRx MockStore** | mock selectors | mock store factory |
| **Angular DevTools** | profiler, DI tree | `@echojs-ecosystem/devtools` planned |
| **Playwright** | e2e | e2e on SPA |

```ts
// Echo — test model without TestBed
const vm = createCheckoutModel({ cartId: "1" });
vm.promo.set("SAVE10");
expect(vm.total.value()).toBe(90);
```

---

## Master ecosystem map

### Platform

| Problem | Angular | EchoJS |
| --- | --- | --- |
| Framework | `@angular/core` | `@echojs-ecosystem/framework` |
| Build | `@angular-devkit/build-angular` | Vite |
| Workspace | `angular.json` | monorepo packages |
| Schematics | `ng generate` | `@echojs-ecosystem/cli` (planned) |

### Data & state

| Problem | Angular | EchoJS |
| --- | --- | --- |
| HTTP | `HttpClient` | `fetch` in query |
| Cache | NgRx, TanStack | `@echojs-ecosystem/query` |
| WebSocket | RxJS | effect + client |
| Local storage | services, ngrx meta | `@echojs-ecosystem/persist` |
| GraphQL | Apollo Angular | queryFn |

### UI & i18n

| Problem | Angular | EchoJS |
| --- | --- | --- |
| Components | Material, PrimeNG | `@echojs-ecosystem/ui` |
| Icons | Material icons | inline SVG |
| i18n | `$localize`, ngx-translate | `@echojs-ecosystem/i18n` |
| Animations | `@angular/animations` | CSS / WAAPI |

### Quality

| Problem | Angular | EchoJS |
| --- | --- | --- |
| Lint | `@angular-eslint` | ESLint TS |
| Format | Prettier | Prettier |
| Strict TS | `angularCompilerOptions` | `strict` in tsconfig |
| a11y | CDK a11y | semantic views |

---

## DI vs Echo providers

### Angular DI

- Tree of injectors (root, route, component).
- `providedIn: 'root' | 'platform' | NgModule`.
- `inject()` in constructor or field initializer.
- Multi providers, tokens, `InjectionToken`.

### Echo providers

```ts
import { createProvider, createEchoApp } from "@echojs-ecosystem/framework";

const apiProvider = createProvider("api", () => ({
  getUsers: (signal?: AbortSignal) => fetch("/api/users", { signal }),
}));

createEchoApp({ root: () => AppRoot(), strictContextChecks: true })
  .use(apiProvider)
  .mount("#app");
```

| Concern | Angular | Echo |
| --- | --- | --- |
| Token | `InjectionToken<T>` | string / branded token |
| Scope | injector tree | app-level `.use()` |
| Missing dep | `NullInjectorError` | strict context check in dev |
| Testing | `TestBed.overrideProvider` | register mock provider |
| Circular DI | runtime error | avoid — prefer explicit imports in entities |

**Services with state** → split into **store/query** (data) and **stateless api** (provider).

---

## TypeScript & DX

| Topic | Angular | EchoJS |
| --- | --- | --- |
| Template typecheck | strict templates | TS views only |
| `strictNullChecks` | recommended | required in apps |
| Path aliases | `tsconfig` paths | same |
| Signal input types | `input.required<string>()` | view props types |
| Route types | `Router` + helpers | route table inference |
| RxJS types | heavy generics | mostly Promise in query |

Echo has **one language surface** in UI — no split between `.ts` logic and template checker.

---

## Migration cookbook

### Phase 0 — Inventory

1. List lazy feature modules and routes.
2. Export NgRx slices + ComponentStores — classify by five kinds.
3. Catalog `HttpClient` calls and interceptors.
4. Note Material screens (rewrite cost).

### Phase 1 — Shell

1. `createEchoApp` + router + query providers.
2. Port `Routes` → `createRoutes` (same URLs).
3. Layout widget (ex-shell component).

### Phase 2 — Data

1. NgRx effects that only fetch → `createQuery`.
2. Remaining NgRx → `createStore` (session, UI prefs).
3. `ActivatedRoute.queryParams` → `@echojs-ecosystem/url-state`.

### Phase 3 — Features

1. One Echo feature per Angular feature module.
2. `@Injectable` facades → models + inject api.
3. Templates → HyperDOM views last.

### Phase 4 — Decommission

1. Remove NgRx module imports.
2. Drop unused RxJS pipes in components.
3. Shrink `shared/` into widgets/shared.

### Angular → Echo cheat sheet

| Angular | Echo |
| --- | --- |
| `signal` / `computed` / `effect` | same names, `.value()` accessor |
| `input()` | view props |
| `output()` | callbacks |
| `inject(Service)` | `inject(token)` |
| `HttpClient` | `fetch` + query |
| `Store.dispatch` | store action / query invalidate |
| `select$` | `computed` / store select |
| `FormControl` | `signal` |
| `*ngIf` / `@if` | `Show` / conditional |
| `*ngFor` / `@for` | `.map` |
| `async` pipe | reactive child `() =>` |
| `Resolver` | `beforeLoad` |
| `CanActivate` | `beforeLoad` |

---

## Anti-patterns when porting from Angular

| Anti-pattern | Fix |
| --- | --- |
| NgRx for every GET request | `createQuery` |
| Observable in templates via async pipe | signals in view |
| God `CoreModule` | providers + entities |
| Feature module importing another feature | respect Echo boundaries |
| Material copy-paste in HyperDOM | rebuild with `@echojs-ecosystem/ui` |
| Zone mindset (“CD will catch it”) | explicit signals |
| 500-line components | model + view split |

---

## Decision matrix

| Stay on Angular | Choose EchoJS |
| --- | --- |
| `@angular/ssr` + hydration is required | CSR product app, admin, docs |
| Deep Material + CDK investment | UI rewrite acceptable |
| Enterprise mandate for `ng` CLI | Monorepo on Echo packages |
| RxJS-heavy realtime core | Can isolate Rx at boundaries |
| Large pool of Angular contractors | Long-term Echo architecture bet |

---

## FAQ

### Is Echo “Angular without Zone”?

Partly for **reactivity** — but Echo also drops templates, NgRx-by-default, and `HttpClient` observables in the UI layer.

### Can we use Angular libraries?

Angular **components** — no. TS utilities, Zod, date-fns — yes.

### NgRx Entity adapters?

Use typed `Record<id, Entity>` in store or normalized query cache in models.

### Signals `input()` vs Echo?

Angular `input()` is component-bound; Echo passes props into `createView` explicitly.

### `provideExperimentalZonelessChangeDetection`?

Echo is always zoneless at the UI layer.

### Angular 19+ features?

New signal APIs map closely — migration effort is **templates + NgRx + Material**, not signal syntax.

---

## Summary

| Dimension | Angular + ecosystem | EchoJS |
| --- | --- | --- |
| Reactivity | Signals + Zone (legacy) | Signals only |
| Async | RxJS + HttpClient | Promise + query |
| State | NgRx, ComponentStore | store + query + url-state |
| UI | Templates + Material | HyperDOM + ui |
| DI | Hierarchical injectors | app providers |
| Routing | `@angular/router` | `@echojs-ecosystem/router` |
| SSR | Mature | SPA-first |
| Structure | Modules / standalone | Feature-first rules |

**Other guides:** [Comparisons index](/docs/comparisons) · [React](/docs/comparisons/react) · [Vue](/docs/comparisons/vue) · [Solid](/docs/comparisons/solid) · [Svelte](/docs/comparisons/svelte)

## Related docs

- [Providers](/docs/architecture/providers)
- [Architecture overview](/docs/architecture/overview)
- [State overview](/docs/state/overview)
- [Data fetching](/docs/guides/data-fetching)
- [Why EchoJS](/docs/introduction/why-echojs)
- [@echojs-ecosystem/store](/docs/packages/store) · [@echojs-ecosystem/query](/docs/packages/query) · [@echojs-ecosystem/router](/docs/packages/router)
