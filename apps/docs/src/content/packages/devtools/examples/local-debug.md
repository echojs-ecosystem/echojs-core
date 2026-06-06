---
title: Local Debug
description: Enable devtools and inspect nodes via the timeline.
package: "@echojs-ecosystem/devtools"
---

# Local Debug

Working pattern with the registry and timeline APIs shipped today.

```ts
import {
  registerDevtoolsNode,
  emitDevtoolsEvent,
  subscribeTimeline,
  setDevtoolsEnabled,
} from "@echojs-ecosystem/devtools";

setDevtoolsEnabled(import.meta.env.DEV);

const node = registerDevtoolsNode({
  type: "store",
  id: "auth",
  name: "authStore",
  getSnapshot: () => ({ token: authStore.value() }),
});

const unsub = subscribeTimeline((event) => {
  console.log("[devtools]", event.type, event.source, event.nodeId);
});

emitDevtoolsEvent({
  source: "store",
  type: "changed",
  nodeId: "auth",
  payload: { value: "token-123", prevValue: null },
});

// cleanup
unsub();
node.unregister();
```

## Planned workflow

When the overlay and `createDevtoolsProvider` ship:

```ts
// planned — not implemented
import { createDevtoolsProvider } from "@echojs-ecosystem/devtools";

createEchoApp({ strictContextChecks: true })
  .use(devtoolsProvider)
  .mount("#app");
```

## See also

- [Registry & Timeline](/docs/packages/devtools/guides/registry)
- [Playground](/docs/packages/devtools/playground)
