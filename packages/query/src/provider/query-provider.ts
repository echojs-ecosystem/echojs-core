import { createQueryClient, QueryClient } from '../client/query-client'
import { setDefaultQueryClient } from '../client/default-client'
import { createMutation } from '../mutation/create-mutation'
import { createQuery } from '../query/create-query'
import { createInfiniteQuery } from '../query/create-infinite-query'
import { setActiveQueryProvider } from './context'
import type {
  InfiniteQueryDefinition,
  InfiniteQueryOptions,
  InvalidateQueriesOptions,
  MutationDefinition,
  MutationOptions,
  QueryDefinition,
  QueryFilter,
  QueryOptions,
} from '../types'
import type { QueryProviderConfig } from './query-provider-types'

export type {
  QueryProviderConfig,
  QueryProviderDefaultOptions,
} from './query-provider-types'

export { getQueryProvider, resetQueryProvider } from './context'

export class QueryProvider {
  readonly client: QueryClient
  readonly config: QueryProviderConfig

  constructor(config: QueryProviderConfig = {}) {
    this.client = config.client ?? createQueryClient(config)
    this.config = { ...config, client: this.client }
  }

  createQuery = <
    TData,
    TParams = void,
    TError = unknown,
    TQueryData = TData,
  >(
    options: QueryOptions<TData, TParams, TError, TQueryData>,
  ): QueryDefinition<TData, TParams, TError, TQueryData> =>
    createQuery(options, { provider: this })

  createMutation = <
    TData,
    TVariables,
    TError = unknown,
    TRollback = unknown,
  >(
    options: MutationOptions<TData, TVariables, TError, TRollback>,
  ): MutationDefinition<TData, TVariables, TError, TRollback> =>
    createMutation(options, { provider: this })

  createInfiniteQuery = <
    TPage,
    TParams = void,
    TPageParam = unknown,
    TError = unknown,
  >(
    options: InfiniteQueryOptions<TPage, TParams, TPageParam, TError>,
  ): InfiniteQueryDefinition<TPage, TParams, TPageParam, TError> =>
    createInfiniteQuery(options, { provider: this })

  invalidateQueries(filter: QueryFilter, options?: InvalidateQueriesOptions): void {
    this.client.invalidateQueries(filter, options)
  }

  refetchQueries(filter: QueryFilter): Promise<void> {
    return this.client.refetchQueries(filter)
  }

  cancelQueries(filter: QueryFilter): void {
    this.client.cancelQueries(filter)
  }

  removeQueries(filter: QueryFilter): void {
    this.client.removeQueries(filter)
  }
}

export const setQueryProvider = (provider: QueryProvider): void => {
  setActiveQueryProvider(provider)
  setDefaultQueryClient(provider.client)
}

export const createQueryProvider = (config: QueryProviderConfig = {}): QueryProvider =>
  new QueryProvider(config)
