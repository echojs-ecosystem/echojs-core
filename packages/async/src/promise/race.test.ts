import { describe, expect, it } from 'vitest'

import { sleep } from '../utils/sleep'
import { race } from './race'

describe('race', () => {
  it('returns the first settled value', async () => {
    await expect(race([sleep(20).then(() => 'slow'), Promise.resolve('fast')])).resolves.toBe(
      'fast',
    )
  })
})
