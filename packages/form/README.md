<div align="center">

# @echojs/form

**Signal-native forms — fields, validation, and Hyperdom bindings.**

[![npm](https://img.shields.io/npm/v/@echojs/form)](https://www.npmjs.com/package/@echojs/form)
[![docs](https://img.shields.io/badge/docs-echojs.dev-blue)](https://echojs.dev/docs/guides/forms)

</div>

---

Framework-agnostic form primitives for EchoJS. **Fields are reactive objects** with `.value()`, `.meta()`, validation via [Standard Schema](https://github.com/standard-schema/standard-schema), and optional Hyperdom bindings.

## Features

- **`createField`** — single value with validation & meta (touched, errors, dirty)
- **`createFieldArray`** — dynamic lists of fields
- **`createForm`** — grouped fields with submit & schema validation
- **`bindField`** — Hyperdom binding for `@echojs/ui` inputs
- **Persistence-ready** — extend fields with `@echojs/persist`

## Install

```bash
npm install @echojs/form @echojs/reactivity
# optional UI bindings
npm install @echojs/hyperdom @echojs/ui
```

## Quick start

```ts
import { createField, createForm } from "@echojs/form";
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
import { bindField } from "@echojs/form";

bindField(loginForm.fields.email, { variant: "email" });
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
| [`@echojs/persist`](https://www.npmjs.com/package/@echojs/persist) | Save field/form state to storage |
| [`@echojs/ui`](https://www.npmjs.com/package/@echojs/ui) | Accessible inputs via `bindField` |
| [`@echojs/hyperdom`](https://www.npmjs.com/package/@echojs/hyperdom) | View layer |

## Documentation

[echojs.dev/docs/guides/forms](https://echojs.dev/docs/guides/forms)
