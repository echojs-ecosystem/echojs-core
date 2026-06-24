export type EventMap = Record<string, unknown>;

type EventHandler<Payload> = [Payload] extends [void] ? () => void : (payload: Payload) => void;

type ListenerFn = (...args: unknown[]) => void;

export interface EventEmitter<Events extends EventMap> {
  on<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this;

  /** Alias for {@link on}. */
  subscribe<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this;

  off<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this;

  once<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this;

  emit<Event extends keyof Events>(
    ...args: Events[Event] extends void ? [event: Event] : [event: Event, payload: Events[Event]]
  ): this;

  clear(event?: keyof Events): this;

  listenerCount(event: keyof Events): number;

  hasListeners(event?: keyof Events): boolean;
}

const invokeListener = <Payload>(listener: ListenerFn, payload: Payload | undefined): void => {
  if (payload === undefined) {
    (listener as () => void)();
    return;
  }

  (listener as (value: Payload) => void)(payload);
};

export class TypedEventEmitter<Events extends EventMap> implements EventEmitter<Events> {
  private readonly listeners = new Map<keyof Events, Set<ListenerFn>>();

  private getListenerSet(event: keyof Events): Set<ListenerFn> {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    return set;
  }

  on<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this {
    this.getListenerSet(event).add(listener as ListenerFn);
    return this;
  }

  subscribe<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this {
    return this.on(event, listener);
  }

  off<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this {
    this.listeners.get(event)?.delete(listener as ListenerFn);
    return this;
  }

  once<Event extends keyof Events>(
    event: Event,
    listener: EventHandler<Events[Event]>,
  ): this {
    const wrapper: ListenerFn = (payload) => {
      this.off(event, wrapper as EventHandler<Events[Event]>);
      invokeListener(listener as ListenerFn, payload as Events[Event] | undefined);
    };

    return this.on(event, wrapper as EventHandler<Events[Event]>);
  }

  emit<Event extends keyof Events>(
    ...args: Events[Event] extends void ? [event: Event] : [event: Event, payload: Events[Event]]
  ): this {
    const [event, payload] = args;
    const set = this.listeners.get(event);
    if (set?.size) {
      for (const listener of [...set]) {
        invokeListener(listener, payload as Events[Event] | undefined);
      }
    }

    return this;
  }

  clear(event?: keyof Events): this {
    if (event === undefined) {
      this.listeners.clear();
      return this;
    }

    this.listeners.delete(event);
    return this;
  }

  listenerCount(event: keyof Events): number {
    return this.listeners.get(event)?.size ?? 0;
  }

  hasListeners(event?: keyof Events): boolean {
    if (event !== undefined) {
      return (this.listeners.get(event)?.size ?? 0) > 0;
    }

    for (const set of this.listeners.values()) {
      if (set.size > 0) return true;
    }

    return false;
  }
}

/** Creates a typed event emitter with chainable `on`, `off`, `once`, and `emit`. */
export const createEventEmitter = <Events extends EventMap>(): EventEmitter<Events> =>
  new TypedEventEmitter<Events>();
