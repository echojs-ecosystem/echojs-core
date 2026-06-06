---
title: Form Row
description: Field, Label, and Input composition.
package: "@echojs-ecosystem/ui"
---

# Form Row

```ts
import { Field } from "@echojs-ecosystem/ui/field";
import { Input } from "@echojs-ecosystem/ui/input";
import { Label } from "@echojs-ecosystem/ui/label";

Field({
  children: [
    Label({ children: "Email" }),
    Input({ type: "email", name: "email", placeholder: "you@example.com" }),
  ],
});
```

## Reactive binding

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

Read `email.value()` inside a HyperDOM reactive child so the input updates when the signal changes.

## See also

- [Form Controls](/docs/packages/ui/guides/forms)
- [Field API](/docs/packages/ui/api/field)
