import type { QueryProvider } from '../provider/query-provider'
import type { InfiniteQueryOptions, QueryClientConfig } from '../types'
import { defaultQueryOptions } from './query-options'

export const mergeInfiniteQueryDefinitionOptions = <
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
>(
  options: InfiniteQueryOptions<TPage, TParams, TPageParam, TError>,
  config?: QueryClientConfig,
  provider?: QueryProvider | null,
): InfiniteQueryOptions<TPage, TParams, TPageParam, TError> => {
  const queryDefaults = defaultQueryOptions<unknown, TParams, TError>(config)
  const providerDefaults = provider?.config.defaultOptions?.queries as
    | Partial<InfiniteQueryOptions<TPage, TParams, TPageParam, TError>>
    | undefined

  return {
    staleTime: queryDefaults.staleTime,
    cacheTime: queryDefaults.cacheTime,
    retry: queryDefaults.retry,
    retryDelay: queryDefaults.retryDelay,
    keepPreviousData: queryDefaults.keepPreviousData,
    abortPrevious: queryDefaults.abortPrevious,
    ...providerDefaults,
    ...options,
  }
}
