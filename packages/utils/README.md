# @echojs-ecosystem/utils

Коллекция **signal-native** утилит и composables для EchoJS.

Вдохновлено [ReactUse](https://reactuse.org/new/docs/introduction) и VueUse, но реализовано на [`@echojs-ecosystem/reactivity`](https://github.com/echojs-ecosystem/echojs-core/tree/main/packages/reactivity) — без React, Vue, Solid, hooks и Virtual DOM.

## Философия

- Небольшие composables с явным `dispose()`
- SSR-safe по умолчанию
- Без привязки к UI-фреймворку
- Tree-shakeable subpath imports
- TypeScript-first

> **Важно:** утилиты — обычные функции (`windowSize`, `debounce`), **не React hooks**. Их можно вызывать вне компонентов, в любом месте приложения.

## Установка

```bash
bun add @echojs-ecosystem/utils
```

## Импорт

Полный импорт:

```ts
import { windowSize, clipboard } from "@echojs-ecosystem/utils";
```

Оптимизированный subpath import:

```ts
import { windowSize } from "@echojs-ecosystem/utils/window-size";
import { clipboard } from "@echojs-ecosystem/utils/clipboard";
import { isString, isEmpty, isEmptyArray } from "@echojs-ecosystem/utils/is";
```

## Type guards (`is`)

```ts
import { isNullable, isPlainObject, isEmptyArray } from "@echojs-ecosystem/utils/is";

if (isNullable(user)) return;
if (isEmptyArray(items)) return;
```

## SSR-safe

Browser-утилиты проверяют окружение и не создают listeners на сервере:

```ts
const size = windowSize({ initialWidth: 0, initialHeight: 0 });
```

## Explicit dispose

```ts
const size = windowSize();

// когда composable больше не нужен:
size.dispose();
```

## Примеры

### windowSize

```ts
import { windowSize } from "@echojs-ecosystem/utils/window-size";

const size = windowSize();
console.log(size.width(), size.height());
size.dispose();
```

### clipboard

```ts
import { clipboard } from "@echojs-ecosystem/utils/clipboard";

const clip = clipboard();
await clip.copy("Hello EchoJS");
console.log(clip.copied());
```

### mediaQuery

```ts
import { mediaQuery } from "@echojs-ecosystem/utils/media-query";

const isDark = mediaQuery("(prefers-color-scheme: dark)");
if (isDark.matches()) {
  /* ... */
}
```

### debounce

```ts
import { signal } from "@echojs-ecosystem/reactivity";
import { debounce } from "@echojs-ecosystem/utils/debounce";

const query = signal("");
const debounced = debounce(query, 300);
```

### clickOutside

```ts
import { signal } from "@echojs-ecosystem/reactivity";
import { clickOutside } from "@echojs-ecosystem/utils/click-outside";

const panel = signal<HTMLElement | null>(null);
clickOutside(panel, () => close());
```

## Utilities

### Sensors

| Utility | Import |
|---------|--------|
| `windowSize` | `@echojs-ecosystem/utils/window-size` |
| `mediaQuery` | `@echojs-ecosystem/utils/media-query` |
| `breakpoints` | `@echojs-ecosystem/utils/breakpoints` |
| `mouse` | `@echojs-ecosystem/utils/mouse` |
| `scroll` | `@echojs-ecosystem/utils/scroll` |
| `network` | `@echojs-ecosystem/utils/network` |
| `online` | `@echojs-ecosystem/utils/online` |
| `idle` | `@echojs-ecosystem/utils/idle` |
| `geolocation` | `@echojs-ecosystem/utils/geolocation` |
| `hotkeys` | `@echojs-ecosystem/utils/hotkeys` |
| `keyPress` | `@echojs-ecosystem/utils/key-press` |
| `pageLeave` | `@echojs-ecosystem/utils/page-leave` |

### Browser

| Utility | Import |
|---------|--------|
| `clipboard` | `@echojs-ecosystem/utils/clipboard` |
| `documentTitle` | `@echojs-ecosystem/utils/document-title` |
| `favicon` | `@echojs-ecosystem/utils/favicon` |
| `colorScheme` | `@echojs-ecosystem/utils/color-scheme` |
| `eventListener` | `@echojs-ecosystem/utils/event-listener` |
| `documentVisibility` | `@echojs-ecosystem/utils/document-visibility` |
| `devicePixelRatio` | `@echojs-ecosystem/utils/device-pixel-ratio` |
| `fullscreen` | `@echojs-ecosystem/utils/fullscreen` |
| `activeElement` | `@echojs-ecosystem/utils/active-element` |
| `permission` | `@echojs-ecosystem/utils/permission` |
| `cssVar` | `@echojs-ecosystem/utils/css-var` |

### Timing

| Utility | Import |
|---------|--------|
| `timeout` | `@echojs-ecosystem/utils/timeout` |
| `interval` | `@echojs-ecosystem/utils/interval` |
| `debounce` / `debounceFn` | `@echojs-ecosystem/utils/debounce` |
| `throttle` / `throttleFn` | `@echojs-ecosystem/utils/throttle` |

### State

| Utility | Import |
|---------|--------|
| `toggle` | `@echojs-ecosystem/utils/toggle` |
| `counter` | `@echojs-ecosystem/utils/counter` |
| `boolean` | `@echojs-ecosystem/utils/boolean` |
| `previous` | `@echojs-ecosystem/utils/previous` |
| `localStorage` | `@echojs-ecosystem/utils/local-storage` |
| `hash` | `@echojs-ecosystem/utils/hash` |

### DOM

| Utility | Import |
|---------|--------|
| `elementSize` | `@echojs-ecosystem/utils/element-size` |
| `resizeObserver` | `@echojs-ecosystem/utils/resize-observer` |
| `intersectionObserver` | `@echojs-ecosystem/utils/intersection-observer` |
| `clickOutside` | `@echojs-ecosystem/utils/click-outside` |
| `hover` | `@echojs-ecosystem/utils/hover` |
| `focus` | `@echojs-ecosystem/utils/focus` |

## Roadmap

Планируются: `battery`, `broadcastChannel`, `dropZone`, `draggable`, `eventSource`, `fileDialog`, `infiniteScroll`, `lockScroll`, `measure`, `objectUrl`, `sessionStorage`, `virtualList`, `webSocket`.

## License

MIT
