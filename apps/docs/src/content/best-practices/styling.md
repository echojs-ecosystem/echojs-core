---
title: Styling
description:
  File layout, tailwind-variants slots, global vs local styles, and reactive
  classes in EchoJS views.
keywords: [styling, tailwind-variants, tv, view.styles, cn]
---

# Styling

Decision rules for component styles in EchoJS apps.

## File layout

Keep styles **next to the view** that uses them:

```
widgets/code-block/
  ui/
    code-block.view.ts
    code-block.view.styles.ts
```

Name: **`<feature>.view.styles.ts`** (or `*.styles.ts` for layout widgets).

## `tailwind-variants` (`tv`)

EchoJS docs use `tv` from `tailwind-variants` for slot-based style objects:

```ts
import { tv } from 'tailwind-variants'

export const codeBlockStyles = tv({
  slots: {
    root: 'overflow-hidden rounded-xl border border-border/80',
    header: 'flex items-center justify-between border-b px-4 py-2',
    body: 'overflow-x-auto p-4 font-mono text-sm',
  },
  variants: {
    bare: {
      true: { root: 'border-0' },
      false: {},
    },
  },
})
```

```ts
const code = codeBlockStyles()

div({ class: code.root() }, [
  div({ class: code.header() }, '…'),
  div({ class: code.body() }, '…'),
])
```

| Practice | Reason |
| -------- | ------ |
| Call `const styles = myStyles()` once per module | Stable slot functions, readable JSX-like trees |
| Use `variants` for boolean/size enums | Avoid duplicating `cn(a, cond && b)` everywhere |
| Share tokens via composed styles (`headerIconBtnStyles`) | One source for icon buttons in header |
| Use `cn()` from `@core/styles/cn` for one-off merges | `twMerge` resolves conflicting Tailwind classes |

## Global vs local

| Global (`app/styles/global.css`) | Local (`*.view.styles.ts`) |
| -------------------------------- | -------------------------- |
| Design tokens, `@theme`, resets  | Component layout and hover |
| `.echo-scrollbar`, `.text-gradient` | Card chrome, section spacing |
| `prefers-reduced-motion` overrides | Feature-specific variants |

Do not put single-use widget classes in global CSS.

## Reactive classes

```ts
button({
  class: () =>
    cn(
      row(),
      vm.isActive() && rowActive(),
      vm.isDisabled() && rowDisabled()
    ),
})
```

Match router active state with `NavLink` `activeClass` when possible instead
of hand-rolling path checks in the view.

## Icons and assets

Keep SVG icons in `widgets/icons/` (or package UI). Views import icon
components — no inline 200-line SVG in view files.

## Related

- [Views](/docs/best-practices/views) — `createView` and composition
- [Conventions](/docs/guides/conventions) — naming tables
- [Overview](/docs/best-practices/overview)
