import { describe, expect, it } from 'vitest'

import { allSettled } from './all-settled'

describe('allSettled', () => {
  it('collects fulfilled and rejected outcomes', async () => {
    const results = await allSettled([
      Promise.resolve('ok'),
      Promise.reject(new Error('nope')),
    ])
    expect(results[0]).toEqual({ status: 'fulfilled', value: 'ok' })
    expect(results[1]?.status).toBe('rejected')
  })
})
