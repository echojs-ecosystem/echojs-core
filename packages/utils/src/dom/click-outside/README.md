# click-outside

Signal-native composable for click outside in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { clickOutside } from "@echojs-ecosystem/utils/click-outside";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`click-outside.ts`](./click-outside.ts).
