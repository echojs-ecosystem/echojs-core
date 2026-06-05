---
title: Model & View
description: How createModel and createView work together in apps/docs.
---

# Model & View

## Responsibility split

| | Model | View |
|---|--------|------|
| **Owns** | State, effects, queries, actions | DOM structure, styles, composition |
| **Imports** | `@echojs/reactivity`, `@echojs/query`, providers | `@echojs/hyperdom`, `@echojs/router/hyperdom`, style modules |
| **Exports** | `createXModel`, `XVM` type | `XView = createView(...)` |

## Minimal widget

**`model/theme-toggle.model.ts`**

```typescript
import { createModel } from "@echojs/hyperdom";
import { $themeMode, toggleTheme } from "@core/providers/index.js";

export type ThemeToggleVM = {
  isDarkMode: () => boolean;
  toggle: () => void;
};

export const createThemeToggleModel = createModel((): ThemeToggleVM => ({
  isDarkMode: () => $themeMode.value() === "dark" /* + system */,
  toggle: toggleTheme,
}), "ThemeToggleModel");
```

**`ui/theme-toggle.view.ts`**

```typescript
export const ThemeToggleView = createView((vm: ThemeToggleVM): Child =>
  button({ type: "button", onClick: vm.toggle }, () =>
    vm.isDarkMode() ? SunIcon() : MoonIcon(),
  ),
  "ThemeToggleView",
);
```

**`index.ts`**

```typescript
export const ThemeToggle = (): Child =>
  bindModelView(createThemeToggleModel, ThemeToggleView);
```

## Widget with props

**`model/code-block.model.ts`** — reads `props.code`, runs Shiki in `effect`, exposes `copy()`.

**`ui/code-block.view.ts`** — renders header + `innerHTML` from `vm.$html`.

**`index.ts`**

```typescript
export const CodeBlock = (props: CodeBlockProps): Child =>
  bindModelViewWith(props, createCodeBlockModel, CodeBlockView);
```

## Page with local state

**`model/home.model.ts`** — `$codeTab`, `setCodeTab`, `activeCodeTab()`.

**`ui/home.view.ts`** — `HomeView = createView((vm) => …)` composes sections and passes `vm` to `HomeCodeShowcaseView(vm)`.

**`home.page.ts`**

```typescript
view: () => {
  applySeo({ … });
  return bindModelView(createHomeModel, HomeView);
},
```

## Nested presentational views

Split large pages into multiple `createView` files:

- `home.view.ts` — layout sections
- `home-code-showcase.view.ts` — tabbed code (uses `HomeVM`)
- `home-compare-card.view.ts` — props-only `CompareCardViewProps`

Parent view calls child views: `HomeCompareCardView({ tone, data })` — still `createView`, no model needed for pure props.

## Anti-patterns

```typescript
// BAD — logic in view
export const Bad = (): Child => {
  const $x = signal(0);
  return button({ onClick: () => $x.set(1) }, "…");
};

// BAD — no createView
export const BadView = (vm: VM): Child => div(null, "…");

// GOOD
export const GoodView = createView((vm: VM): Child => div(null, "…"), "GoodView");
```

## Hyperdom note

`h()` and components must run inside `createView` (or another view context). That is why every exported UI piece uses `createView`.
