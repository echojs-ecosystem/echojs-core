# mouse

Signal-native composable for mouse in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { mouse } from "@echojs-ecosystem/utils/mouse";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`mouse.ts`](./mouse.ts).
