import type { QueryClient } from '../types'

export type QueryClientProvider = {
  client: QueryClient
}

export const createQueryClientProvider = (client: QueryClient): QueryClientProvider => ({
  client,
})
