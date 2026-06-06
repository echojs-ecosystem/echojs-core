---
title: Doc Article
description: Props-bound createComponent pattern used by the docs site.
package: "@echojs-ecosystem/hyperdom"
---

# Doc Article

How the EchoJS docs site mounts a markdown article page with a props-bound model factory.

## Problem

Route passes `contentId` as props; the component needs a fresh model per article without a global singleton.

## Code

```ts
import { createComponent } from "@echojs-ecosystem/hyperdom";
import { createDocArticleModel, DocArticleView } from "@pages/doc/index.js";

export const DocArticle = (props: { contentId: string }) =>
  createComponent(createDocArticleModel(props), DocArticleView, {
    name: "DocArticle",
  })();
```

`createDocArticleModel(props)` returns `() => VM` — the bound factory `createComponent` expects.

## Trusted HTML in views

Doc content may use `.innerHTML` for syntax-highlighted blocks — only for sanitized output:

```ts
div({ ".innerHTML": vm.highlightedHtml });
```

See [Guides: Trusted HTML](/docs/packages/hyperdom/guides/trusted-html).

## Takeaways

- Props → bound model factory → `createComponent` → immediate `()`
- `name` option sets `displayName` for devtools
- Async loading lives in the model + query layer, not the view file

## Live source

`apps/docs/src/pages/doc/`

## Related

- [Guides: Models & Components](/docs/packages/hyperdom/guides/models-and-components)
- [API: createComponent](/docs/packages/hyperdom/api/create-component)
- [Query: Doc Content](/docs/packages/query/examples/doc-content)
