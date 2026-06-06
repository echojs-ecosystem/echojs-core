---
title: Trusted HTML
description: When and how to use innerHTML for sanitized HTML content.
package: "@echojs-ecosystem/hyperdom"
---

# Trusted HTML

HyperDOM builds UI from structured **`Child`** trees by default. For pre-rendered HTML strings (e.g. syntax-highlighted docs), use the **`.innerHTML`** property modifier.

## Setting innerHTML

```ts
div({ ".innerHTML": trustedHtml });
```

The `.` prefix sets a DOM **property** directly — required for `innerHTML` semantics.

## Only trusted content

Use this **only** for sanitized HTML you control:

- Shiki / markdown renderer output in the docs site
- Server-trusted CMS fragments with a sanitization pass

Never pass raw user input to `.innerHTML` — XSS risk.

## Prefer structured children

For application UI, build trees with DSL tags and reactive children:

```ts
// ✅ app UI
article(null, [
  h2(null, title),
  p(null, () => description()),
]);

// ⚠️ docs / rich content only
div({ ".innerHTML": highlightedCode });
```

The docs site uses trusted HTML for rendered markdown blocks. See [Examples: Doc Article](/docs/packages/hyperdom/examples/doc-article).

## Related

- [Styling & Classes](/docs/packages/hyperdom/guides/styling-and-classes) — prop modifiers
- [API: Types — Props](/docs/packages/hyperdom/api/types)
- [Reactive Props](/docs/packages/hyperdom/guides/reactive-props)
