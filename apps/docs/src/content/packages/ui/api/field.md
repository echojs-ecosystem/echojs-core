---
title: Field
description: Field wrapper, mergeFieldControlProps, and form wiring.
package: "@echojs-ecosystem/ui"
---

# Field

```ts
import { Field, mergeFieldControlProps } from "@echojs-ecosystem/ui/field";
```

Accessible form row — label, control slot, error message, and `inputProps` for ARIA.

## Field props

| Prop | Description |
| --- | --- |
| `label` | Visible label text |
| `error` | Error message (sets `aria-invalid` on control) |
| `children` | Control element or render fn `(ctx) => …` |

## mergeFieldControlProps

Merges field context (`id`, `aria-*`) with control-specific props:

```ts
Field({
  label: "Email",
  children: (ctx) =>
    Input(mergeFieldControlProps(ctx.inputProps, { type: "email" })),
});
```

## See also

- [Form Controls](/docs/packages/ui/guides/forms)
- [Form Row example](/docs/packages/ui/examples/form-row)
