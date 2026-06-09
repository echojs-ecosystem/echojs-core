# debounce

Signal-native composable for debounce in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { debounce } from "@echojs-ecosystem/utils/debounce";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`debounce.ts`](./debounce.ts).
