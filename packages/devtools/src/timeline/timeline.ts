import { createDevtoolsEvent } from './event'
import type {
  DevtoolsEvent,
  DevtoolsTimelineAPI,
  EmitDevtoolsEventInput,
  TimelineListener,
} from '../types'

const DEFAULT_MAX_EVENTS = 500

export class DevtoolsTimeline implements DevtoolsTimelineAPI {
  #events: DevtoolsEvent[] = []
  #maxEvents = DEFAULT_MAX_EVENTS
  readonly #listeners = new Set<TimelineListener>()

  emit(input: EmitDevtoolsEventInput): DevtoolsEvent {
    const event = createDevtoolsEvent(input)
    this.#events.push(event)

    if (this.#events.length > this.#maxEvents) {
      this.#events.splice(0, this.#events.length - this.#maxEvents)
    }

    for (const listener of this.#listeners) {
      listener(event)
    }

    return event
  }

  getEvents(): readonly DevtoolsEvent[] {
    return this.#events
  }

  subscribe(listener: TimelineListener): () => void {
    this.#listeners.add(listener)
    return () => {
      this.#listeners.delete(listener)
    }
  }

  setMaxEvents(max: number): void {
    this.#maxEvents = Math.max(1, max)
    if (this.#events.length > this.#maxEvents) {
      this.#events.splice(0, this.#events.length - this.#maxEvents)
    }
  }

  clear(): void {
    this.#events.length = 0
  }
}
