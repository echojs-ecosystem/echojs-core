---
title: Best Practices
description:
  Practical defaults for EchoJS apps — reactivity, architecture, routing, data,
  forms, and security in one checklist.
keywords: [best practices, patterns, architecture, signals, models, do and dont]
---

# Best Practices

Opinionated defaults that keep EchoJS apps fast to change and easy to review.
When in doubt, follow these patterns — they match `apps/docs`, `apps/example`,
and package guides.

> [!TIP] Deep dives: [Reactivity](/docs/guides/reactivity),
> [Conventions](/docs/guides/conventions),
> [Architecture](/docs/architecture/overview).

## In this section

- [Routing](/docs/best-practices/routing) — URLs, layouts, guards, `beforeLoad`
- [Models](/docs/best-practices/models) — VM design, lifetime, queries
- [Views](/docs/best-practices/views) — `createView`, composition
- [Styling](/docs/best-practices/styling) — `tv` slots, file layout
- [New screen](/docs/best-practices/new-screen) — end-to-end workflow

## Layered responsibility

| Layer        | Owns                                                         | Must not own                                      |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------- |
| **Route**    | URL, params, query, `beforeLoad`, guards, layout `outlet()`  | DOM structure, Tailwind classes, form field state |
| **Page**     | SEO for the screen, wiring model + view, route props         | Reusable UI blocks, API client details            |
| **Model**    | Signals, stores, queries, effects, user actions              | `h()` / `div()` / markup                          |
| **View**     | HyperDOM tree, styles, composition of child views            | `fetch`, router `go()`, raw `signal()` creation   |
| **Widget**   | Cross-route UI + its model (header, sidebar, code block)     | Route tables, page-only business rules            |
| **Feature**  | Vertical slice (search, auth form, query demo)               | Imports from `pages/`                             |

**Dependency rule:** `pages` → `widgets` / `features` → `entities` / `shared`.
Never the reverse. Run `@echojs-ecosystem/architect` in CI to catch violations.

## Do / don't at a glance

| Do | Don't |
| --- | --- |
| Signals and logic in **models** | `signal()` or `fetch` inside **views** |
| **`createQuery`** for server cache | Mirror API lists in global signals |
| **`NavLink({ to: page })`** | Hard-coded path strings in widgets |
| **`bindField`** for form inputs | Manual `value` + `onInput` wiring |
| **`computed`** for derived state | `effect()` that writes another signal |
| **Feature slices** with `index.ts` | Deep imports across layer boundaries |
| **`batch()`** for multi-signal writes | Many `.set()` calls in one action |
| **Providers at app root** | Providers inside feature views |
| **`echo-architect lint` in CI** | Ad-hoc folder rules in code review only |

## Reactivity

1. **One source of truth** — each fact lives in one signal, store field, or query
   cache entry.
2. **Read `.value()` in reactive contexts** — HyperDOM children/props, computeds,
   query `.with()`. Use `.peek()` only when tracking must not subscribe.
3. **Dispose** — utils composables, external subscriptions, and scope when
   leaving long-lived shells.
4. **Immutable updates** for objects in signals — `.update((s) => ({ ...s, x }))`,
   not in-place mutation.

```ts
// Good
$items.update((list) => [...list, item])

// Risky — may skip notifications
$items.value().push(item)
```

See [Reactivity guide](/docs/guides/reactivity).

## Model and view

| Model owns | View owns |
| ---------- | --------- |
| Signals, computeds, effects | HyperDOM tree |
| Submit actions, navigation calls | `bindField`, layout, styling |
| Query `.with()`, form submit | Reading VM accessors only |
| Side effects (API, timers) | No business rules |

See [Models](/docs/best-practices/models) and [Views](/docs/best-practices/views).

## Pick the right state layer

| Data | Use |
| ---- | --- |
| Tab, modal open, hover | `signal` in model |
| Theme, locale, session | Store + provider |
| Server list / detail | `createQuery` |
| URL filters, pagination | [URL state](/docs/state/url-state) |
| Form draft | `createForm` |
| Route id / query | Route `$params`, `$query` |

