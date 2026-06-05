---
title: LLMs.txt
description: Compact rules for AI assistants working on the EchoJS docs site.
keywords: [llms, agents, cursor, copilot]
---

# LLMs.txt

Short contract for tools that edit **`apps/docs`**. The canonical plain-text copy also lives at [/llms.txt](/llms.txt).

## Stack

- **EchoJS** — `@echojs-ecosystem/hyperdom`, `@echojs-ecosystem/reactivity`, `@echojs-ecosystem/router`, `@echojs-ecosystem/query`, `@echojs-ecosystem/i18n`, `@echojs-ecosystem/framework`
- **Styling** — Tailwind v4 + `tailwind-variants` (`tv()`)
- **Content** — Markdown in `src/content/`, lazy-loaded per route

## Golden rule

**Logic and UI are always separate.**

| Layer | File | API |
|--------|------|-----|
| State & behavior | `model/*.model.ts` | `createModel` |
| Markup only | `ui/*.view.ts` | `createView` |
| Types | `types/*.types.ts` | `FooVM`, `FooProps` |
| Static data | `constants/*.constants.ts` | strings, tables |
| Entry | `index.ts` | `bindModelView` / `bindModelViewWith` |

## Wiring

```typescript
import { bindModelView, bindModelViewWith } from "@core/ui/bind-model-view.js";
import { createHomeModel } from "./model/home.model.js";
import { HomeView } from "./ui/home.view.js";

// No props
export const Home = (): Child => bindModelView(createHomeModel, HomeView);

// With props
export const CodeBlock = (props: CodeBlockProps): Child =>
  bindModelViewWith(props, createCodeBlockModel, CodeBlockView);
```

## View file rules

- Use **only** `createView((vm) => …)` or `createView((props) => …)` for presentational trees
- No `signal()`, `effect()`, `createQuery`, or fetch in `.view.ts`
- Sub-views: separate `createView` files (e.g. `home-code-showcase.view.ts`)

## Model file rules

- Factory: `export const createXModel = createModel((): XVM => ({ … }), "XModel")`
- With props: `export const createXModel = (props: XProps) => createModel((): XVM => ({ props, … }), "XModel")`
- Side effects (SEO, highlight on theme change) live here

## Routes

```typescript
export const homePage = createRouteView({
  name: "home",
  view: () => {
    applySeo({ title: "…", path: "/" });
    return bindModelView(createHomeModel, HomeView);
  },
});
```

## New documentation page

1. Add `src/content/<section>/<slug>.md`
2. Register in `core/content/nav.ts` via `item(...)`
3. Routes are generated from `allDocsNavItems` automatically

## See also

- [AGENTS.md](/docs/agents/agents) — full reference
- [Model & View](/docs/agents/model-and-view) — examples
- [Project layout](/docs/agents/project-layout) — directory map
