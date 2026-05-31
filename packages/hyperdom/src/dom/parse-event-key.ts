export type EventModifier = "prevent" | "stop";

const isEventProp = (key: string) =>
  key.length > 2 && key.startsWith("on") && /[A-Z]/.test(key[2] ?? "");

export const parseEventKey = (
  key: string,
): { event: string; modifiers: EventModifier[] } | null => {
  if (isEventProp(key)) {
    const eventName = key.slice(2);
    const domEvent = eventName.charAt(0).toLowerCase() + eventName.slice(1);
    return { event: domEvent, modifiers: [] };
  }

  if (!key.startsWith("on:")) return null;

  const rest = key.slice(3);

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

