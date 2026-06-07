---
title: render
description: render(view, container) — mount a view tree and return dispose.
package: '@echojs-ecosystem/hyperdom'
---

# render

```ts
function render(view: Child, container: Element): () => void
```

Mounts a view tree into `container` and returns a **dispose** function.

## Behavior

| Step     | Detail                                         |
| -------- | ---------------------------------------------- |
| Clear    | Sets `container.textContent = ""` before mount |
| Mount    | Creates DOM from `view` under a cleanup scope  |
| Activate | Reactive children and props start tracking     |

## Example

```ts
import { render } from '@echojs-ecosystem/hyperdom'

const dispose = render(appView, document.getElementById('app')!)

// on teardown:
dispose()
```

`dispose()` removes listeners, disposes effects, and tears down mounted DOM.

## See also

- [Guides: Rendering & Teardown](/docs/packages/hyperdom/guides/rendering-and-teardown)
- [mount](/docs/packages/hyperdom/api/mount) — convenience wrapper
