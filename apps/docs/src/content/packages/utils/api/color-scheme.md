---
title: colorScheme
description: Light / dark / auto theme with `data-color-scheme` on `<html>`.
package: '@echojs-ecosystem/utils'
keywords: [colorScheme, utils]
---

@echojs-ecosystem/utils/color-scheme

## Usage

```ts
import { colorScheme } from '@echojs-ecosystem/utils/color-scheme'

const scheme = colorScheme('auto')
scheme.set('dark')
scheme.toggle()
scheme.value()      // resolved 'light' | 'dark'
scheme.preference() // 'light' | 'dark' | 'auto'
scheme.dispose()
```

## Type Declarations

```ts
export type ColorSchemePreference = 'light' | 'dark' | 'auto'

export const colorScheme: (initial?: ColorSchemePreference) => {
  value: () => 'light' | 'dark'
  preference: () => ColorSchemePreference
  set: (next: ColorSchemePreference) => void
  toggle: () => void
  $value: ComputedSignal<'light' | 'dark'>
  $preference: Signal<ColorSchemePreference>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `initial` | `ColorSchemePreference` | `auto` | User preference |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `value()` | `light \| dark` | Resolved scheme |
| `preference()` | `ColorSchemePreference` | Stored preference |
| `set` / `toggle` | `void` | Change preference |
| `dispose()` | `void` | Remove `prefers-color-scheme` listener |
