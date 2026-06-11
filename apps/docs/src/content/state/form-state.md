---
title: Form state
description:
  Field trees, validation, and submit — ephemeral input state with
  @echojs-ecosystem/form.
keywords: [createForm, createField, bindField, validation]
---

# Form state

**Form state** is **user input before and during submit**: field values,
touched/dirty flags, field-level errors, and optional schema errors. It lives in
`@echojs-ecosystem/form` (`createField`, `createFieldArray`, `createForm`) — not
in global stores and usually not in the URL.

## How it differs from other layers

| Question                              | Form state   | Other layer                              |
| ------------------------------------- | ------------ | ---------------------------------------- |
| User typing in inputs?                | Yes          | —                                        |
| Survives route change without submit? | Usually no   | Store if you must                        |
| Shareable link?                       | Rarely       | [URL state](/docs/state/url-state)       |
| From API?                             | After submit | [Server state](/docs/state/server-state) |
| Which page?                           | —            | [Router state](/docs/state/router-state) |

Forms are **write-heavy and short-lived**. After a successful submit, persist
via API + query invalidation or [client store](/docs/state/client-store), not by
leaving values in fields forever.

## Structure

Keep the **field tree** in `features/<name>/model/<name>.form.ts`. The model
imports that form and owns submit / navigation side effects.

```
features/login-form/
  index.ts
  component/login-form.component.ts
  model/login-form.form.ts   ← createField, createFieldArray, persist
  model/login-form.model.ts  ← createModel, submit, reset
  view/login-form.view.ts    ← bindField
```

**`login-form.form.ts`** — fields + validation + optional persist:

```ts
import { createField, createForm } from '@echojs-ecosystem/form'
import { withLocalStorage } from '@echojs-ecosystem/persist'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const loginForm = createForm(
  {
    email: createField('').extend(
      withLocalStorage({ key: 'echojs:login:email' })
    ),
    password: createField(''),
  },
  { name: 'LoginForm', validationSchema: loginSchema }
)
```

**`login-form.model.ts`** — wire submit, expose `fields`:

```ts
import { createModel } from '@echojs-ecosystem/hyperdom'
import { loginForm } from './login-form.form'

export const createLoginFormModel = createModel(() => ({
  fields: loginForm.fields,
  submit: () => loginForm.submit(async (value) => api.login(value)),
  reset: () => loginForm.reset(),
}), 'LoginFormModel')
```

- Each **field** has `$value`, `meta()` (errors, touched).
- **Form** coordinates `submit()`, maps schema errors to paths, optional
  `defaultValues` / `defaultAsyncValues`.
- Do **not** call `createForm` inside `createModel` — define once in `*.form.ts`.

## Binding to the DOM

```ts
input({ type: 'email', ...bindField(loginForm.email) })
```

`bindField` connects HyperDOM inputs to field signals — always controlled, safe
inside `List` and dynamic rows (see [Forms guide](/docs/guides/forms)).

## Validation modes

| `validationOn`            | Behavior                  |
| ------------------------- | ------------------------- |
| `"manual"` (default)      | Validate on `submit()`    |
| `"onChange"` / `"onBlur"` | Live errors while editing |

Field-level validators on `createField` + form-level `validationSchema` (Zod)
can coexist; field errors win on matching paths.

## Submit boundary

```ts
const res = await loginForm.submit(async (value) => {
  await api.login(value)
})
if (!res.ok) return // res.errors
homePage.go()
```

After submit:

1. Call API ([server state](/docs/state/server-state) / mutations).
2. Update session [store](/docs/state/client-store) if needed.
3. Navigate ([router state](/docs/state/router-state)).
4. Optionally `reset()` the form.

## Persist on fields (exception)

```ts
createField('').extend(withLocalStorage({ key: 'login:email' }))
```

Use for **convenience** (remember email), not for authoritative session. Tokens
belong in [client store](/docs/state/client-store) + cookie, not form fields.

## vs local UI state

| Form state                   | Local UI state                |
| ---------------------------- | ----------------------------- |
| Many fields, validation tree | One or few flags (modal open) |
| `submit()` snapshot          | Actions like `toggle()`       |
| `createForm` / `createField` | `signal` in model             |

A settings panel with 20 inputs → form. A single “filters panel open” toggle →
local signal.

## Related

- [State overview](/docs/state/overview)
- [Forms guide](/docs/guides/forms)
- [Authentication](/docs/guides/authentication)
- Example — `apps/example/src/pages/auth/login/`, `features/forms-mini/`
