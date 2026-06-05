---
title: Example
description: render, createView, createModel, and Show/List from EchoJS apps.
package: "@echojs/hyperdom"
---

# Example — HyperDOM

## Minimal mount

```ts
import { render, div, button } from "@echojs/hyperdom";
import { signal } from "@echojs/reactivity";

const n = signal(0);

const view = () =>
  div(null, [
    button({ onClick: () => n.update((x) => x + 1) }, () => `Count: ${n.value()}`),
  ]);

const dispose = render(view, document.getElementById("app")!);
// dispose() on teardown
```

## Model + view (example app)

```ts
import { createComponent } from "@echojs/hyperdom";
import { createCounterModel, CounterView } from "@features/reactivity-counter/index.js";

export const Counter = createComponent(createCounterModel, CounterView, { name: "Counter" });
// page: view: () => Counter()
```

```ts
import { createView, Show, List } from "@echojs/hyperdom";

export const CounterView = createView((vm) =>
  article(null, [
    List(vm.$items, (item) => span(null, item)),
    Show(() => vm.$count.value() > 0, () => p(null, "Positive")),
  ]),
  "CounterView",
);
```

## Docs site — doc article

```ts
import { createComponent } from "@echojs/hyperdom";
import { createDocArticleModel, DocArticleView } from "@pages/doc/index.js";

export const DocArticle = (props: { contentId: string }) =>
  createComponent(createDocArticleModel(props), DocArticleView, { name: "DocArticle" })();
```

`createView` / `createModel` names enable **strict context checks** in dev.

## Live app

| Resource | Path |
| --- | --- |
| Counter + List + Show | `apps/example/src/features/reactivity-counter/` |
| Docs pages | `apps/docs/src/pages/doc/` |

## See also

- Usage — `/docs/packages/hyperdom/usage`
- Framework Example — `/docs/packages/framework/example`
