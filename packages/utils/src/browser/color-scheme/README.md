# color-scheme

Signal-native composable for color scheme in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { colorScheme } from "@echojs-ecosystem/utils/color-scheme";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`color-scheme.ts`](./color-scheme.ts).
