# counter

Signal-native composable for counter in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { counter } from "@echojs-ecosystem/utils/counter";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`counter.ts`](./counter.ts).
