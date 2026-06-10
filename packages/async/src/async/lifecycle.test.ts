import { describe, expect, it, vi } from 'vitest'

import { runLifecycle } from './lifecycle'

describe('runLifecycle', () => {
  const ctx = { params: {}, queryKey: ['x'], queryClient: {} as never }

  it('calls onStart for start phase', async () => {
    const onStart = vi.fn()
    await runLifecycle({ onStart }, 'start', ctx)
    expect(onStart).toHaveBeenCalledWith(ctx)
  })

  it('calls onSuccess for success phase', async () => {
    const onSuccess = vi.fn()
    await runLifecycle({ onSuccess }, 'success', { ...ctx, data: 1 })
    expect(onSuccess).toHaveBeenCalled()
  })

  it('calls onError for error phase', async () => {
    const onError = vi.fn()
    const err = new Error('x')
    await runLifecycle({ onError }, 'error', { ...ctx, error: err })
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ error: err }))
  })

  it('calls onSettled for settled phase', async () => {
    const onSettled = vi.fn()
    await runLifecycle({ onSettled }, 'settled', ctx)
    expect(onSettled).toHaveBeenCalledWith(ctx)
  })
})
