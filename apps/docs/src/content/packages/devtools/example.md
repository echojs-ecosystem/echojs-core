---
title: Examples
description: Local debug with the DevTools registry and timeline.
package: '@echojs-ecosystem/devtools'
---

# Examples

Patterns for inspecting runtime state during development. Browser overlay UI is
**planned** — examples use the registry and timeline APIs available today.

## Pick an example

| Example                                                     | Teaches                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| [Local Debug](/docs/packages/devtools/examples/local-debug) | Enable devtools, register a node, subscribe to timeline |

## Planned examples

When the overlay ships, examples will cover:

- `createDevtoolsProvider` in `createEchoApp().use(devtoolsProvider)`
- Inspecting active queries, route chain, and signal dependencies

## Related

- [Registry & Timeline](/docs/packages/devtools/guides/registry)
- [Playground](/docs/packages/devtools/playground)
