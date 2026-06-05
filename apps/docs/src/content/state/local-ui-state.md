---
title: Local UI state
description: Ephemeral signals in models — tabs, modals, and interaction state scoped to a feature.
keywords: [signal, computed, createModel, ephemeral]
---

# Local UI state

**Local UI state** is **short-lived interaction state** that belongs to one screen, widget, or feature: which tab is selected, whether a menu is open, hover index, debounced search input before it hits the URL. It is implemented with `signal` / `computed` / `effect` inside a **`createModel`** — not global stores.

## How it differs

| Local UI | Other layer |
| --- | --- |
| Dies with model scope / route unmount | [Client store](/docs/state/client-store) survives navigation |
| Not in URL by default | [URL state](/docs/state/url-state) is shareable |
| No validation tree | [Form state](/docs/state/form-state) |
| Not from network | [Server state](/docs/state/server-state) |
| Not “which route” | [Router state](/docs/state/router-state) |

## Typical pattern

```ts
import { signal, computed } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";

export const createPanelModel = createModel((): PanelVM => {
  const $tab = signal(0);
  const $menuOpen = signal(false);

  return {
    tab: () => $tab.value(),
    setTab: (i: number) => $tab.set(i),
    menuOpen: () => $menuOpen.value(),
    toggleMenu: () => $menuOpen.update((v) => !v),
    isSettingsTab: () => $tab.value() === 2,
  };
}, "PanelModel");
```

Expose **methods and accessors** on the VM — views stay dumb (`createView`).

## When to promote out of “local”

| Stay local | Promote |
| --- | --- |
| Accordion on one page | Theme for whole app → [store](/docs/state/client-store) |
| Step index in a wizard (same route) | Wizard step in URL → [url-state](/docs/state/url-state) |
| Draft comment before Post | Many fields + submit → [form state](/docs/state/form-state) |
| Copy of `params.id` | Read `page.$params` → [router state](/docs/state/router-state) |

## Combine layers in one model

```ts
export const createCatalogModel = createModel((): CatalogVM => {
  const $panelOpen = signal(false); // local UI
  const filters = catalogFilters;   // URL state (module singleton)
  const products = productsQuery.with(() => ({
    q: filters.value().q,
    page: filters.value().page,
  }));

  return {
    panelOpen: () => $panelOpen.value(),
    togglePanel: () => $panelOpen.update((v) => !v),
    items: () => products.data(),
    loading: () => products.isPending(),
    setQuery: (q: string) => filters.set({ ...filters.value(), q, page: 1 }),
  };
}, "CatalogModel");
```

One VM hides three layers from the view.

## Effects

Local state is where `effect()` belongs (focus trap, listen to escape key, sync title):

```ts
effect(() => {
  if (!$menuOpen.value()) return;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") $menuOpen.set(false);
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
});
```

## Docs site examples

- `core/providers.ts` — **not** local (global theme)
- `shared/layout/mobile-nav.ts` — shell-level signal (shared layout, still not a product store)
- Home hero code tab index — **local** to home model

## Related

- [State overview](/docs/state/overview)
- [Architecture → Models](/docs/architecture/models)
- [Reactivity package](/docs/packages/reactivity/usage)
