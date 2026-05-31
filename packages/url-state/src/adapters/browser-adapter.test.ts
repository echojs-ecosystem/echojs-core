// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'

import { createBrowserUrlStateAdapter } from './browser-adapter'

describe('browser adapter', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/products?x=1#top')
  })

  it('getSearch reads window.location.search', () => {
    const adapter = createBrowserUrlStateAdapter()
    expect(adapter.getSearch()).toBe('?x=1')
  })

  it('setSearch preserves pathname + hash', () => {
    const adapter = createBrowserUrlStateAdapter()
    adapter.setSearch('?page=2')
    expect(window.location.pathname).toBe('/products')
    expect(window.location.search).toBe('?page=2')
    expect(window.location.hash).toBe('#top')
  })

  it('setSearch supports push/replace', () => {
    const adapter = createBrowserUrlStateAdapter()
    const start = window.history.length
    adapter.setSearch('?a=1', { history: 'push' })
    expect(window.history.length).toBe(start + 1)
    adapter.setSearch('?a=2', { history: 'replace' })
    expect(window.location.search).toBe('?a=2')
  })
})
