---
title: UIProvider
description: UIProvider and createUiProvider for global theme.
package: '@echojs-ecosystem/ui'
---

# UIProvider

```ts
import { UIProvider, createUiProvider } from '@echojs-ecosystem/ui/provider'
import { createTheme } from '@echojs-ecosystem/ui/theme'
```

Supplies global theme, default component variants, and optional overrides to all
descendant views.

## createUiProvider

Echo app provider factory:

```ts
export const uiProvider = createUiProvider({
  theme: createTheme({
    prefix: 'echo',
    components: {
      /* … */
    },
  }),
})
```

Register with `createEchoApp().use(uiProvider)`.

## UIProvider

Low-level wrapper when not using the Echo provider pattern:

```ts
UIProvider({
  theme,
  children: () => /* view tree */,
});
```

## See also

- [UIProvider & Theme](/docs/packages/ui/guides/ui-provider)
