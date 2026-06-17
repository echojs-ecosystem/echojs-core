import { describe, expect, it } from 'vitest'

import { parseOrderTagsInput } from './parse-order-tags-input'

describe('parseOrderTagsInput', () => {
  it('splits comma-separated tags and trims whitespace', () => {
    expect(parseOrderTagsInput(' priority, eu , trial ')).toEqual(['priority', 'eu', 'trial'])
  })

  it('filters empty segments', () => {
    expect(parseOrderTagsInput('priority,,eu,')).toEqual(['priority', 'eu'])
  })

  it('returns empty array for blank input', () => {
    expect(parseOrderTagsInput('   ')).toEqual([])
  })
})