Never one mega-store for the whole app.

## Routing

1. Define routes in **`entities/__routes__/`**; pages export `*Page` factories.
2. Load route-critical data in **`beforeLoad`**, not in `createView`.
3. Protect routes with **`createRouter({ guards })`** — [Authentication](/docs/guides/authentication).
4. Lazy-load heavy pages with **`createLazyRouteView`** + `preload()` on hover.
5. Shareable UI state → url-state, not duplicate signals.

See [Routing](/docs/best-practices/routing) and [Routing guide](/docs/guides/routing).

## Data fetching

1. **Stable `queryKey` tuples** — include every input that changes the response.
2. **Module-scope queries** — bind in models with `.with(() => params)`.
3. **Mutations invalidate** related queries in `onSuccess`.
4. **401 → logout** in one network/query layer, not per view.
5. **`signal` in `queryFn`** for auth headers — read store at request time.

See [Data fetching guide](/docs/guides/data-fetching).

## Forms

1. **`validationSchema`** on the form — not ad-hoc checks in the view.
2. **`controlledValue: true`** on text fields inside **`List`** / field arrays.
3. Submit in **model action**; API/mutation inside `form.submit()` callback.
4. **`validationOn: 'manual'`** for login/checkout unless you need live validation.
5. Pause **persist** on logout before clearing auth fields.

See [Forms guide](/docs/guides/forms).

## Providers and bootstrap

```ts
createEchoApp({ strictContextChecks: true })
  .use(queryProvider)
  .use(uiProvider)
  .use(i18nProvider)
  .use(routerProvider)
  .mount('#app')
```

- Register **query before router** if routes prefetch in `beforeLoad`.
- Keep **`strictContextChecks: true`** in development — catches missing DI early.
- One **`createEchoApp()`** — no second parallel app roots.

See [Providers](/docs/architecture/providers).

## Imports and layers

- Import from slice **`index.ts`** only (`@features/search`, not deep paths).
- **pages → widgets → features → entities → shared** — never upward.
- Run **`echo-architect lint`** locally and in CI.

See [Conventions](/docs/guides/conventions) and [Architect](/docs/packages/architect).

## Internationalization

- User-visible strings via **`i18n.t()`** inside reactive children:
  `() => i18n.t('key')`.
- Do not cache translated strings at module scope.
- Lazy-load non-default locale JSON in production.

See [Internationalization guide](/docs/guides/internationalization).

## Security

- Prefer **httpOnly cookies** for session tokens when the backend supports it.
- Never store refresh tokens in **localStorage** without threat modeling.
- Clear session stores + query cache on **logout**.
- Attach tokens in a **single fetch wrapper**, not scattered per call.

See [Authentication guide](/docs/guides/authentication).

## Performance

- **Fine-grained updates** — HyperDOM patches subscribers only; avoid rewriting
  large static subtrees in reactive children.
- **Tree-shake** — import package subpaths (`@echojs-ecosystem/utils/window-size`).
- **Lazy routes and locales** — split bundles at route and language boundaries.
- **`staleTime`** on stable lists; shorter on detail views that must stay fresh.

## Testing

- **Unit-test models** without DOM — call actions, assert signal/query state.
- Fix locale in tests: `await i18n.setLocale('en')`.
- Prefer VM accessors over reaching into private signals from tests.

## New feature checklist

1. Folder under `features/<name>/` — `model/`, `ui/`, optional `api/`.
2. Public exports from `index.ts`.
3. Page in `pages/` composes the feature; route registered in `__routes__`.
4. Naming matches [Conventions](/docs/guides/conventions).
5. State layer chosen from table above.
6. `echo-architect lint` passes.

See [New screen](/docs/best-practices/new-screen) for the full workflow.

## Related

- [Reactivity](/docs/guides/reactivity)
- [Routing](/docs/guides/routing)
- [Data fetching](/docs/guides/data-fetching)
- [Forms](/docs/guides/forms)
- [Conventions](/docs/guides/conventions)
- [Authentication](/docs/guides/authentication)
- [Feature first](/docs/architecture/feature-first)
- [Models](/docs/architecture/models)
