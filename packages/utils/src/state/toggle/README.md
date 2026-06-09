# toggle

Signal-native composable for toggle in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { toggle } from "@echojs-ecosystem/utils/toggle";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`toggle.ts`](./toggle.ts).
