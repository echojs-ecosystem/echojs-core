---
title: UIProvider & Theme
description: createUiProvider, wrapRoot, and theme overrides.
package: "@echojs-ecosystem/ui"
---

# UIProvider & Theme

Register a UI provider in `createEchoApp` to supply global theme, default variants, and component overrides.

## Provider setup

```ts
import { createUiProvider } from "@echojs-ecosystem/ui/provider";

export const uiProvider = createUiProvider({
  // theme overrides
});
```

```ts
createEchoApp({ strictContextChecks: true })
  .use(uiProvider)
  .mount("#app");
```

Reference: `apps/example/src/core/providers/ui.ts`.

## Theme

```ts
import { createTheme } from "@echojs-ecosystem/ui/theme";

const theme = createTheme({
  prefix: "echo",
  components: {
    button: { defaultVariants: { variant: "primary", size: "md" } },
  },
});
```

Pass `theme` to `UIProvider` or `createUiProvider` options.

## wrapRoot

The provider can wrap the app root so all views inherit theme context and default variants without per-component setup.

## See also

- [UIProvider API](/docs/packages/ui/api/provider)
- [Button Demo example](/docs/packages/ui/examples/button-demo)
