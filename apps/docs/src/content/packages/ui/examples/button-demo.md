---
title: Button Demo
description: Button variants from packages/ui and the docs playground.
package: '@echojs-ecosystem/ui'
---

# Button Demo

```ts
import { Button } from '@echojs-ecosystem/ui/button'

Button({
  variant: 'primary',
  size: 'md',
  leftIcon: '✓',
  children: 'Save changes',
})
```

Try variants interactively in the [Playground](/docs/packages/ui/playground).

## With provider

```ts
import { createUiProvider } from '@echojs-ecosystem/ui/provider'

createEchoApp({ strictContextChecks: true }).use(uiProvider).mount('#app')
```

Theme defaults apply to all `Button` instances without repeating `variant` /
`size`.

## Live references

| Resource     | Path                         |
| ------------ | ---------------------------- |
| Storybook    | `packages/ui/.storybook`     |
| Home snippet | `apps/docs` → home constants |

## See also

- [Button API](/docs/packages/ui/api/button)
