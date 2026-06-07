---
title: Layer Rules
description: dependenciesDirection order and allowDownward exceptions.
package: '@echojs-ecosystem/architect'
---

# Layer Rules

Upper layers may import lower layers — importing upward is an error.

## Layer order

```ts
dependenciesDirection([
  'app',
  'pages',
  'entities',
  'widgets',
  'features',
  'shared',
])
```

Left = higher layer. `pages` may import `entities`; `entities` may not import
`pages`.

## Downward exceptions (`allowDownward`)

Some app-shell modules are intentionally shared downward — e.g. route tables in
`app/router`. App-wide providers live in `core/providers`:

```ts
dependenciesDirection(
  ['app', 'pages', 'entities', 'widgets', 'features', 'core'],
  {
    allowDownward: ['**/app/router/**'],
  }
)
```

Glob patterns match dependency **file paths**. Matching imports skip the
layer-order check but still respect `publicAbstraction` when enabled.

Common docs-site patterns:

```ts
{
  allowDownward: ['**/app/router/**', '**/core/providers/**']
}
```

## Typical violation

`Forbidden dependency "widgets" <= "entities"` — an entity imported a widget.
Move shared code up or down the layer stack.

## See also

- [dependenciesDirection API](/docs/packages/architect/api/presets)
- [Docs Site Config](/docs/packages/architect/examples/docs-site-config)
