---
title: Form Controls
description: Input, Textarea, Checkbox, and the global Forms guide.
package: '@echojs-ecosystem/ui'
---

# Form Controls

Form primitives compose through `Field` — label, control, error, and ARIA wiring
in one place.

## Available controls

| Component  | Subpath                         | Role                                  |
| ---------- | ------------------------------- | ------------------------------------- |
| `Input`    | `@echojs-ecosystem/ui/input`    | Text, email, password, …              |
| `Textarea` | `@echojs-ecosystem/ui/textarea` | Multi-line text                       |
| `Checkbox` | `@echojs-ecosystem/ui/checkbox` | Boolean toggle                        |
| `Label`    | `@echojs-ecosystem/ui/label`    | Accessible label                      |
| `Field`    | `@echojs-ecosystem/ui/field`    | Wrapper with `mergeFieldControlProps` |

## Patterns

- **Controlled values** — bind `value` / `onInput` from signals inside reactive
  view children
- **Errors** — pass `error` string to `Field`; control receives `aria-invalid`
- **Masks** — input-mask helpers in `@echojs-ecosystem/ui/utils` (where
  exported)

> [!note] Per-control docs are **expanding**. See
> [Forms guide](/docs/guides/forms) for cross-package form patterns and
> `packages/ui` Storybook for variants.

## See also

- [Form Row example](/docs/packages/ui/examples/form-row)
- [Button & Field](/docs/packages/ui/guides/button-and-field)
- [Forms guide](/docs/guides/forms)
