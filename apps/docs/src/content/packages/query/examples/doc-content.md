---
title: Docs Markdown Loader
description: docContentQuery with long staleTime and SEO effect in DocArticle model.
package: "@echojs-ecosystem/query"
---

# Docs Markdown Loader

The docs site loads markdown content per route using a query with a long `staleTime` — content rarely changes during a session.

## Problem

Fetch and parse markdown when `contentId` changes, update document SEO from frontmatter, and cache aggressively.

## Definition and model

```ts
// apps/docs — pages/doc/model/doc-article.model.ts
import { createQuery } from "@echojs-ecosystem/query";
import { effect } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";

const docContentQuery = createQuery({
  name: "doc-content",
  queryKey: ({ contentId }) => ["doc-content", contentId] as const,
  queryFn: async ({ params }) => {
    const raw = await loadContentRaw(params.contentId);
    return parseMarkdown(raw);
  },
  staleTime: 3_600_000, // 1 hour
});

export const createDocArticleModel = (props: DocArticleProps) =>
  createModel((): DocArticleVM => {
    const query = docContentQuery.with(() => ({ contentId: props.contentId }));

    effect(() => {
      const doc = query.data();
      if (!doc) return;
      applySeo({ title: doc.frontmatter.title, /* ... */ });
    });

    return { props, query };
  }, "DocArticleModel");
```

## Key points

- **`staleTime: 3_600_000`** — avoid re-fetching on every navigation within the hour
- **`effect()`** for SEO side work — not DOM rendering
- **`bindModelViewWith(props, ...)`** when props change per navigation

## Live reference

| Resource | Path |
| --- | --- |
| Doc article model | `apps/docs/src/pages/doc/model/doc-article.model.ts` |

## See also

- [Guides: Reactive Binding](/docs/packages/query/guides/reactive-binding)
- [Examples: View Status Helpers](/docs/packages/query/examples/status-helpers)
