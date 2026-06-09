# media-query

Signal-native composable for media query in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { mediaQuery } from "@echojs-ecosystem/utils/media-query";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`media-query.ts`](./media-query.ts).
