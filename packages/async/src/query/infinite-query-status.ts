import type {
  InfiniteQueryDefinition,
  InfiniteQueryInstanceOptions,
  InfiniteQueryOptions,
  ResolvedInfiniteInstanceOptions,
  ResolvedInfiniteQueryOptions,
} from '../types'
import { toMs } from './query-options'

const DEFAULT_CACHE_TIME_MS = 5 * 60_000

export const resolveInfiniteQueryOptions = <
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
>(
  options: InfiniteQueryOptions<TPage, TParams, TPageParam, TError>,
): ResolvedInfiniteQueryOptions<TPage, TParams, TPageParam, TError> => {
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

export const resolveInfiniteInstanceOptions = <
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
>(
  definitionOptions: ResolvedInfiniteQueryOptions<TPage, TParams, TPageParam, TError>,
  instanceOptions?: InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError>,
): ResolvedInfiniteInstanceOptions<TPage, TParams, TPageParam, TError> => {
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
    keepPreviousData: instanceOptions?.keepPreviousData ?? definitionOptions.keepPreviousData ?? false,
    abortPrevious: instanceOptions?.abortPrevious ?? definitionOptions.abortPrevious ?? true,
    retry: instanceOptions?.retry ?? definitionOptions.retry ?? false,
    retryDelay: instanceOptions?.retryDelay ?? definitionOptions.retryDelay ?? 1000,
    onStart: instanceOptions?.onStart ?? definitionOptions.onStart,
    onSuccess: instanceOptions?.onSuccess ?? definitionOptions.onSuccess,
    onError: instanceOptions?.onError ?? definitionOptions.onError,
    onSettled: instanceOptions?.onSettled ?? definitionOptions.onSettled,
  }
}

export const resolveInfiniteDefinitionOptions = <
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
>(
  definition: InfiniteQueryDefinition<TPage, TParams, TPageParam, TError>,
): ResolvedInfiniteQueryOptions<TPage, TParams, TPageParam, TError> =>
  resolveInfiniteQueryOptions(definition.options)

export { isEnabled } from './query-status'
