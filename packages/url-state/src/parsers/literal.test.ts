import { describe, expect, it } from 'vitest'

import { parseAsLiteral } from './literal'

describe('parseAsLiteral', () => {
  it('parse: valid value -> literal', () => {
    const view = parseAsLiteral(['grid', 'list'] as const)
    expect(view.parse('grid')).toBe('grid')
  })

  it('parse: invalid -> null', () => {
    const view = parseAsLiteral(['grid', 'list'] as const)
    expect(view.parse('unknown')).toBeNull()
  })

  it('serialize: literal -> string', () => {
    const view = parseAsLiteral(['grid', 'list'] as const)
    expect(view.serialize('grid')).toBe('grid')
  })
})
