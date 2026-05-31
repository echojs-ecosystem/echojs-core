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

  const { event, modifiers } = parsed;

  const user = handler as (e: Event) => void;
  const listener: EventListener = (event) => {
    if (modifiers.includes("prevent")) event.preventDefault();
    if (modifiers.includes("stop")) event.stopPropagation();
    user(event);
  };

  element.addEventListener(event, listener);
  return { event, listener };
};

