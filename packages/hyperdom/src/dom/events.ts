export type EventHandler = (event: Event) => void;

const isEventProp = (key: string) =>
  key.length > 2 && key.startsWith("on") && /[A-Z]/.test(key[2] ?? "");

export type EventModifier = "prevent" | "stop";

/**
 * Parses supported event prop keys into `{ event, modifiers }`.
 *
 * Supported forms:
 * - `onClick` (camelCase) → `"click"`
 * - `"on:click"` / `"on:click:prevent:stop"` (colon form)
 * - `"on:[custom-event]"` / `"on:[custom-event]:prevent"`
 */
export const parseEventKey = (
  key: string,
): { event: string; modifiers: EventModifier[] } | null => {
  // onClick -> click
  if (isEventProp(key)) {
    const eventName = key.slice(2);
    const domEvent = eventName.charAt(0).toLowerCase() + eventName.slice(1);
    return { event: domEvent, modifiers: [] };
  }

  // on:click[:modifier...]
  if (!key.startsWith("on:")) return null;

  const rest = key.slice(3);

  // on:[some-event]:prevent
  if (rest.startsWith("[")) {
    const close = rest.indexOf("]");
    if (close === -1) return null;

    const event = rest.slice(1, close);
    const tail = rest.slice(close + 1); // "" | ":prevent:stop"
    const mods = tail
      .split(":")
      .filter(Boolean)
      .map((m) => m.trim())
      .filter((m): m is EventModifier => m === "prevent" || m === "stop");

    return { event, modifiers: mods };
  }

  const [event, ...modParts] = rest.split(":");
  if (!event) return null;

  const modifiers = modParts
    .map((m) => m.trim())
    .filter((m): m is EventModifier => m === "prevent" || m === "stop");

  return { event, modifiers };
};

/**
 * Attaches an event listener to an element based on an event prop key.
 *
 * Returns the actual DOM event name and the listener so callers can remove it later.
 */
export const setEvent = (
  el: Element,
  key: string,
  handler: unknown,
): { event: string; listener: EventListener } | null => {
  const parsed = parseEventKey(key);
  if (!parsed) return null;
  if (typeof handler !== "function") return null;

  const { event, modifiers } = parsed;

  const user = handler as (e: Event) => void;
  const listener: EventListener = (e) => {
    if (modifiers.includes("prevent")) (e as Event).preventDefault();
    if (modifiers.includes("stop")) (e as Event).stopPropagation();
    user(e as Event);
  };

  el.addEventListener(event, listener);
  return { event, listener };
};
