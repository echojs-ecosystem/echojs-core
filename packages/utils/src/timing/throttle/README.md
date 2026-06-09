# throttle

Signal-native composable for throttle in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { throttle } from "@echojs-ecosystem/utils/throttle";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`throttle.ts`](./throttle.ts).
