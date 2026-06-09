# timeout

Signal-native composable for timeout in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { timeout } from "@echojs-ecosystem/utils/timeout";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`timeout.ts`](./timeout.ts).
