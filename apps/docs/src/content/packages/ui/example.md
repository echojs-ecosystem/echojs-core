---
title: Example
description: UI components preview from packages/ui README and example app.
package: "@echojs/ui"
status: draft
---

# Example — UI

> [!NOTE]
> Полная документация UI в работе. Ниже — рабочие фрагменты из `packages/ui` и `apps/example`.

## Provider (`apps/example`)

```ts
import { createUiProvider } from "@echojs/ui/provider";

export const uiProvider = createUiProvider({
  // theme overrides
});
```

```ts
createEchoApp({ strictContextChecks: true })
  .use(uiProvider)
  .mount("#app");
```

## Button

```ts
import { Button } from "@echojs/ui/button";

Button({
  variant: "primary",
  size: "md",
  leftIcon: "✓",
  children: "Save changes",
});
```

## Field + Input

```ts
import { Field } from "@echojs/ui/field";
import { Input } from "@echojs/ui/input";
import { Label } from "@echojs/ui/label";

Field({
  children: [
    Label({ children: "Email" }),
    Input({ type: "email", name: "email", placeholder: "you@example.com" }),
  ],
});
```

## Subpath imports

```ts
import { Button } from "@echojs/ui/button";
import { Checkbox } from "@echojs/ui/checkbox";
import { createTheme } from "@echojs/ui/theme";
```

## Live references

| Resource | Path |
| --- | --- |
| README + stories | `packages/ui/README.md`, `packages/ui/.storybook` |
| Home snippet | `apps/docs` → home constants |
| Lab provider | `apps/example/src/core/providers/ui.ts` |

## See also

- [UI overview](/docs/packages/ui)
- HyperDOM Example — `/docs/packages/hyperdom/example`
