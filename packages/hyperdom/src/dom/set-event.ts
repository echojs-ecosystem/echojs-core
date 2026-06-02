import { parseEventKey } from "./parse-event-key";

export type EventHandler = (event: Event) => void;

export const setEvent = (
  element: Element,
  key: string,
  handler: unknown,
): { event: string; listener: EventListener } | null => {
  const parsed = parseEventKey(key);
  if (!parsed) return null;
  if (typeof handler !== "function") return null;

  const { event } = parsed;
  const user = handler as (e: Event) => void;
  const listener: EventListener = (event) => user(event);

  element.addEventListener(event, listener);
  return { event, listener };
};
