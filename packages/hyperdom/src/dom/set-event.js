import { parseEventKey } from "./parse-event-key";
export const setEvent = (element, key, handler) => {
    const parsed = parseEventKey(key);
    if (!parsed)
        return null;
    if (typeof handler !== "function")
        return null;
    const { event, modifiers } = parsed;
    const user = handler;
    const listener = (event) => {
        if (modifiers.includes("prevent"))
            event.preventDefault();
        if (modifiers.includes("stop"))
            event.stopPropagation();
        user(event);
    };
    element.addEventListener(event, listener);
    return { event, listener };
};
//# sourceMappingURL=set-event.js.map