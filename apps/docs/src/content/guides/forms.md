---
title: Forms
description:
  Field trees, Zod validation, bindField, and UI inputs with
  @echojs-ecosystem/form.
keywords: [createForm, createField, bindField, zod, validation]
---

# Forms

Form state in EchoJS is handled by **`@echojs-ecosystem/form`**: reactive
fields, optional Standard Schema validation (Zod), and HyperDOM bindings.
**`@echojs-ecosystem/ui`** supplies styled `Input`, `Field`, and labels.

> [!NOTE] The Forms doc is linked from the UI package group in the sidebar and
> listed under **Guides** — same `contentId`, one canonical route.

> [!TIP] Fields are reactive cells — same tracking rules as
> [Reactivity](/docs/guides/reactivity). Views bind with `bindField`; models
> own submit and side effects.

## Mental model

| API                | Role                                                |
| ------------------ | --------------------------------------------------- |
| `createField`      | Single control value + meta (touched, dirty, errors) |
| `createFieldArray` | Dynamic list of rows                                |
| `createForm`       | Submit, schema validation, `defaultValues`          |
| `bindField`        | Spread onto native `input` / UI `Input` in HyperDOM |

Form state belongs to **user input** — not global stores. Share submitted values
via mutations or session stores after successful `submit()`.

Install: `pnpm add @echojs-ecosystem/form zod` (Zod or any Standard Schema
adapter).

## Where code lives

| Piece            | Location                                      |
| ---------------- | --------------------------------------------- |
| Form definition  | `features/<name>/model/*-form.ts`             |
| Model + actions  | `features/<name>/model/*.model.ts`            |
| `bindField` view | `features/<name>/view/*.view.ts`              |
| Component wiring | `features/<name>/component/*.component.ts`    |
| Public API       | `features/<name>/index.ts`                    |
| Validation schema| Same file as form or `*.schema.ts`            |

```
features/checkout/
  index.ts
  component/checkout.component.ts
  model/checkout-form.ts
  model/checkout.model.ts
  view/checkout.view.ts
```

## Simple login form

Pattern from `apps/example` auth login:

```ts
import { createField, createForm } from '@echojs-ecosystem/form'
import { withLocalStorage } from '@echojs-ecosystem/persist'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'At least 6 characters'),
  remember: z.boolean(),
})

export const authLoginForm = createForm(
  {
    email: createField('').extend(
      withLocalStorage({ key: 'echojs:login:email' })
    ),
    password: createField(''),
    remember: createField(false).extend(
      withLocalStorage({ key: 'echojs:login:remember' })
    ),
  },
  {
    name: 'AuthLoginForm',
    validationSchema: loginSchema,
    defaultValues: { email: '', password: '', remember: false },
  }
)
```

`validationOn` defaults to `"manual"` — validation runs on **`submit()`** unless
you opt into `onChange` / `onBlur`:

| Mode       | When to use                          |
| ---------- | ------------------------------------ |
| `manual`   | Login, checkout — validate on submit |
| `onBlur`   | Few fields, early feedback           |
| `onChange` | Live validation, wizard steps        |

## Bind fields in HyperDOM

```ts
import { bindField } from '@echojs-ecosystem/form'
import { button, div, input, label, p } from '@echojs-ecosystem/hyperdom'

div(null, [
  label(null, ['Email', input({ ...bindField(email, { variant: 'email' }) })]),
  (): Child => {
    const errs = email.meta().errors
    return errs.length ? p({ class: 'text-danger' }, errs.join(', ')) : null
  },
  button(
    {
      type: 'button',
      onClick: async () => {
        const res = await authLoginForm.submit(async (value) => {
          await api.login(value)
        })
        if (!res.ok) console.debug(res.errors)
      },
    },
    () => 'Sign in'
  ),
])
```

`bindField` sets `value`, `onInput` / `onChange`, and accessibility hooks for
the chosen **variant** (`text`, `email`, `checkbox`, `textarea`, `select`,
`number`, …).

> [!WARNING] Inside **`List`** / dynamic rows, pass `controlledValue: true` on
> text-like fields so HyperDOM does not lose input text after re-renders
> (`apps/example` forms-mini demo).

