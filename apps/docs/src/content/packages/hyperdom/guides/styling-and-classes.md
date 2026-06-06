---
title: Styling & Classes
description: class, style, cx(), and prop modifiers for styling HyperDOM views.
package: "@echojs-ecosystem/hyperdom"
---

# Styling & Classes

HyperDOM supports strings, objects, arrays, and reactive getters for `class` and `style` props.

## `cx()` — conditional classes

```ts
import { cx } from "@echojs-ecosystem/hyperdom";

span({
  class: () => cx("badge", $active.value() && "badge--on"),
  style: { color: "var(--fg)" },
}, "Echo");
```

`cx` accepts strings, arrays, and `{ "token": boolean }` maps — Tailwind-friendly.

See [API: cx](/docs/packages/hyperdom/api/cx).

## `class` prop shapes

| Form | Example |
| --- | --- |
| String | `class: "btn btn--primary"` |
| Array | `class: ["btn", isOn && "btn--on"]` |
| Object map | `class: { "btn--on": $active.value() }` |
| Getter | `class: () => cx("btn", $variant.value())` |

Both `class` and `className` are supported.

## `style` prop

String or object; reactive getters allowed:

```ts
div({
  style: () => ({ opacity: $visible.value() ? 1 : 0 }),
});
```

## Prop modifiers

Vue-like modifiers control how values are applied:

| Syntax | Meaning | Example |
| --- | --- | --- |
| `.propName` | Set DOM **property** | `".innerHTML": html` |
| `^attrName` | Force **attribute** | `"^href": url` |

```ts
a({ "^href": () => $url.value() });
```

Use `.innerHTML` only for trusted content — see [Trusted HTML](/docs/packages/hyperdom/guides/trusted-html).

## `aria` and `data` helpers

```ts
import { aria, data } from "@echojs-ecosystem/hyperdom";

button({
  ...aria.label("Close"),
  ...aria.expanded($open.value()),
  ...data.testid("close-btn"),
}, "×");
```

## Related

- [Reactive Props](/docs/packages/hyperdom/guides/reactive-props)
- [API: cx](/docs/packages/hyperdom/api/cx)
