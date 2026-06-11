---
title: Models
description:
  What belongs in a model, VM design, lifetime with route params, effects, and
  module-scoped queries.
keywords: [createModel, VM, effects, query, lifetime, signals]
---

# Models

Decision rules for `createModel` and VM surfaces. Architecture context:
[Models](/docs/architecture/models).

## What belongs in a model

```ts
export type SearchVM = {
  query: () => string
  results: () => SearchHit[]
  isPending: () => boolean
  setQuery: (q: string) => void
  submit: () => void
}

export const createSearchModel = createModel((): SearchVM => {
  const $query = signal('')
  const search = searchQuery.with(() => ({ q: $query.value() }))

  return {
    query: () => $query.value(),
    results: () => search.data() ?? [],
    isPending: () => search.isPending(),
    setQuery: (q) => $query.set(q),
    submit: () => search.refetch(),
  }
}, 'SearchModel')
```

| In the model                          | In the view                         |
| ------------------------------------- | ----------------------------------- |
| `signal`, `computed`, `effect`        | `div`, `button`, `Show`, `List`     |
| `createQuery.with`, `createMutation`  | `class:` from `*.styles.ts`         |
| `createForm` field state              | `onClick: vm.submit`                |
| Subscriptions, clipboard, timers      | Layout of icons and text            |

## VM surface design

**Prefer narrow accessors over exposing every signal:**

```ts
// Good — view asks questions
isCodeTabActive: (index: number) => $tab.value() === index
activeCodeTab: () => tabs[$tab.value()]

// OK for small widgets — direct signal on VM
$count: Signal<number>
```

Name actions by **intent** (`submit`, `copy`, `openMenu`), not DOM events
(`handleClick`).

## Model lifetime and route params

`createComponent(model, view)()` runs the model factory **once per invocation**.

When props come from the route (`contentId`, `userId`), create a **new** model per
navigation:

```ts
// Page
view: ({ params }) =>
  createComponent(
    () => createDocArticleModel({ contentId: params.id }),
    DocArticleView
  )()

// Or legacy glue
bindModelViewWith({ contentId: params.id }, createDocArticleModel, DocArticleView)
```

Reusing one model instance across different `contentId` values causes stale
content — always tie factory scope to route params.

## Effects

Run side effects in the model, not the view:

```ts
effect(() => {
  const doc = query.data()
  if (!doc) return
  applySeo({ title: doc.frontmatter.title, path: currentPath() })
})
```

`createModel` runs inside a cleanup scope; effects dispose when the route
unmounts.

## Module-scoped queries

Define queries **once** at module scope; bind params in the model:

```ts
export const docContentQuery = createQuery({
  name: 'doc-content',
  queryKey: ({ contentId }) => ['doc-content', contentId] as const,
  queryFn: ({ params }) => loadDoc(params.contentId),
})

// inside createDocArticleModel:
const query = docContentQuery.with(() => ({ contentId: props.contentId }))
```

See [Data fetching](/docs/guides/data-fetching) for mutations and prefetch.

## Related

- [Reactivity](/docs/guides/reactivity) — signals in models
- [Views](/docs/best-practices/views) — `createView` and composition
- [Routing](/docs/best-practices/routing) — model lifetime on navigation
- [Overview](/docs/best-practices/overview)
