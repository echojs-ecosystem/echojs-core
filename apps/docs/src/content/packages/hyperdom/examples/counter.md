---
title: Counter
description: Minimal render() mount with signal-driven button label.
package: "@echojs-ecosystem/hyperdom"
---

# Counter

The smallest useful HyperDOM app: one signal, one button, reactive text — no model/view split.

## Problem

Mount a view into the DOM and update only the count label when a signal changes.

## Code

```ts
import { render, div, button } from "@echojs-ecosystem/hyperdom";
import { signal } from "@echojs-ecosystem/reactivity";

const n = signal(0);

const view = () =>
  div(null, [
    button({ onClick: () => n.update((x) => x + 1) }, () => `Count: ${n.value()}`),
  ]);

const dispose = render(view, document.getElementById("app")!);
// dispose() on teardown
```

## Takeaways

- `() => \`Count: ${n.value()}\`` is a reactive child — only the text node updates
- `render()` returns `dispose` — call it when removing the view
- For larger apps, split into model + view — see [Model + View Counter](/docs/packages/hyperdom/examples/model-view-counter)

## Related

- [Guides: Reactive Children](/docs/packages/hyperdom/guides/reactive-children)
- [API: render](/docs/packages/hyperdom/api/render)
- [Reactivity: Counter](/docs/packages/reactivity/examples/counter)
