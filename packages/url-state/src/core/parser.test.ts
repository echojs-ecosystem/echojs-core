import { describe, expect, it } from 'vitest'

import { parseAsInteger } from '../parsers/integer'
import { parseAsString } from '../parsers/string'

describe('parser builder', () => {
  it('withDefault: делает значение non-null и применяет default при отсутствии', () => {
    const p = parseAsInteger.withDefault(1)
    expect(p.parse(null)).toBeNull() // низкоуровневый parser не подставляет default сам
    expect(p.defaultValue).toBe(1)
  })

  it('withOptions: сохраняет options на parser', () => {
    const p = parseAsString.withOptions({
      history: 'push',
      clearOnDefault: false,
    })
    expect(p.options).toEqual({ history: 'push', clearOnDefault: false })
  })

  it('withDefault: можно переопределить default повторным вызовом', () => {
    const p = parseAsInteger.withDefault(1).withDefault(2)
    expect(p.defaultValue).toBe(2)
  })

  it('withOptions: мержит options при повторном вызове', () => {
    const p = parseAsString
      .withOptions({ history: 'push' })
      .withOptions({ clearOnDefault: false })

    expect(p.options).toEqual({ history: 'push', clearOnDefault: false })
  })
})
