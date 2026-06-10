import { describe, expect, it } from 'vitest'

import { sleep } from '../utils/sleep'
import { all } from './all'

describe('all', () => {
  it('resolves every value', async () => {
    await expect(all([Promise.resolve(1), sleep(0).then(() => 2)])).resolves.toEqual([1, 2])
  })

  it('rejects when any input rejects', async () => {
    await expect(all([Promise.resolve(1), Promise.reject(new Error('fail'))])).rejects.toThrow(
      'fail',
    )
  })
})
