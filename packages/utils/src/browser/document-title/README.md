# document-title

Signal-native composable for document title in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { documentTitle } from "@echojs-ecosystem/utils/document-title";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`document-title.ts`](./document-title.ts).
