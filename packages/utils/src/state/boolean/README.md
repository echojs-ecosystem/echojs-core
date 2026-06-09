# boolean

Signal-native composable for boolean in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { boolean } from "@echojs-ecosystem/utils/boolean";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`boolean.ts`](./boolean.ts).
