# intersection-observer

Signal-native composable for intersection observer in EchoJS applications.

> **Note:** This is not a React hook. Call it anywhere, and call `dispose()` when done.

## Usage

```ts
import { intersectionObserver } from "@echojs-ecosystem/utils/intersection-observer";
```

## SSR

Safe on the server — returns defaults and skips browser listeners until `isClient`.

## API

See implementation in [`intersection-observer.ts`](./intersection-observer.ts).
