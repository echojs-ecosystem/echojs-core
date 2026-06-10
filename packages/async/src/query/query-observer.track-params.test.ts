import { describe, expect, it, vi } from 'vitest'

import { signal } from '@echojs-ecosystem/reactivity'

import { createTestClient } from '../test-utils'
import { createQuery } from './create-query'
import { trackReactiveParams } from './query-observer'

describe('trackReactiveParams', () => {
  it('calls onChange immediately for static params', () => {
    const onChange = vi.fn()
    const dispose = trackReactiveParams({ id: '1' }, onChange)
    expect(onChange).toHaveBeenCalledWith({ id: '1' })
    dispose()
  })

  it('tracks reactive function params', async () => {
    const client = createTestClient()
    const $id = signal('a')
    const onChange = vi.fn()
    const dispose = trackReactiveParams(() => ({ id: $id.value() }), onChange)
    expect(onChange).toHaveBeenCalledWith({ id: 'a' })
    $id.set('b')
    await Promise.resolve()
    expect(onChange).toHaveBeenLastCalledWith({ id: 'b' })
    dispose()
    void client
  })
})
