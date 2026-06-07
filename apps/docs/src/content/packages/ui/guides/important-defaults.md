---
title: Important Defaults
description: Subpath imports, headless mode, and accessibility conventions.
package: '@echojs-ecosystem/ui'
---

# Important Defaults

`@echojs-ecosystem/ui` is a HyperDOM component library — no React, no VDOM.
These conventions shape how you import and compose controls.

## Subpath exports

Prefer per-component subpaths for tree-shaking:

```ts
import { Button } from '@echojs-ecosystem/ui/button'
import { Input } from '@echojs-ecosystem/ui/input'
import { createUiProvider } from '@echojs-ecosystem/ui/provider'
```

| Subpath                         | Components                        |
| ------------------------------- | --------------------------------- |
| `@echojs-ecosystem/ui/button`   | `Button`                          |
| `@echojs-ecosystem/ui/input`    | `Input`                           |
| `@echojs-ecosystem/ui/field`    | `Field`, `mergeFieldControlProps` |
| `@echojs-ecosystem/ui/provider` | `UIProvider`, `createUiProvider`  |
| `@echojs-ecosystem/ui/theme`    | `createTheme`, variants           |

## HyperDOM composition

Components are **functions** that return DOM nodes — call them inside views or
pass as `children`:

```ts
Button({
  variant: 'primary',
  size: 'md',
  children: 'Save',
})
```

## Headless mode

Components support headless / `data-*` hooks — behavior and ARIA without visual
Tailwind classes. Useful for custom design systems.

## Accessibility

- ARIA-first semantics on interactive controls
- `Field` wires `label`, `error`, and `inputProps` for screen readers
- Use `Label` + `Input` inside `Field` for standard form rows

> [!note] Per-component a11y docs are **expanding**. See Storybook stories for
> current coverage.

## See also

- [UIProvider & Theme](/docs/packages/ui/guides/ui-provider)
- [Button & Field](/docs/packages/ui/guides/button-and-field)
