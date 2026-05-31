import { describe, expect, it } from 'vitest'

import { createCustomParser } from './custom-parser'
import { createCustomMultiParser, isMultiParser } from './custom-multi-parser'
import { parseAsArrayOf } from '../parsers/array'
import { parseAsInteger } from '../parsers/integer'
import { parseAsNativeArrayOf } from '../parsers/native-array'
import { parseAsString } from '../parsers/string'

describe('isMultiParser', () => {
  it('detects multi parsers', () => {
    expect(isMultiParser(parseAsNativeArrayOf(parseAsString))).toBe(true)
    expect(isMultiParser(parseAsArrayOf(parseAsInteger))).toBe(true)
    expect(
      isMultiParser(
        createCustomMultiParser({ parse: () => [], serialize: () => [] })
      )
    ).toBe(true)
  })

  it('returns false for single parsers', () => {
    expect(isMultiParser(parseAsString)).toBe(false)
    expect(isMultiParser(parseAsInteger.withDefault(1))).toBe(false)
    expect(
      isMultiParser(
        createCustomParser({
          parse: () => null,
          serialize: () => null,
        })
      )
    ).toBe(false)
  })
})
