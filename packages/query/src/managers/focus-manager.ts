import { signal } from '@echojs-ecosystem/reactivity'

import type { QueryClient } from '../types'
import { getRegisteredClients } from './register-client'
import { refetchStaleActiveQueries } from './refetch-stale'

export class FocusManager {
  readonly #focused = signal(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true,
  )

  constructor() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const onVisibility = () => {
        this.setFocused(document.visibilityState === 'visible')
      }
      document.addEventListener('visibilitychange', onVisibility)
      window.addEventListener('focus', () => this.setFocused(true))
    }
  }

  isFocused(): boolean {
    return this.#focused.value()
  }

  setFocused(focused: boolean): void {
    this.#focused.set(focused)
    if (focused) {
      for (const client of getRegisteredClients()) {
        refetchStaleActiveQueries(client, 'focus')
      }
    }
  }

  subscribe(listener: (focused: boolean) => void): () => void {
    return this.#focused.subscribe(() => listener(this.#focused.value()))
  }

  onClientRegistered(client: QueryClient): void {
    if (this.isFocused()) {
      refetchStaleActiveQueries(client, 'focus')
    }
  }
}

export const focusManager = new FocusManager()
