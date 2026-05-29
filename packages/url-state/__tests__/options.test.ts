import { describe, expect, it } from 'vitest'

import { resolveSetOptions } from '../src/core/options'

describe('resolveSetOptions', () => {
  it('merges create, parser and set options', () => {
    const resolved = resolveSetOptions({
      createOptions: { history: 'replace', shallow: true },
      parserOptions: { clearOnDefault: false },
      setOptions: { history: 'push', scroll: true },
    })
    expect(resolved.history).toBe('push')
    expect(resolved.shallow).toBe(true)
    expect(resolved.clearOnDefault).toBe(false)
    expect(resolved.scroll).toBe(true)
  })

  it('defaultVisibility "show" forces clearOnDefault false', () => {
    const resolved = resolveSetOptions({
      createOptions: { defaultVisibility: 'show', clearOnDefault: true },
    })
    expect(resolved.clearOnDefault).toBe(false)
  })

  it('defaultVisibility "hide" forces clearOnDefault true', () => {
    const resolved = resolveSetOptions({
      createOptions: { defaultVisibility: 'hide', clearOnDefault: false },
    })
    expect(resolved.clearOnDefault).toBe(true)
  })
})
