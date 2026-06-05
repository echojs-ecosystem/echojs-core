---
title: AGENTS.md
description: Complete contributor and AI agent guide for the EchoJS documentation app.
keywords: [agents, conventions, createModel, createView]
---

# AGENTS.md

Reference for **human contributors and coding agents** editing `apps/docs`. Follow this document before adding pages, widgets, or routes.

## Philosophy

EchoJS separates **what changes** (model: signals, effects, actions) from **what is shown** (view: hyperdom). The docs site is the reference implementation of that idea — do not write “shortcut” components that mix both.

## Project map

| Path | Role |
|------|------|
| `src/app/` | Bootstrap, providers, global CSS |
| `src/pages/` | Route-level features (home, sponsors, doc article) |
| `src/widgets/` | Reusable UI (header, sidebar, code-block, …) |
| `src/shared/` | Styles (`tv()`), content engine, SEO, search |
| `src/content/` | Markdown sources |
| `src/entities/__routes__/` | Router tables, doc page cache |
| `public/llms.txt` | Compact rules for LLM tools |

## Standard feature layout

```
pages/home/
  constants/home.constants.ts   # code examples, tab config
  types/home.types.ts           # HomeVM, CodeTab, …
  model/home.model.ts             # createHomeModel
  ui/home.view.ts               # HomeView = createView(vm => …)
  ui/home-*.view.ts             # smaller createView pieces
  index.ts                      # re-exports
  home.page.ts                  # createRouteView + createComponent
```

```
widgets/code-block/
  model/code-block.model.ts
  ui/code-block.view.ts
  index.ts                      # CodeBlock(props) => bindModelViewWith(...)
```

## createModel

From `@echojs/hyperdom`:

```typescript
import { signal } from "@echojs/reactivity";
import { createModel } from "@echojs/hyperdom";

export type CounterVM = {
  $count: Signal<number>;
  increment: () => void;
};

export const createCounterModel = createModel((): CounterVM => {
  const $count = signal(0);
  return {
    $count,
    increment: () => $count.update((n) => n + 1),
  };
}, "CounterModel");
```

- Always pass a **display name** string (`"CounterModel"`) for debugging
- Return a **plain object** (the VM)
- Props: `createCounterModel = (props: Props) => createModel((): CounterVM => ({ props, … }), "CounterModel")`

## createView

```typescript
import { createView, type Child } from "@echojs/hyperdom";
import type { CounterVM } from "../model/counter.model.js";

export const CounterView = createView((vm: CounterVM): Child => {
  return button({ onClick: vm.increment }, () => String(vm.$count.value()));
}, "CounterView");
```

- **Only** hyperdom / `NavLink` / child views — no new signals
- Static sections: `createView((_vm: void): Child => …, "Name")`
- Props-only subviews: `createView((props: CardProps): Child => …, "CardView")`

## Binding model + view

Use `createComponent` from `@echojs/hyperdom`:

```typescript
import { createComponent } from "@echojs/hyperdom";

export const Counter = createComponent(createCounterModel, CounterView, { name: "Counter" });
// route: view: () => Counter()
```

Reactive classes (e.g. header scroll): return a **function child** from `createView` that reads VM and rebuilds the tree:

```typescript
export const SiteHeaderView = createView((vm: SiteHeaderVM): Child => {
  return () => {
    const hdr = vm.headerStyles();
    return header({ class: hdr.root() }, [/* … */]);
  };
}, "SiteHeaderView");
```

## Styling

- Design tokens in `src/app/styles/global.css` (`@theme`)
- Component styles: `shared/styles/*.ts` with `tv({ slots: { … }, variants: { … } })`
- Do not hardcode one-off colors in views when a token exists (`echo-*`, `surface`, `fg-muted`)

## Content & sidebar

- Markdown: `src/content/<path>.md` with YAML frontmatter (`title`, `description`)
- Install panel (same widget as home hero): standalone line `:::install @echojs/reactivity` — do not duplicate `:::tabs` bash blocks for package adds
- Package badge line: `@echojs/reactivity` under frontmatter
- Nav: `shared/content/nav.ts` — `docsNavSections` + `item(slug, title, contentId)`
- Package docs: Overview · Installation · Usage · Example · **Playground** · API (`package-nav.ts`)
- Interactive embed: standalone line `:::playground reactivity` → `widgets/package-playground` (live UI + JSON state)
- Static code: `packages/<id>/example.md` from `apps/docs` / `apps/example`
- Agent docs: `shared/content/agents-nav.ts` — sidebar block **For agents**
- Routes: auto via `docPageByContentId` from `allDocsNavItems`

## Queries & SEO

- `createQuery` in **model** (see `pages/doc/model/doc-article.model.ts`)
- `applySeo()` in page `view` callback or model `effect` — not in presentational view files

## Checklist before opening a PR

- [ ] New UI has `model/` + `ui/` + `createModel` + `createView`
- [ ] No reactive logic in `.view.ts`
- [ ] Types/constants split when file grows
- [ ] `bun run typecheck` in `apps/docs` passes
- [ ] New doc pages registered in nav + markdown file added

## Related

- [LLMs.txt](/docs/agents/llms-txt) · [Model & View](/docs/agents/model-and-view) · [Project layout](/docs/agents/project-layout)
