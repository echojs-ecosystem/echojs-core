# windowSize

Track `window.innerWidth` and `window.innerHeight` with signals.

> **Not a React hook** — call anywhere; call `dispose()` when done.

## Usage

```ts
import { windowSize } from "@echojs-ecosystem/utils/window-size";

const size = windowSize({
  initialWidth: 0,
  initialHeight: 0,
});

size.width();
size.height();
size.$width;
size.$height;

size.dispose();
```

## API

| Member | Type | Description |
| ------ | ---- | ----------- |
| `width()` | `() => number` | Current width |
| `height()` | `() => number` | Current height |
| `$width` | `Signal<number>` | Width signal |
| `$height` | `Signal<number>` | Height signal |
| `dispose()` | `() => void` | Remove resize listener |

### Options

| Option | Default | Description |
| ------ | ------- | ----------- |
| `initialWidth` | `0` | SSR / pre-hydration width |
| `initialHeight` | `0` | SSR / pre-hydration height |
| `window` | `defaultWindow` | Custom window (pass explicit `undefined` to skip client reads) |

## SSR

On the server no listener is attached. Use `initialWidth` / `initialHeight` for markup.

## Example

```ts
const size = windowSize();
effect(() => {
  console.log("viewport", size.width(), size.height());
});
```
