import type { QueryProvider } from '../provider/query-provider'
import { getQueryProvider } from '../provider/context'
import type {
  InfiniteQueryDefinition,
  InfiniteQueryInstance,
  InfiniteQueryInstanceOptions,
  InfiniteQueryOptions,
  StoreLike,
} from '../types'
import { getDefaultQueryClient } from '../client/default-client'
import { createInfiniteQueryInstance } from './infinite-query-instance'
import { mergeInfiniteQueryDefinitionOptions } from './infinite-query-options'
import { resolveInfiniteQueryOptions } from './infinite-query-status'

export type CreateInfiniteQueryMeta = {
  provider?: QueryProvider | null
}

export const createInfiniteQuery = <
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
>(
  options: InfiniteQueryOptions<TPage, TParams, TPageParam, TError>,
  meta?: CreateInfiniteQueryMeta,
): InfiniteQueryDefinition<TPage, TParams, TPageParam, TError> => {
  const provider = meta?.provider ?? getQueryProvider()
  const mergedOptions = mergeInfiniteQueryDefinitionOptions(
    options,
    provider?.config,
    provider,
  )
  const resolved = resolveInfiniteQueryOptions(mergedOptions)

  const definition: InfiniteQueryDefinition<TPage, TParams, TPageParam, TError> = {
    kind: 'infinite-query-definition',
    name: options.name,
    options: mergedOptions,

    queryKey(params: TParams) {
      return mergedOptions.queryKey(params)
    },

    with(
      params: TParams | (() => TParams),
      instanceOptions?: InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError>,
    ): InfiniteQueryInstance<TPage, TPageParam, TParams, TError> {
      const client =
        instanceOptions?.client ?? provider?.client ?? getDefaultQueryClient()
      return createInfiniteQueryInstance(definition, client, params, instanceOptions)
    },

    withStore<StoreValue>(
      store: StoreLike<StoreValue>,
      map: (value: StoreValue) => TParams,
      instanceOptions?: InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError>,
    ): InfiniteQueryInstance<TPage, TPageParam, TParams, TError> {
      const client =
        instanceOptions?.client ?? provider?.client ?? getDefaultQueryClient()
      return createInfiniteQueryInstance(
        definition,
        client,
        () => map(store.value()),
        instanceOptions,
      )
    },
  }

  void resolved
  return definition
}
