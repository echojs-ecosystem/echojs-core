---
title: Button
description: Button component — variants, sizes, and icons.
package: '@echojs-ecosystem/ui'
---

# Button

```ts
import { Button } from '@echojs-ecosystem/ui/button'
```

Primary action control with **tailwind-variants** styling.

## Props (common)

| Prop                     | Description                        |
| ------------------------ | ---------------------------------- |
| `variant`                | `primary`, `secondary`, `ghost`, … |
| `size`                   | `sm`, `md`, `lg`                   |
| `leftIcon` / `rightIcon` | Optional icon slot                 |
| `children`               | Label content                      |
| `disabled`               | Disable interaction                |

Defaults resolve from `UIProvider` theme.

## Example

```ts
Button({
  variant: 'primary',
  size: 'md',
  children: 'Save',
})
```

## See also

- [Button & Field guide](/docs/packages/ui/guides/button-and-field)
- [Button Demo](/docs/packages/ui/examples/button-demo)
