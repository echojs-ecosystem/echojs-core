// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'

import { getDefaultUrlStateAdapter } from './adapter'

describe('getDefaultUrlStateAdapter()', () => {
  it('returns browser adapter when window.location exists', () => {
    expect(getDefaultUrlStateAdapter().kind).toBe('browser')
  })

  it('returns memory adapter when location is unavailable', () => {
    const win = globalThis.window

    vi.stubGlobal('window', { ...win, location: undefined })

    expect(getDefaultUrlStateAdapter().kind).toBe('memory')

    vi.stubGlobal('window', win)
  })
})
