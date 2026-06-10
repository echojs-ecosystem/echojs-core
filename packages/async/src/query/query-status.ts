import type {
  QueryDefinition,
  QueryFetchStatus,
  QueryInstanceOptions,
  QueryOptions,
  QueryStatus,
  ResolvedInstanceOptions,
  ResolvedQueryOptions,
} from '../types'
import { toMs } from './query-options'

const DEFAULT_CACHE_TIME_MS = 5 * 60_000

export const resolveQueryOptions = <TData, TParams = void, TError = unknown, TQueryData = TData>(
  options: QueryOptions<TData, TParams, TError, TQueryData>,
): ResolvedQueryOptions<TData, TParams, TError, TQueryData> => {
  const staleTime = options.staleTime ?? 0
  const cacheTime = options.cacheTime ?? DEFAULT_CACHE_TIME_MS

  return {
    ...options,
    staleTime,
    cacheTime,
    retry: options.retry ?? false,
    retryDelay: options.retryDelay ?? 1000,
    keepPreviousData: options.keepPreviousData ?? false,
    abortPrevious: options.abortPrevious ?? true,
    staleTimeMs: toMs(staleTime, 0),
    cacheTimeMs: toMs(cacheTime, DEFAULT_CACHE_TIME_MS),
  }
}

export const resolveInstanceOptions = <
  TData,
  TParams = void,
  TError = unknown,
  TQueryData = TData,
>(
  definitionOptions: ResolvedQueryOptions<TData, TParams, TError, TQueryData>,
  instanceOptions?: QueryInstanceOptions<TData, TParams, TError>,
): ResolvedInstanceOptions<TData, TParams, TError> => {
  const staleTime = instanceOptions?.staleTime ?? definitionOptions.staleTime ?? 0
  const cacheTime =
    instanceOptions?.cacheTime ?? definitionOptions.cacheTime ?? DEFAULT_CACHE_TIME_MS

  return {
    ...definitionOptions,
    ...instanceOptions,
    staleTime,
    cacheTime,
    staleTimeMs: toMs(staleTime, 0),
    cacheTimeMs: toMs(cacheTime, DEFAULT_CACHE_TIME_MS),
    enabled: instanceOptions?.enabled ?? true,
    refetchOnMount: instanceOptions?.refetchOnMount ?? true,
    refetchOnWindowFocus: instanceOptions?.refetchOnWindowFocus ?? true,
    refetchOnReconnect: instanceOptions?.refetchOnReconnect ?? true,
    keepPreviousData:
      instanceOptions?.keepPreviousData ?? definitionOptions.keepPreviousData ?? false,
    abortPrevious: instanceOptions?.abortPrevious ?? definitionOptions.abortPrevious ?? true,
    retry: instanceOptions?.retry ?? definitionOptions.retry ?? false,
    retryDelay: instanceOptions?.retryDelay ?? definitionOptions.retryDelay ?? 1000,
    onStart: instanceOptions?.onStart ?? definitionOptions.onStart,
    onSuccess: instanceOptions?.onSuccess ?? definitionOptions.onSuccess,
    onError: instanceOptions?.onError ?? definitionOptions.onError,
    onSettled: instanceOptions?.onSettled ?? definitionOptions.onSettled,
  }
}

export const isEnabled = (enabled: boolean | (() => boolean)): boolean =>
  typeof enabled === 'function' ? enabled() : enabled

export const isQueryPending = (status: QueryStatus): boolean => status === 'pending'

export const isQueryFetching = (fetchStatus: QueryFetchStatus): boolean =>
  fetchStatus === 'fetching'

export const isQuerySuccess = (status: QueryStatus): boolean => status === 'success'

export const isQueryError = (status: QueryStatus): boolean => status === 'error'

export const isQueryIdle = (status: QueryStatus): boolean => status === 'idle'

export const isQueryPaused = (fetchStatus: QueryFetchStatus): boolean =>
  fetchStatus === 'paused'

export const resolveDefinitionOptions = <TData, TParams = void, TError = unknown, TQueryData = TData>(
  definition: QueryDefinition<TData, TParams, TError, TQueryData>,
): ResolvedQueryOptions<TData, TParams, TError, TQueryData> =>
  resolveQueryOptions(definition.options)
