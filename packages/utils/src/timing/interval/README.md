# interval

Signal-native composable for interval in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { interval } from "@echojs-ecosystem/utils/interval";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`interval.ts`](./interval.ts).
