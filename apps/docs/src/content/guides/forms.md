---
title: Forms
description: Field trees, Zod validation, bindField, and UI inputs with @echojs-ecosystem/form.
keywords: [createForm, createField, bindField, zod, validation]
---

# Forms

Form state in EchoJS is handled by **`@echojs-ecosystem/form`**: reactive fields, optional Standard Schema validation (Zod), and HyperDOM bindings. **`@echojs-ecosystem/ui`** supplies styled `Input`, `Field`, and labels — the guide covers both layers.

> [!NOTE]
> The Forms doc is linked from the UI package group in the sidebar and listed under **Guides** — same `contentId`, one canonical route.

## Core pieces

| API | Role |
| --- | --- |
| `createField` | Single control value + meta (touched, errors) |
| `createFieldArray` | Dynamic list of rows |
| `createForm` | Submit, schema validation, `defaultValues` |
| `bindField` | Spread onto native `input` / UI `Input` in HyperDOM |

Install: `pnpm add @echojs-ecosystem/form zod` (Zod or any Standard Schema adapter).

## Simple login form

Pattern from `apps/example` auth login:

```ts
import { createField, createForm } from "@echojs-ecosystem/form";
import { withLocalStorage } from "@echojs-ecosystem/persist";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  remember: z.boolean(),
});

export const authLoginForm = createForm(
  {
    email: createField("").extend(withLocalStorage({ key: "echojs:login:email" })),
    password: createField(""),
    remember: createField(false).extend(withLocalStorage({ key: "echojs:login:remember" })),
  },
  {
    name: "AuthLoginForm",
    validationSchema: loginSchema,
    defaultValues: { email: "", password: "", remember: false },
  },
);

// In model / view — fields are on the form instance:
const { email, password, remember } = authLoginForm;
```

`validationOn` defaults to `"manual"` — validation runs on **`submit()`** unless you opt into `onChange` / `onBlur`.

## Bind fields in HyperDOM

```ts
import { bindField } from "@echojs-ecosystem/form";
import { button, div, input, label, p } from "@echojs-ecosystem/hyperdom";

div(null, [
  label(null, [
    "Email",
    input({ ...bindField(email, { variant: "email" }) }),
  ]),
  (): Child => {
    const errs = email.meta().errors;
    return errs.length ? p({ class: "text-danger" }, errs.join(", ")) : null;
  },
  button(
    {
      type: "button",
      onClick: async () => {
        const res = await authLoginForm.submit(async (value) => {
          await api.login(value);
        });
        if (!res.ok) console.debug(res.errors);
      },
    },
    () => "Sign in",
  ),
]);
```

`bindField` sets `value`, `onInput` / `onChange`, and accessibility hooks for the chosen **variant** (`text`, `email`, `checkbox`, `textarea`, `select`, `number`, …).

> [!WARNING]
> Inside **`List`** / dynamic rows, pass `controlledValue: true` on text-like fields so HyperDOM does not lose input text after re-renders (`apps/example` forms-mini demo).

## With `@echojs-ecosystem/ui`

```ts
import { Input } from "@echojs-ecosystem/ui";
import { bindField } from "@echojs-ecosystem/form";

Input({
  ...bindField(email, { variant: "email" }),
  invalid: () => email.meta().errors.length > 0,
  placeholder: "you@example.com",
});
```

Wrap with `Field` + `Label` for descriptions and error slots when building accessible forms.

## Field arrays

```ts
import { createField, createFieldArray, createForm, arrayGenerator } from "@echojs-ecosystem/form";

type TagRow = { tag: ReturnType<typeof createField<string>> };

const hobbiesForm = createForm(
  { tags: createFieldArray<TagRow[]>([]) },
  {
    name: "HobbiesForm",
    validationSchema: z.object({ tags: z.array(z.object({ tag: z.string().min(1) })) }),
    arrayActions: (form) => {
      const createRow = () => ({ tag: createField("") });
      return {
        appendTag: arrayGenerator.append(form, createRow, "tags"),
        removeTag: arrayGenerator.remove(form, "tags"),
      };
    },
  },
);
```

Render rows with `List(fieldArray.$items, …)` and `bindField(row.tag, { variant: "text", controlledValue: true })`.

Nested catalog demo: `apps/example/src/features/forms-nested-catalog/`.

## Submit result

```ts
const res = await form.submit(async (value) => {
  // value is typed TValue when schema/getValue align
  await save(value);
});

if (res.ok) {
  // success
} else {
  // res.errors — field paths + optional $schema map
}
```

Use **`validate`** / **`validateAsync`** on the form for custom rules without Zod.

## Persisted fields

`withLocalStorage` / `withCookie` on `createField` or stores — see [Persist usage](/docs/packages/persist/usage). Pause persist during logout when clearing auth (see [Authentication](/docs/guides/authentication)).

## Model integration

Typical feature layout:

```
features/checkout/
  model/checkout-form.ts   # createForm export
  model/checkout.model.ts  # exposes form + submit action
  ui/checkout.view.ts      # bindField + UI
```

Keep **submit side effects** (API calls, navigation) in the model action or mutation, not in raw `onClick` handlers scattered across views.

## Related

- [State overview](/docs/state/overview)
- [Data fetching](/docs/guides/data-fetching) — `createMutation` after submit
- [UI package](/docs/packages/ui/overview)
- Example — `apps/example/src/features/forms-mini/`, `pages/auth/login/`
