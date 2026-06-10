import { describe, expectTypeOf, it } from 'vitest'

import type { MapParallelOptions } from './map-parallel-options'
import { mapParallel } from './map-parallel'

describe('mapParallel types', () => {
  it('maps item type to result type', () => {
    expectTypeOf(mapParallel([1, 2], async (n) => String(n))).toEqualTypeOf<Promise<string[]>>()
  })

  it('accepts MapParallelOptions with concurrency', () => {
    const options: MapParallelOptions = {
      signal: new AbortController().signal,
      concurrency: 2,
    }
    expectTypeOf(mapParallel([1], async (n) => n, options)).toEqualTypeOf<Promise<number[]>>()
  })
})
