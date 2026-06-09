# network

Signal-native composable for network in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { network } from "@echojs-ecosystem/utils/network";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`network.ts`](./network.ts).
