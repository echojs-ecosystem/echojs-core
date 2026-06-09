# event-listener

Signal-native composable for event listener in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { eventListener } from "@echojs-ecosystem/utils/event-listener";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`event-listener.ts`](./event-listener.ts).
