import { signal } from '@echojs/reactivity'

import type { QueryClient } from '../types'
import { getRegisteredClients } from './register-client'
import { refetchStaleActiveQueries } from './refetch-stale'

export class OnlineManager {
  readonly #online = signal(typeof navigator !== 'undefined' ? navigator.onLine : true)

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.setOnline(true))
      window.addEventListener('offline', () => this.setOnline(false))
    }
  }

  isOnline(): boolean {
    return this.#online.value()
  }

  setOnline(online: boolean): void {
    const prev = this.#online.peek()
    this.#online.set(online)
    if (!prev && online) {
      for (const client of getRegisteredClients()) {
        refetchStaleActiveQueries(client, 'reconnect')
      }
    }
  }

  subscribe(listener: (online: boolean) => void): () => void {
    return this.#online.subscribe(() => listener(this.#online.value()))
  }

  onClientRegistered(client: QueryClient): void {
    if (this.isOnline()) {
      refetchStaleActiveQueries(client, 'reconnect')
    }
  }
}

export const onlineManager = new OnlineManager()
