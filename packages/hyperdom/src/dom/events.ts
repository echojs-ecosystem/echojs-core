export type EventHandler = (event: Event) => void;

const isEventProp = (key: string) => key.length > 2 && key.startsWith("on") && /[A-Z]/.test(key[2] ?? "");

export function setEvent(el: Element, key: string, handler: unknown): void {
  if (!isEventProp(key)) return;
  if (typeof handler !== "function") return;

  const eventName = key.slice(2);
  const domEvent = eventName.charAt(0).toLowerCase() + eventName.slice(1);

  const listener = handler as EventListener;
  el.addEventListener(domEvent, listener);
}

