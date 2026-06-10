export type Listener<TEvent> = (event: TEvent) => void

export class Subscribable<TEvent> {
  protected listeners = new Set<Listener<TEvent>>()

  subscribe(listener: Listener<TEvent>): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  protected notify(event: TEvent): void {
    for (const listener of this.listeners) {
      listener(event)
    }
  }

  hasListeners(): boolean {
    return this.listeners.size > 0
  }
}
