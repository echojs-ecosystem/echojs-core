import type {
  MutationOptions,
  QueryClient,
  QueryClientConfig,
  QueryOptions,
} from '../types'
export type QueryProviderDefaultOptions = {
  queries?: Partial<Omit<QueryOptions<unknown, void>, 'queryKey' | 'queryFn'>>
  mutations?: Partial<Omit<MutationOptions<unknown, unknown>, 'mutationFn'>>
}

export type QueryProviderConfig = QueryClientConfig & {
  client?: QueryClient
  defaultOptions?: QueryProviderDefaultOptions
}
