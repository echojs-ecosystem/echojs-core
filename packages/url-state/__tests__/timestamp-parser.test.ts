import { describe, expect, it } from 'vitest'

import { parseAsTimestamp } from '@echojs/url-state'

describe('parseAsTimestamp', () => {
  it('parse: valid -> number', () => {
    expect(parseAsTimestamp.parse('1710000000000')).toBe(1710000000000)
  })

  it('parse: invalid -> null', () => {
    expect(parseAsTimestamp.parse('abc')).toBeNull()
  })

  it('serialize', () => {
    expect(parseAsTimestamp.serialize(123)).toBe('123')
  })
})
