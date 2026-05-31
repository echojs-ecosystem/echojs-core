import type { QueryProvider } from '../provider/query-provider'
import { getQueryProvider } from '../provider/context'
import type {
  QueryDefinition,
  QueryInstance,
  QueryInstanceOptions,
  QueryOptions,
  StoreLike,
} from '../types'
import { getDefaultQueryClient } from '../client/default-client'
import { createQueryInstance } from './query-instance'
import { mergeQueryDefinitionOptions } from './query-options'
import { resolveQueryOptions } from './query-status'

export type CreateQueryMeta = {
  provider?: QueryProvider | null
}

export const createQuery = <
  TData,
  TParams = void,
  TError = unknown,
  TQueryData = TData,
>(
  options: QueryOptions<TData, TParams, TError, TQueryData>,
  meta?: CreateQueryMeta,
): QueryDefinition<TData, TParams, TError, TQueryData> => {
  const provider = meta?.provider ?? getQueryProvider()
  const mergedOptions = mergeQueryDefinitionOptions(
    options,
    provider?.config,
    provider,
  )
  const resolved = resolveQueryOptions(mergedOptions)

  const definition: QueryDefinition<TData, TParams, TError, TQueryData> = {
    kind: 'query-definition',
    name: options.name,
    options: mergedOptions,

    queryKey(params: TParams) {
      return mergedOptions.queryKey(params)
    },

    with(
      params: TParams | (() => TParams),
      instanceOptions?: QueryInstanceOptions<TData, TParams, TError>,
    ): QueryInstance<TData, TParams, TError> {
      const client =
        instanceOptions?.client ?? provider?.client ?? getDefaultQueryClient()
      return createQueryInstance(definition, client, params, instanceOptions)
    },

    withStore<StoreValue>(
      store: StoreLike<StoreValue>,
      map: (value: StoreValue) => TParams,
      instanceOptions?: QueryInstanceOptions<TData, TParams, TError>,
    ): QueryInstance<TData, TParams, TError> {
      const client =
        instanceOptions?.client ?? provider?.client ?? getDefaultQueryClient()
      return createQueryInstance(
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
