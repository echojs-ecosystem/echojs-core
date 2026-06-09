---
title: geolocation
description: Watch or refresh geolocation coordinates.
package: '@echojs-ecosystem/utils'
keywords: [geolocation, utils]
---

@echojs-ecosystem/utils/geolocation

## Usage

```ts
import { geolocation } from '@echojs-ecosystem/utils/geolocation'

const geo = geolocation({ immediate: true })
geo.coords()
geo.loading()
geo.refresh()
geo.stop()
geo.dispose()
```

## Type Declarations

```ts
export interface GeolocationOptions extends PositionOptions {
  immediate?: boolean
}

export const geolocation: (options?: GeolocationOptions) => {
  coords: () => GeolocationCoordinates | null
  timestamp: () => number | null
  error: () => GeolocationPositionError | null
  loading: () => boolean
  $coords: Signal<GeolocationCoordinates | null>
  $error: Signal<GeolocationPositionError | null>
  $loading: Signal<boolean>
  start: () => void
  stop: () => void
  refresh: () => void
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `immediate` | `boolean` | `true` | Start `watchPosition` on create |
| `enableHighAccuracy` | `boolean` | — | Standard `PositionOptions` |
| `timeout` | `number` | — | Standard `PositionOptions` |
| `maximumAge` | `number` | — | Standard `PositionOptions` |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `coords()` | `GeolocationCoordinates \| null` | Latest coordinates |
| `error()` | `GeolocationPositionError \| null` | Last error |
| `loading()` | `boolean` | Watch / refresh in progress |
| `start()` / `stop()` | `void` | Control `watchPosition` |
| `refresh()` | `void` | One-shot `getCurrentPosition` |
| `dispose()` | `void` | Clear watch |
