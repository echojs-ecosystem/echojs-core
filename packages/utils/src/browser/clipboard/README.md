# clipboard

Copy text via the Clipboard API with reactive status signals.

## Usage

```ts
import { clipboard } from "@echojs-ecosystem/utils/clipboard";

const clipboard = clipboard();

await clipboard.copy("Hello EchoJS");

clipboard.text();
clipboard.copied();
clipboard.error();

clipboard.dispose();
```

## API

| Member | Description |
| ------ | ----------- |
| `copy(text)` | `async` — writes to clipboard; sets `$text`, `$copied`, `$error` |
| `text()` | Last successfully copied string |
| `copied()` | `true` for ~2s after success |
| `error()` | Last error or `null` |
| `$text`, `$copied`, `$error` | Signals |
| `dispose()` | Clears pending reset timer |

## SSR

`copy()` throws when `navigator.clipboard` is unavailable (typical on server).

## Example

```ts
const clipboard = clipboard();

button.onClick(async () => {
  try {
    await clipboard.copy(shareUrl);
  } catch {
    // clipboard.error() is set
  }
});
```
