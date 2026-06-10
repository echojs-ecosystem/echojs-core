import { effect } from '@echojs-ecosystem/reactivity'

import { Query } from '../core/query'
import {
  isEnabled,
  resolveDefinitionOptions,
  resolveInstanceOptions,
} from './query-status'
import type {
  QueryClient,
  QueryDefinition,
  QueryInstanceOptions,
  CancelOptions,
  RefetchOptions,
  ResolvedInstanceOptions,
} from '../types'
import { hashKey } from '../utils/hash'
import { isCancelledError } from '../core/cancelled-error'

export class QueryObserver<
  TData,
  TParams = void,
  TError = unknown,
  TQueryData = TData,
> {
  readonly definition: QueryDefinition<TData, TParams, TError, TQueryData>
  readonly client: QueryClient
  readonly options: ResolvedInstanceOptions<TData, TParams, TError>

  #query: Query<TData, TParams, TError, TQueryData> | null = null
  #previousQuery: Query<TData, TParams, TError, TQueryData> | null = null
  #params!: TParams
  #disposeParams: (() => void) | null = null
  #destroyed = false
  #listeners = new Set<() => void>()
  #currentHash: string | null = null

  constructor(
    definition: QueryDefinition<TData, TParams, TError, TQueryData>,
    client: QueryClient,
    params: TParams | (() => TParams),
    instanceOptions?: QueryInstanceOptions<TData, TParams, TError>,
  ) {
    this.definition = definition
    this.client = client
    this.options = resolveInstanceOptions(
      resolveDefinitionOptions(definition),
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

  getQuery(): Query<TData, TParams, TError, TQueryData> | null {
    return this.#query
  }

  getPreviousQuery(): Query<TData, TParams, TError, TQueryData> | null {
    return this.#previousQuery
  }

  getParams(): TParams {
    return this.#params
  }

  onQueryUpdate(): void {
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
    this.#query = this.client.queryCache.build({
      client: this.client,
      cache: this.client.queryCache,
      definition: this.definition,
      params,
      queryKey,
      options: this.options,
    })

    this.#query.addObserver(this)
    void this.maybeFetch(true)
    this.onQueryUpdate()
  }

  maybeFetch(paramsChanged: boolean): void {
    if (!this.#query || !isEnabled(this.options.enabled)) return

    const stale = this.#query.isStale()
    const hasData = this.#query.hasData()

    if (!hasData || stale) {
      void this.fetch()
      return
    }

    if (paramsChanged && this.options.refetchOnMount === true) {
      void this.fetch()
    }
  }

  async fetch(options?: RefetchOptions): Promise<TData> {
    if (!this.#query) throw new Error('QueryObserver has no active query')

    try {
      return await this.#query.fetch(options)
    } catch (error) {
      if (isCancelledError(error) && !options?.throwOnError) {
        throw error
      }
      if (options?.throwOnError) throw error
      throw error
    }
  }

  async refetch(options?: RefetchOptions): Promise<TData> {
    return this.fetch(options)
  }

  invalidate(): void {
    this.#query?.invalidate()
    if (this.#query?.isActive()) {
      void this.fetch()
    }
  }

  cancel(options?: CancelOptions): Promise<void> {
    return this.#query?.cancel(options) ?? Promise.resolve()
  }

  remove(): void {
    if (!this.#query) return
    this.#detach(this.#query)
    this.client.queryCache.remove(this.#query)
    this.#query = null
    this.#currentHash = null
    this.onQueryUpdate()
  }

  destroy(): void {
    if (this.#destroyed) return
    this.#destroyed = true
    this.#disposeParams?.()
    if (this.#query) this.#detach(this.#query)
    this.#listeners.clear()
  }

  #detach(query: Query<TData, TParams, TError, TQueryData>): void {
    query.removeObserver(this)
  }
}

export const trackReactiveParams = <TParams>(
  paramsSource: TParams | (() => TParams),
  onChange: (params: TParams) => void,
): (() => void) => {
  if (typeof paramsSource !== 'function') {
    onChange(paramsSource)
    return () => {}
  }
  return effect(() => onChange((paramsSource as () => TParams)()))
}
