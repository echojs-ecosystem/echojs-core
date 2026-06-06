---
title: cx
description: cx, on, aria, data — class builder and prop bag helpers.
package: "@echojs-ecosystem/hyperdom"
---

# cx

```ts
function cx(...values: ClassValue[]): string
```

Joins class strings, arrays, and conditional maps. Tailwind-friendly.

```ts
import { cx } from "@echojs-ecosystem/hyperdom";

cx("btn", $active.value() && "btn--on", { "btn--lg": $large.value() });
// → "btn btn--on"
```

## `on` — event helpers

```ts
import { on } from "@echojs-ecosystem/hyperdom";

button({ ...on.click(() => {}) }, "Click");
form({ ...on.submit(handleSubmit) }, fields);
```

| Method | Returns |
| --- | --- |
| `on.click(fn)` | `{ onClick: fn }` |
| `on.input(fn)` | `{ onInput: fn }` |
| `on.change(fn)` | `{ onChange: fn }` |
| `on.submit(fn)` | `{ onSubmit: fn }` |

For per-element `currentTarget` typing, prefer `onClick` on DSL tags directly.

## `aria` — accessibility helpers

```ts
import { aria } from "@echojs-ecosystem/hyperdom";

button({
  ...aria.label("Close"),
  ...aria.expanded($open.value()),
  ...aria.pressed($active.value()),
  ...aria.hidden(!$visible.value()),
});
```

## `data` — test attribute helpers

```ts
import { data } from "@echojs-ecosystem/hyperdom";

div({ ...data.testid("sidebar") });
```

## See also

- [Guides: Styling & Classes](/docs/packages/hyperdom/guides/styling-and-classes)
- [Guides: Events & Handlers](/docs/packages/hyperdom/guides/events-and-handlers)
