---
title: Debounce
description: Debounce signals and functions with debounce.
package: '@echojs-ecosystem/utils'
---

# Debounce

## Signal

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { debounce } from '@echojs-ecosystem/utils/debounce'

const query = signal('')
const debounced = debounce(query, 300)

debounced.value() // updates 300ms after query stops changing
debounced.dispose()
```

## Function

```ts
import { debounceFn } from '@echojs-ecosystem/utils/debounce'

const search = debounceFn((q: string) => fetchResults(q), 300)

search('a')
search('ab') // only one call after 300ms quiet

search.cancel() // drop pending
search.flush()  // run pending immediately
```

## Throttle (rate limit)

```ts
import { signal } from '@echojs-ecosystem/reactivity'
import { throttle } from '@echojs-ecosystem/utils/throttle'

const $scrollY = signal(0)
const throttled = throttle($scrollY, 100)
```

Use debounce when the user **pauses**; throttle when activity is **continuous**
(scroll, drag).
