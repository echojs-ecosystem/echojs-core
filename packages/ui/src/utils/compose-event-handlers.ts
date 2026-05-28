export type ComposeEventHandlersOptions = {
  /** When true, skips `internalHandler` if `userHandler` called `preventDefault`. */
  checkDefaultPrevented?: boolean;
};

type EventHandler<E extends Event = Event> = (event: E) => void;

/**
 * Composes two event handlers. `userHandler` runs first.
 */
export const composeEventHandlers = <E extends Event>(
  userHandler: EventHandler<E> | undefined,
  internalHandler: EventHandler<E> | undefined,
  options: ComposeEventHandlersOptions = {},
): EventHandler<E> | undefined => {
  if (!userHandler && !internalHandler) return undefined;
  if (!userHandler) return internalHandler;
  if (!internalHandler) return userHandler;

  const { checkDefaultPrevented = false } = options;

  return (event) => {
    userHandler(event);
    if (checkDefaultPrevented && event.defaultPrevented) return;
    internalHandler(event);
  };
};
