import { createQueryClient, resetQueryProvider, setDefaultQueryClient } from '@echojs-ecosystem/async'

export { createTestClient, flush as asyncTick } from '../../../async/src/test-utils'

export const resetAsyncTestContext = (): void => {
  resetQueryProvider()
  setDefaultQueryClient(createQueryClient())
}
