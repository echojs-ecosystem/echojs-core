---
title: Button & Field
description: Button variants and Field + Input composition.
package: '@echojs-ecosystem/ui'
---

# Button & Field

Core interactive primitives — action buttons and labeled form rows.

## Button

```ts
import { Button } from '@echojs-ecosystem/ui/button'

Button({
  variant: 'primary',
  size: 'md',
  leftIcon: '✓',
  children: 'Save changes',
})
```

Variants use **tailwind-variants** — `primary`, `secondary`, `ghost`, sizes `sm`
/ `md` / `lg`. Defaults come from theme via `UIProvider`.

## Field + Input

```ts
import { Field } from '@echojs-ecosystem/ui/field'
import { Input } from '@echojs-ecosystem/ui/input'
import { Label } from '@echojs-ecosystem/ui/label'

Field({
  children: [
    Label({ children: 'Email' }),
    Input({ type: 'email', name: 'email', placeholder: 'you@example.com' }),
  ],
})
```

## mergeFieldControlProps

Connect reactive signal state to field context:

```ts
import { Field, mergeFieldControlProps } from '@echojs-ecosystem/ui/field'
import { Input } from '@echojs-ecosystem/ui/input'

Field({
  label: 'Email',
  error: emailError.value(),
  children: (ctx) =>
    Input(
      mergeFieldControlProps(ctx.inputProps, {
        value: email.value(),
        onInput: (e) => email.set(e.currentTarget.value),
      })
    ),
})
```

## See also

- [Button API](/docs/packages/ui/api/button)
- [Field API](/docs/packages/ui/api/field)
- [Form Row example](/docs/packages/ui/examples/form-row)
