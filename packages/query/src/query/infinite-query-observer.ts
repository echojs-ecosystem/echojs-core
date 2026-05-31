import { effect } from '@echojs/reactivity'

import { InfiniteQuery } from '../core/infinite-query'
import {
  isEnabled,
  resolveInfiniteDefinitionOptions,
  resolveInfiniteInstanceOptions,
} from './infinite-query-status'
import type {
  InfiniteQueryDefinition,
  InfiniteQueryInstanceOptions,
  CancelOptions,
  QueryClient,
  RefetchOptions,
  FetchPageOptions,
  ResolvedInfiniteInstanceOptions,
} from '../types'
import { hashKey } from '../utils/hash'

export class InfiniteQueryObserver<
  TPage,
  TParams = void,
  TPageParam = unknown,
  TError = unknown,
> {
  readonly definition: InfiniteQueryDefinition<TPage, TParams, TPageParam, TError>
  readonly client: QueryClient
  readonly options: ResolvedInfiniteInstanceOptions<TPage, TParams, TPageParam, TError>

  #query: InfiniteQuery<TPage, TParams, TPageParam, TError> | null = null
  #previousQuery: InfiniteQuery<TPage, TParams, TPageParam, TError> | null = null
  #params!: TParams
  #disposeParams: (() => void) | null = null
  #destroyed = false
  #listeners = new Set<() => void>()
  #currentHash: string | null = null

  constructor(
    definition: InfiniteQueryDefinition<TPage, TParams, TPageParam, TError>,
    client: QueryClient,
    params: TParams | (() => TParams),
    instanceOptions?: InfiniteQueryInstanceOptions<TPage, TParams, TPageParam, TError>,
  ) {
    this.definition = definition
    this.client = client
    this.options = resolveInfiniteInstanceOptions(
      resolveInfiniteDefinitionOptions(definition),
      instanceOptions,
    )

    if (typeof params === 'function') {
      this.#disposeParams = effect(() => {
        this.setParams((params as () => TParams)())
      })
    } else {
      this.setParams(params)
    }
  }

  getQuery(): InfiniteQuery<TPage, TParams, TPageParam, TError> | null {
    return this.#query
  }

  getPreviousQuery(): InfiniteQuery<TPage, TParams, TPageParam, TError> | null {
    return this.#previousQuery
  }

  getParams(): TParams {
    return this.#params
  }

  onInfiniteQueryUpdate(): void {
    for (const listener of this.#listeners) listener()
  }

  subscribe(listener: () => void): () => void {
    this.#listeners.add(listener)
    return () => this.#listeners.delete(listener)
  }

  setParams(params: TParams): void {
    if (this.#destroyed) return

    this.#params = params
    const queryKey = this.definition.queryKey(params)
    const hash = hashKey(queryKey)

    if (this.#currentHash === hash) {
      void this.maybeFetch(false)
      return
    }

    if (this.#query) {
      if (this.options.abortPrevious) {
        void this.#query.cancel({ silent: true })
      }
      this.#detach(this.#query)
      this.#previousQuery = this.options.keepPreviousData ? this.#query : null
    }

    this.#currentHash = hash
    this.#query = this.client.infiniteQueryCache.build({
      client: this.client,
      cache: this.client.infiniteQueryCache,
      definition: this.definition,
      params,
      queryKey,
      options: this.options,
    })

    this.#query.addObserver(this)
    void this.maybeFetch(true)
    this.onInfiniteQueryUpdate()
  }

  maybeFetch(paramsChanged: boolean): void {
    if (!this.#query || !isEnabled(this.options.enabled)) return

    const stale = this.#query.isStale()
    const hasData = this.#query.hasData()

    if (!hasData || stale) {
      void this.#query.fetchNextPage()
      return
    }

    if (paramsChanged && this.options.refetchOnMount === true) {
      void this.#query.refetch()
    }
  }

  cancel(options?: CancelOptions): void {
    void this.#query?.cancel(options)
  }

  remove(): void {
    if (!this.#query) return
    this.#detach(this.#query)
    this.client.infiniteQueryCache.remove(this.#query)
    this.#query = null
    this.#currentHash = null
    this.onInfiniteQueryUpdate()
  }

  destroy(): void {
    if (this.#destroyed) return
    this.#destroyed = true
    this.#disposeParams?.()
    if (this.#query) this.#detach(this.#query)
    this.#listeners.clear()
  }

  #detach(query: InfiniteQuery<TPage, TParams, TPageParam, TError>): void {
    query.removeObserver(this)
  }
}
