---
title: Clipboard
description: Copy text with clipboard.
package: '@echojs-ecosystem/utils'
---

# Clipboard

```ts
import { clipboard } from '@echojs-ecosystem/utils/clipboard'

const clipboard = clipboard()

await clipboard.copy('Hello EchoJS')

clipboard.copied() // true briefly after success
clipboard.text()   // last copied string
clipboard.error()  // null or thrown error

clipboard.dispose()
```

Requires a secure context and `navigator.clipboard` in the browser.
