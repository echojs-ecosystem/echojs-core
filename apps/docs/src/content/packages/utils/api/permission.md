---
title: permission
description: Query Permissions API state for a feature.
package: '@echojs-ecosystem/utils'
keywords: [permission, utils]
---

@echojs-ecosystem/utils/permission

## Usage

```ts
import { permission } from '@echojs-ecosystem/utils/permission'

const cam = permission('camera')
cam.state()     // PermissionState | 'unsupported'
cam.supported()
cam.dispose()
```

## Type Declarations

```ts
export type PermissionQueryState = PermissionState | 'unsupported'

export const permission: (name: PermissionName) => {
  state: () => PermissionQueryState
  supported: () => boolean
  $state: Signal<PermissionQueryState>
  $supported: Signal<boolean>
  dispose: () => void
}
```

## API

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `PermissionName` | — | e.g. `geolocation`, `notifications` |

### Returns

| Member | Type | Description |
| --- | --- | --- |
| `state()` | `PermissionQueryState` | Current permission state |
| `supported()` | `boolean` | Whether query succeeded |
| `dispose()` | `void` | Remove `change` listener |
