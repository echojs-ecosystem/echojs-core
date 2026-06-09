---
title: cssVar
description: Read and write CSS custom properties.
package: '@echojs-ecosystem/utils'
keywords: [cssVar, utils]
---

@echojs-ecosystem/utils/css-var

## Usage

```ts
import { cssVar } from '@echojs-ecosystem/utils/css-var'

const theme = cssVar('accent', document.documentElement, '#000')
theme.set('#3b82f6')
theme.refresh()
theme.dispose()
```

## Type Declarations

```ts
export type CssVarTarget = HTMLElement | null | undefined

export const cssVar: (
  name: string,
  target?: MaybeSignalOrGetter<CssVarTarget>,
  initial?: string,
) => {
  value: () => string
  set: (next: string) => void
  refresh: () => void
  $value: Signal<string>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Variable name (with or without `--`) |
| `target` | `MaybeSignalOrGetter<HTMLElement>` | `:root` | Element scope |
| `initial` | `string` | `""` | Fallback before read |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `string` | Computed value |
| `set(next)` | `void` | Set via `style.setProperty` |
| `refresh()` | `void` | Re-read from computed style |
| `dispose()` | `void` | Teardown reactive target effect |
