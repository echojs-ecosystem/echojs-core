# previous

Signal-native composable for previous in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { previous } from "@echojs-ecosystem/utils/previous";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`previous.ts`](./previous.ts).
