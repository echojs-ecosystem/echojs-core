<div align="center">

# @echojs/ui

**Accessible UI primitives for HyperDOM — theme, variants, and headless mode.**

[![npm](https://img.shields.io/npm/v/@echojs/ui)](https://www.npmjs.com/package/@echojs/ui)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/packages/ui)

</div>

---

Component library for [`@echojs/hyperdom`](https://www.npmjs.com/package/@echojs/hyperdom). No React, no VDOM — real DOM nodes with **ARIA-first** semantics, **Tailwind** styling, and **tailwind-variants**.

## Features

- **Subpath exports** — `@echojs/ui/button` for tree-shaking
- **`UIProvider`** — global theme, default variants, overrides
- **Headless mode** — behavior & a11y without visual classes
- **Components** — Button, Input, Textarea, Field, Checkbox, Label, …
- **Storybook** — component catalog in `packages/ui`

## Install

```bash
npm install @echojs/ui @echojs/hyperdom
```

## Quick start

```ts
import { UIProvider } from "@echojs/ui/provider";
import { createTheme } from "@echojs/ui/theme";
import { Button } from "@echojs/ui/button";
import { h, render } from "@echojs/hyperdom";

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
| `@echojs/ui/button` | Button |
| `@echojs/ui/input` | Input |
| `@echojs/ui/textarea` | Textarea |
| `@echojs/ui/field` | Field, `mergeFieldControlProps` |
| `@echojs/ui/checkbox` | Checkbox |
| `@echojs/ui/provider` | UIProvider |
| `@echojs/ui/theme` | `createTheme`, variants |
| `@echojs/ui/utils` | `cn`, `mergeProps`, … |

## Field + Input pattern

```ts
import { Field, mergeFieldControlProps } from "@echojs/ui/field";
import { Input } from "@echojs/ui/input";

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
