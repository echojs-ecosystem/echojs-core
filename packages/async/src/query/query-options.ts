import type { QueryProvider } from '../provider/query-provider'
import type { QueryClientConfig, QueryOptions } from '../types'

const DEFAULT_CACHE_TIME_MS = 5 * 60_000

export const defaultQueryOptions = <TData, TParams = void, TError = unknown>(
  config?: QueryClientConfig,
): Partial<QueryOptions<TData, TParams, TError>> => ({
  staleTime: config?.defaultOptions?.queries?.staleTime ?? 0,
  cacheTime: config?.defaultOptions?.queries?.cacheTime ?? DEFAULT_CACHE_TIME_MS,
  retry: config?.defaultOptions?.queries?.retry ?? false,
  retryDelay: config?.defaultOptions?.queries?.retryDelay ?? 1000,
  keepPreviousData: config?.defaultOptions?.queries?.keepPreviousData ?? false,
  abortPrevious: config?.defaultOptions?.queries?.abortPrevious ?? true,
})

export const mergeQueryDefinitionOptions = <TData, TParams = void, TError = unknown, TQueryData = TData>(
  options: QueryOptions<TData, TParams, TError, TQueryData>,
  config?: QueryClientConfig,
  provider?: QueryProvider | null,
): QueryOptions<TData, TParams, TError, TQueryData> => ({
  ...defaultQueryOptions<TData, TParams, TError>(config),
  ...(provider?.config.defaultOptions?.queries as
    | Partial<QueryOptions<TData, TParams, TError, TQueryData>>
    | undefined),
  ...options,
} as QueryOptions<TData, TParams, TError, TQueryData>)

export const toMs = (value: number | undefined, fallback: number): number => {
  if (value === undefined) return fallback
  if (!Number.isFinite(value)) return Number.POSITIVE_INFINITY
  return value
}
