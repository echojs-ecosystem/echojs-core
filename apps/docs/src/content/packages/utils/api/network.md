---
title: network
description: Online status and Network Information API metrics.
package: '@echojs-ecosystem/utils'
keywords: [network, utils]
---

@echojs-ecosystem/utils/network

## Usage

```ts
import { network } from '@echojs-ecosystem/utils/network'

const net = network()
net.online()
net.effectiveType()
net.dispose()
```

## Type Declarations

```ts
export const network: () => {
  online: () => boolean
  effectiveType: () => string | undefined
  downlink: () => number | undefined
  rtt: () => number | undefined
  saveData: () => boolean | undefined
  $online: Signal<boolean>
  $effectiveType: Signal<string | undefined>
  $downlink: Signal<number | undefined>
  dispose: () => void
}
```

## API

### Returns

`network()` — see Type Declarations for the full signature.

| Member | Type | Description |
| --- | --- | --- |
| `online()` | `boolean` | `navigator.onLine` |
| `effectiveType()` | `string \| undefined` | e.g. `4g`, `3g` |
| `downlink()` | `number \| undefined` | Mbps estimate |
| `rtt()` | `number \| undefined` | Round-trip time ms |
| `saveData()` | `boolean \| undefined` | Data-saver mode |
| `dispose()` | `void` | Remove listeners |
