import { describe, expect, it } from 'vitest'

import {
  createCustomMultiParser,
  createCustomParser,
  isMultiParser,
  parseAsArrayOf,
  parseAsInteger,
  parseAsNativeArrayOf,
  parseAsString,
} from '@echojs/url-state'

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
