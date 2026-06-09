---
title: defineConfig
description: defineConfig and abstraction tree structure.
package: '@echojs-ecosystem/architect'
keywords: [defineConfig, architect]
---

@echojs-ecosystem/architect

## Usage

```ts
import { defineConfig, abstraction } from '@echojs-ecosystem/architect'

export default defineConfig({
  baseUrl: 'src',
  ignores: ['**/*.md', '**/*.css', '**/*.json'],
  root: abstraction({
    name: 'src',
    children: {
      /* layer abstractions */
    },
    rules: [
      /* presets */
    ],
  }),
})
```

## Type Declarations

```ts
import { defineConfig, abstraction } from '@echojs-ecosystem/architect'

export default defineConfig({
  baseUrl: 'src',
  ignores: ['**/*.md', '**/*.css', '**/*.json'],
  root: abstraction({
    name: 'src',
    children: {
      /* layer abstractions */
    },
    rules: [
      /* presets */
    ],
  }),
})
```

## API

### Returns

`defineConfig` — see Type Declarations for the full signature.