## With `@echojs-ecosystem/ui`

```ts
import { Input } from '@echojs-ecosystem/ui'
import { bindField } from '@echojs-ecosystem/form'

Input({
  ...bindField(email, { variant: 'email' }),
  invalid: () => email.meta().errors.length > 0,
  placeholder: 'you@example.com',
})
```

Wrap with `Field` + `Label` for descriptions and error slots when building
accessible forms — see [UI forms guide](/docs/packages/ui/guides/forms).

## Model integration

Keep **submit side effects** in the model, not scattered `onClick` handlers:

```ts
export const createLoginModel = createModel((): LoginVM => {
  const $isSubmitting = signal(false)

  return {
    form: authLoginForm,
    isSubmitting: () => $isSubmitting.value(),
    submit: async () => {
      $isSubmitting.set(true)
      try {
        const res = await authLoginForm.submit(async (value) => {
          await api.login(value)
        })
        if (res.ok) homePage.go()
        return res
      } finally {
        $isSubmitting.set(false)
      }
    },
  }
}, 'LoginModel')
```

View calls `vm.submit()` — pairs with [Authentication](/docs/guides/authentication)
and [Data fetching](/docs/guides/data-fetching) mutations.

## Field arrays

```ts
import {
  createField,
  createFieldArray,
  createForm,
  arrayGenerator,
} from '@echojs-ecosystem/form'

type TagRow = { tag: ReturnType<typeof createField<string>> }

const hobbiesForm = createForm(
  { tags: createFieldArray<TagRow[]>([]) },
  {
    name: 'HobbiesForm',
    validationSchema: z.object({
      tags: z.array(z.object({ tag: z.string().min(1) })),
    }),
    arrayActions: (form) => {
      const createRow = () => ({ tag: createField('') })
      return {
        appendTag: arrayGenerator.append(form, createRow, 'tags'),
        removeTag: arrayGenerator.remove(form, 'tags'),
      }
    },
  }
)
```

Render rows with `List(fieldArray.$items, …)` and
`bindField(row.tag, { variant: 'text', controlledValue: true })`.

Nested catalog demo: `apps/example/src/features/forms-nested-catalog/`.

## Submit result

```ts
const res = await form.submit(async (value) => {
  await save(value)
})

if (res.ok) {
  // success — navigate or toast
} else {
  // res.errors — field paths + optional $schema map
}
```

Use **`validate`** / **`validateAsync`** on the form for custom rules without
Zod.

## Persisted fields

`withLocalStorage` / `withCookie` on `createField` or stores — see
[Persist guides](/docs/packages/persist/guides/storage-adapters).

During **logout**, pause persist adapters before clearing auth fields — see
[Authentication](/docs/guides/authentication).

## Forms vs other state

| Need                    | Use                         |
| ----------------------- | --------------------------- |
| Draft input, validation | `createForm`                |
| Submitted profile       | `createStore` or Query      |
| Filter in URL           | [URL state](/docs/state/url-state) |
| Server list             | [Query](/docs/guides/data-fetching) |

Do not mirror every keystroke into a global store.

## Checklist for new forms

1. Schema aligned with API body shape.
2. Form module export (`authLoginForm`) + model submit action.
3. `bindField` in view; errors from `field.meta().errors`.
4. `controlledValue: true` in dynamic lists.
5. Mutation or API call inside `submit()` callback, not in view.
6. Clear sensitive fields on logout (`password` fields without persist).

## Common pitfalls

1. **Validation only in the view** — use `validationSchema` on the form.
2. **Lost focus in lists** — missing `controlledValue: true`.
3. **Global store for form drafts** — keep fields on the form tree.
4. **Submit without checking `res.ok`** — handle field and schema errors.

## Related

- [Reactivity](/docs/guides/reactivity) — field meta as reactive reads
- [Conventions](/docs/guides/conventions) — `authLoginForm` naming
- [Authentication](/docs/guides/authentication) — login flow
- [Data fetching](/docs/guides/data-fetching) — `createMutation` after submit
- [UI package](/docs/packages/ui)
- Example — `apps/example/src/features/forms-mini/`, `pages/auth/login/`
