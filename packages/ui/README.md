<div align="center">

# @echojs-ecosystem/ui

**Accessible UI primitives for HyperDOM — theme, variants, and headless mode.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/ui)](https://www.npmjs.com/package/@echojs-ecosystem/ui)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/ui)

</div>

---

Component library for [`@echojs-ecosystem/hyperdom`](https://www.npmjs.com/package/@echojs-ecosystem/hyperdom). No React, no VDOM — real DOM nodes with **ARIA-first** semantics, **Tailwind** styling, and **tailwind-variants**.

## Features

- **Subpath exports** — `@echojs-ecosystem/ui/button` for tree-shaking
- **`UIProvider`** — global theme, default variants, overrides
- **Headless mode** — behavior & a11y without visual classes
- **Components** — Button, Input, Textarea, Field, Checkbox, Label, …
- **Storybook** — component catalog in `packages/ui`

## Install

```bash
npm install @echojs-ecosystem/ui @echojs-ecosystem/hyperdom
```

## Quick start

```ts
import { UIProvider } from "@echojs-ecosystem/ui/provider";
import { createTheme } from "@echojs-ecosystem/ui/theme";
import { Button } from "@echojs-ecosystem/ui/button";
import { h, render } from "@echojs-ecosystem/hyperdom";

const theme = createTheme({
  prefix: "echo",
  components: {
    button: { defaultVariants: { variant: "primary", size: "md" } },
  },
});

render(
  UIProvider({
    theme,
    children: () => Button({ children: "Save", variant: "primary" }),
  }),
  document.getElementById("app")!,
);
```

## Subpath imports

| Subpath | Components |
|---------|------------|
| `@echojs-ecosystem/ui/button` | Button |
| `@echojs-ecosystem/ui/input` | Input |
| `@echojs-ecosystem/ui/textarea` | Textarea |
| `@echojs-ecosystem/ui/field` | Field, `mergeFieldControlProps` |
| `@echojs-ecosystem/ui/checkbox` | Checkbox |
| `@echojs-ecosystem/ui/provider` | UIProvider |
| `@echojs-ecosystem/ui/theme` | `createTheme`, variants |
| `@echojs-ecosystem/ui/utils` | `cn`, `mergeProps`, … |

## Field + Input pattern

```ts
import { Field, mergeFieldControlProps } from "@echojs-ecosystem/ui/field";
import { Input } from "@echojs-ecosystem/ui/input";

Field({
  label: "Email",
  error: emailError.value(),
  children: (ctx) =>
    Input(
      mergeFieldControlProps(ctx.inputProps, {
        value: email.value(),
        onInput: (e) => email.set(e.currentTarget.value),
      }),
    ),
});
```

## Headless mode

```ts
UIProvider({ headless: true, children: () => App() });
Button({ headless: true, children: "Save" }); // a11y only, no theme classes
```

## Storybook

```bash
bun run storybook        # from packages/ui
bun run storybook:build  # static catalog
```

## Documentation

[echojs.dev/docs/packages/ui](https://echojs.dev/docs/packages/ui)
