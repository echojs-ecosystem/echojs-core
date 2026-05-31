import { describe, expectTypeOf, it } from 'vitest'

import { parseAsInteger } from '../parsers/integer'
import { parseAsString } from '../parsers/string'

describe('parser builder types', () => {
  it('withDefault adds defaultValue to parser type', () => {
    const p = parseAsInteger.withDefault(1)

    expectTypeOf(p.defaultValue).toEqualTypeOf<number>()
    expectTypeOf(p.withDefault).toBeFunction()
  })

  it('withOptions preserves parser value type', () => {
    const p = parseAsString.withOptions({ history: 'push' })

    expectTypeOf(p.parse('x')).toEqualTypeOf<string | null>()
    expectTypeOf(p.options?.history).toEqualTypeOf<
      'replace' | 'push' | undefined
    >()
  })
})
