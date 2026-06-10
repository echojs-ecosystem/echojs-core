import { describe, expect, it } from 'vitest'

import { sleep } from '../utils/sleep'
import { any } from './any'

describe('any', () => {
  it('returns the first fulfilled value', async () => {
    await expect(
      any([Promise.reject(new Error('a')), Promise.resolve('winner'), sleep(20)]),
    ).resolves.toBe('winner')
  })
})
