# breakpoints

Signal-native composable for breakpoints in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { breakpoints } from "@echojs-ecosystem/utils/breakpoints";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`breakpoints.ts`](./breakpoints.ts).
