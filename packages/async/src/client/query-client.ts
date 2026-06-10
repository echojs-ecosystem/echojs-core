import { QueryCache, createQueryCache } from '../core/query-cache'
import { createInfiniteQueryCache } from '../core/infinite-query-cache'
import type { InfiniteQueryCache } from '../core/infinite-query-cache'
import { createMutationCache } from '../core/mutation-cache'
import type { MutationCache } from '../core/mutation-cache'
import { hashKey } from '../utils/hash'
import { functionalUpdate } from '../utils/functional-update'
import {
  isEnabled,
  resolveDefinitionOptions,
  resolveInstanceOptions,
} from '../query/query-status'
import type {
  QueryClientConfig,
  QueryDefinition,
  QueryFilter,
  QueryInstanceOptions,
  QueryKey,
} from '../types'
import { registerClientWithManagers } from '../managers/register-client'
import { allSettled } from '../promise/all-settled'
import { registerDefaultQueryClientFactory, setDefaultQueryClient } from './default-client'
import { isCancelledError } from '../core/cancelled-error'

const resolveKeyAndParams = <TData, TParams = void, TError = unknown, TQueryData = TData>(
  keyOrDefinition: QueryKey | QueryDefinition<TData, TParams, TError, TQueryData>,
  params?: TParams,
): { key: QueryKey } => {
  if (typeof keyOrDefinition === 'object' && keyOrDefinition !== null && 'kind' in keyOrDefinition) {
    return { key: keyOrDefinition.queryKey(params as TParams) }
  }
  return { key: keyOrDefinition as QueryKey }
}

export class QueryClient {
  readonly queryCache: QueryCache
  readonly infiniteQueryCache: InfiniteQueryCache
  readonly mutationCache: MutationCache

  constructor(config?: QueryClientConfig) {
    this.queryCache = createQueryCache()
    this.infiniteQueryCache = createInfiniteQueryCache()
    this.mutationCache = createMutationCache()
    registerClientWithManagers(this)
  }

  async fetchQuery<TData, TParams = void, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params?: TParams,
    options?: QueryInstanceOptions<TData, TParams, TError>,
  ): Promise<TData> {
    const resolvedParams = (params ?? ({} as TParams)) as TParams
    const queryKey = definition.queryKey(resolvedParams)
    const resolvedOptions = resolveInstanceOptions(
      resolveDefinitionOptions(definition),
      options,
    )

    if (!isEnabled(resolvedOptions.enabled)) {
      const cached = this.getQueryData<TData, TParams, TError, TQueryData>(definition, resolvedParams)
      if (cached === undefined) {
        throw new Error('Query is disabled and has no cached data')
      }
      return cached
    }

    const query = this.queryCache.build({
      client: this,
      cache: this.queryCache,
      definition,
      params: resolvedParams,
      queryKey,
      options: resolvedOptions,
    })

    if (query.hasData() && !query.isStale()) {
      return query.state.data as TData
    }

    return query.fetch()
  }

  async prefetchQuery<TData, TParams = void, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params?: TParams,
    options?: QueryInstanceOptions<TData, TParams, TError>,
  ): Promise<void> {
    await this.fetchQuery(definition, params, options)
  }

  async ensureQueryData<TData, TParams = void, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params?: TParams,
    options?: QueryInstanceOptions<TData, TParams, TError>,
  ): Promise<TData> {
    return this.fetchQuery(definition, params, options)
  }

  getQueryData<TData>(keyOrDefinition: QueryKey): TData | undefined
  getQueryData<TData, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, void, TError, TQueryData>,
  ): TData | undefined
  getQueryData<TData, TParams, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params: TParams,
  ): TData | undefined
  getQueryData<TData, TParams = void, TError = unknown, TQueryData = TData>(
    keyOrDefinition: QueryKey | QueryDefinition<TData, TParams, TError, TQueryData>,
    params?: TParams,
  ): TData | undefined {
    const { key } = resolveKeyAndParams<TData, TParams, TError, TQueryData>(keyOrDefinition, params)
    return this.queryCache.getByKey(key)?.state.data as TData | undefined
  }

  setQueryData<TData>(
    keyOrDefinition: QueryKey,
    updater: TData | ((prev: TData | undefined) => TData | undefined),
  ): void
  setQueryData<TData>(
    definition: QueryDefinition<TData, void, unknown, unknown>,
    updater: TData | ((prev: TData | undefined) => TData | undefined),
  ): void
  setQueryData<TData, TParams, TError = unknown, TQueryData = TData>(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    params: TParams,
    updater: TData | ((prev: TData | undefined) => TData | undefined),
  ): void
  setQueryData<TData>(
    keyOrDefinition: QueryKey | QueryDefinition<TData, void, unknown, unknown>,
    paramsOrUpdater?: unknown | ((prev: TData | undefined) => TData | undefined),
    updater?: TData | ((prev: TData | undefined) => TData | undefined),
  ): void {
    let key: QueryKey
    let nextUpdater: (prev: TData | undefined) => TData | undefined

    if (typeof keyOrDefinition === 'object' && keyOrDefinition !== null && 'kind' in keyOrDefinition) {
      key = keyOrDefinition.queryKey(paramsOrUpdater as never)
      nextUpdater =
        typeof updater === 'function'
          ? (updater as (prev: TData | undefined) => TData | undefined)
          : () => updater as TData
    } else {
      key = keyOrDefinition as QueryKey
      nextUpdater =
        typeof paramsOrUpdater === 'function'
          ? (paramsOrUpdater as (prev: TData | undefined) => TData | undefined)
          : () => paramsOrUpdater as TData
    }

    const hash = hashKey(key)
    let query = this.queryCache.get(hash)
    if (!query) {
      throw new Error(`Query not found for key: ${JSON.stringify(key)}`)
    }
    query.setData((prev: TData | undefined) =>
      functionalUpdate(nextUpdater, prev),
    )
  }

  invalidateQueries(
    filter: QueryFilter,
    options?: import('../types').InvalidateQueriesOptions,
  ): void {
    const refetchMode = options?.refetch ?? 'active'
    const shouldRefetch = refetchMode !== false && refetchMode !== 'none'

    for (const query of this.queryCache.findAll(filter)) {
      query.invalidate()

      if (!shouldRefetch) continue

      if (refetchMode === 'all' || query.isActive()) {
        void query.fetch().catch(() => undefined)
      }
    }
  }

  async refetchQueries(filter: QueryFilter): Promise<void> {
    await allSettled(this.queryCache.findAll(filter).map((query) => query.fetch()))
  }

  cancelQueries(filter: QueryFilter): void {
    for (const query of this.queryCache.findAll(filter)) {
      void query.cancel()
    }
  }

  removeQueries(filter: QueryFilter): void {
    for (const query of [...this.queryCache.findAll(filter)]) {
      this.queryCache.remove(query)
    }
  }

  clear(): void {
    this.queryCache.clear()
    this.infiniteQueryCache.clear()
    this.mutationCache.clear()
  }
}

export const createQueryClient = (config?: QueryClientConfig): QueryClient => {
  const client = new QueryClient(config)
  setDefaultQueryClient(client)
  registerDefaultQueryClientFactory(() => client)
  return client
}

export type { QueryClient as QueryClientType }
