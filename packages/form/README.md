<div align="center">

# @echojs-ecosystem/form

**Signal-native forms — fields, validation, and Hyperdom bindings.**

[![npm](https://img.shields.io/npm/v/@echojs-ecosystem/form)](https://www.npmjs.com/package/@echojs-ecosystem/form)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/guides/forms)

</div>

---

Framework-agnostic form primitives for EchoJS. **Fields are reactive objects** with `.value()`, `.meta()`, validation via [Standard Schema](https://github.com/standard-schema/standard-schema), and optional Hyperdom bindings.

## Features

- **`createField`** — single value with validation & meta (touched, errors, dirty)
- **`createFieldArray`** — dynamic lists of fields
- **`createForm`** — grouped fields with submit & schema validation
- **`bindField`** — Hyperdom binding for `@echojs-ecosystem/ui` inputs
- **Persistence-ready** — extend fields with `@echojs-ecosystem/persist`

## Install

```bash
npm install @echojs-ecosystem/form @echojs-ecosystem/reactivity
# optional UI bindings
npm install @echojs-ecosystem/hyperdom @echojs-ecosystem/ui
```

## Quick start

```ts
import { createField, createForm } from "@echojs-ecosystem/form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  remember: z.boolean(),
});

export const loginForm = createForm(
  {
    email: createField(""),
    remember: createField(false),
  },
  { name: "LoginForm", validationSchema: schema },
);

// In a view
loginForm.fields.email.value();
loginForm.fields.email.meta().errors;
await loginForm.submit();
```

### Hyperdom + UI

```ts
import { bindField } from "@echojs-ecosystem/form";

input({ type: "email", ...bindField(loginForm.fields.email) });
```

## API

| Export | Description |
|--------|-------------|
| `createField` | Single reactive field |
| `createFieldArray` | Array of fields |
| `createFieldSet` | Field grouping |
| `createForm` | Form with validation |
| `bindField` | Hyperdom control binding |
| `createFieldKit` | Reusable field factories |

## Related packages

| Package | Role |
|---------|------|
| [`@echojs-ecosystem/persist`](https://www.npmjs.com/package/@echojs-ecosystem/persist) | Save field/form state to storage |
| [`@echojs-ecosystem/ui`](https://www.npmjs.com/package/@echojs-ecosystem/ui) | Accessible inputs via `bindField` |
| [`@echojs-ecosystem/hyperdom`](https://www.npmjs.com/package/@echojs-ecosystem/hyperdom) | View layer |

## Documentation

[echojs.dev/docs/guides/forms](https://echojs.dev/docs/guides/forms)
