# favicon

Signal-native composable for favicon in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { favicon } from "@echojs-ecosystem/utils/favicon";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`favicon.ts`](./favicon.ts).
