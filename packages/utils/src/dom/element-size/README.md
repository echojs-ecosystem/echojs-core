# element-size

Signal-native composable for element size in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { elementSize } from "@echojs-ecosystem/utils/element-size";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`element-size.ts`](./element-size.ts).
