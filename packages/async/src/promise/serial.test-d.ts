import { describe, expectTypeOf, it } from 'vitest'

import type { AsyncTask } from './async-task'
import { serial } from './serial'

describe('serial types', () => {
  it('returns array of homogeneous task results', () => {
    const tasks: AsyncTask<number>[] = [Promise.resolve(1), () => Promise.resolve(2)]
    expectTypeOf(serial(tasks)).toEqualTypeOf<Promise<number[]>>()
  })
})
