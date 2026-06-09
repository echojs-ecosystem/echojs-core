# online

Signal-native composable for online in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { online } from "@echojs-ecosystem/utils/online";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`online.ts`](./online.ts).
