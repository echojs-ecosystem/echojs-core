# scroll

Signal-native composable for scroll in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { scroll } from "@echojs-ecosystem/utils/scroll";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`scroll.ts`](./scroll.ts).
