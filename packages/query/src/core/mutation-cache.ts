import { Subscribable } from './subscribable'
import type { MutationCacheEvent, MutationCacheListener } from '../types'

export class MutationCache extends Subscribable<MutationCacheEvent> {
  emit(event: MutationCacheEvent): void {
    this.notify(event)
  }

  clear(): void {
    this.listeners.clear()
  }
}

export const createMutationCache = (): MutationCache => new MutationCache()
