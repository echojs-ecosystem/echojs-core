import { cleanup } from "@echojs/reactivity";
import type { EventHandler, EventModifiers } from "./types";
import { isFunction } from "./internals/utils";

const parseEventName = (fullName: string): { event: string; modifiers: EventModifiers } => {
  const parts = fullName.split(":");
  const event = parts[0]!;
  const modifiers: EventModifiers = {};

  for (let i = 1; i < parts.length; i++) {
    const modifier = parts[i]!;
    switch (modifier) {
      case "prevent":
        modifiers.prevent = true;
        break;
      case "stop":
        modifiers.stop = true;
        break;
      case "capture":
        modifiers.capture = true;
        break;
      case "once":
        modifiers.once = true;
        break;
      case "self":
        modifiers.self = true;
        break;
    }
  }

  return { event, modifiers };
};

const createWrappedHandler = (handler: EventHandler, modifiers: EventModifiers): EventHandler => {
  return (event: Event) => {
    if (modifiers.self && event.target !== event.currentTarget) {
      return;
    }

    if (modifiers.prevent) {
      event.preventDefault();
    }

    if (modifiers.stop) {
      event.stopPropagation();
    }

    handler(event);
  };
};

const addEventListener = (
  element: Element,
  event: string,
  handler: EventHandler,
  modifiers: EventModifiers,
): (() => void) => {
  const wrappedHandler = createWrappedHandler(handler, modifiers);

  const options: AddEventListenerOptions = {
    capture: modifiers.capture,
    once: modifiers.once,
  };

  element.addEventListener(event, wrappedHandler, options);

  return () => {
    element.removeEventListener(event, wrappedHandler, options);
  };
};

const isEventProp = (name: string): boolean => {
  // Support on:click, on-click, onClick
  return name.startsWith("on:") || name.startsWith("on-") || /^on[A-Z]/.test(name);
};

const normalizeEventName = (name: string): string => {
  if (name.startsWith("on:")) {
    return name.slice(3);
  }
  if (name.startsWith("on-")) {
    return name.slice(3);
  }
  // onClick -> click
  if (name.startsWith("on") && name.length > 2) {
    const eventName = name.slice(2);
    return eventName[0]!.toLowerCase() + eventName.slice(1);
  }
  return name;
};

export const setEvent = (
  element: Element,
  name: string,
  handler: EventHandler | null | undefined,
): void => {
  if (!isFunction(handler)) return;

  const normalizedName = normalizeEventName(name);
  const { event, modifiers } = parseEventName(normalizedName);

  const disposer = addEventListener(element, event, handler, modifiers);
  cleanup(disposer);
};

export const setEvents = (element: Element, props: Record<string, unknown>): void => {
  for (const [name, value] of Object.entries(props)) {
    if (isEventProp(name) && isFunction(value)) {
      setEvent(element, name, value as EventHandler);
    }
  }
};
