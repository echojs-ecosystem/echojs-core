import { describe, expectTypeOf, it } from 'vitest'

import { mapSerial } from './map-serial'

describe('mapSerial types', () => {
  it('maps item type to result type', () => {
    expectTypeOf(mapSerial([1, 2], async (n) => String(n))).toEqualTypeOf<Promise<string[]>>()
  })

  it('passes index and optional signal to mapper', () => {
    mapSerial(['a'], async (item, index, signal) => {
      expectTypeOf(item).toEqualTypeOf<string>()
      expectTypeOf(index).toBeNumber()
      expectTypeOf(signal).toEqualTypeOf<AbortSignal | undefined>()
      return item.length
    })
  })
})
