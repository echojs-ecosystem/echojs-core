# resize-observer

Signal-native composable for resize observer in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { resizeObserver } from "@echojs-ecosystem/utils/resize-observer";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`resize-observer.ts`](./resize-observer.ts).
