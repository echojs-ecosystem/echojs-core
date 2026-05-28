import { createReactiveEffect } from "../lifecycle/reactive";
import { onCleanup } from "../lifecycle/cleanup";
import { addBinding } from "./add-binding";
import { setEvent } from "./set-event";
const isPlainObject = (v) => typeof v === "object" && v !== null && v.constructor === Object;
const normalizeClass = (value) => {
    const out = [];
    const push = (v) => {
        if (!v || v === true)
            return;
        if (typeof v === "string") {
            const s = v.trim();
            if (s)
                out.push(s);
            return;
        }
        if (Array.isArray(v)) {
            for (const x of v)
                push(x);
            return;
        }
        if (isPlainObject(v)) {
            for (const [k, ok] of Object.entries(v)) {
                if (ok)
                    out.push(k);
            }
        }
    };
    push(value);
    return out.length ? out.join(" ") : null;
};
/** Applies a `style` value (string or object) onto an element. */
const setStyle = (el, value) => {
    if (value == null || value === false) {
        el.removeAttribute("style");
        el.style.cssText = "";
        return;
    }
    if (typeof value === "string") {
        el.setAttribute("style", value);
        return;
    }
    if (Array.isArray(value)) {
        // Vue-like: allow an array of style objects and/or strings.
        // We reset first so reactive updates don't accumulate old styles.
        el.removeAttribute("style");
        el.style.cssText = "";
        for (const part of value) {
            if (part == null || part === false)
                continue;
            if (typeof part === "string") {
                el.style.cssText += part.endsWith(";") ? part : part + ";";
                continue;
            }
            if (isPlainObject(part)) {
                const style = el.style;
                for (const [k, v] of Object.entries(part)) {
                    if (v == null || v === false)
                        style.removeProperty(k);
                    else
                        style.setProperty(k, String(v));
                }
            }
        }
        return;
    }
    if (isPlainObject(value)) {
        const style = el.style;
        for (const [k, v] of Object.entries(value)) {
            if (v == null || v === false) {
                style.removeProperty(k);
            }
            else {
                style.setProperty(k, String(v));
            }
        }
    }
};
/** Applies a `ref` callback and registers cleanup to pass `null` on dispose. */
const setRef = (el, value) => {
    if (typeof value !== "function")
        return;
    const ref = value;
    ref(el);
    onCleanup(() => ref(null));
};
/** Sets/removes a string attribute, handling boolean-ish values. */
const setAttr = (el, key, value) => {
    if (value == null || value === false) {
        el.removeAttribute(key);
        return;
    }
    el.setAttribute(key, value === true ? "" : String(value));
};
/** Sets a DOM property when it exists on the element (best-effort). */
const setDomProp = (el, key, value) => {
    if (value == null || value === false) {
        try {
            el[key] = key === "value" ? "" : false;
        }
        catch {
            // ignore
        }
        return;
    }
    try {
        el[key] = value;
    }
    catch {
        // ignore
    }
};
/**
 * Applies a single prop to an element.
 *
 * Events are deferred and handled by `setProps()` so they can participate in scope cleanup.
 */
export const setProp = (el, key, value) => {
    if (key === "children")
        return;
    // Events (deferred, because cleanup depends on render scope)
    if (key.startsWith("on"))
        return;
    // Vue-like modifiers:
    // - `.prop` forces setting a DOM property
    // - `^attr` forces setting an attribute
    if (key.startsWith(".")) {
        setDomProp(el, key.slice(1), value);
        return;
    }
    if (key.startsWith("^")) {
        setAttr(el, key.slice(1), value);
        return;
    }
    if (key === "ref") {
        addBinding(el, () => setRef(el, value));
        return;
    }
    if (key === "class" || key === "className") {
        setAttr(el, "class", normalizeClass(value));
        return;
    }
    if (key === "style") {
        setStyle(el, value);
        return;
    }
    if (key.startsWith("data-") || key.startsWith("aria-")) {
        setAttr(el, key, value);
        return;
    }
    // Prefer DOM properties when they exist on the element
    if (key in el) {
        setDomProp(el, key, value);
        return;
    }
    setAttr(el, key, value);
};
/**
 * Applies a props object to an element.
 *
 * - Event props (`on...`, `"on:..."`) are deferred via bindings so they can be cleaned up.
 * - Function-valued props (except `ref`) are treated as reactive getters and re-evaluated.
 */
export const setProps = (el, props) => {
    if (!props)
        return;
    for (const [key, raw] of Object.entries(props)) {
        if (key.startsWith("on")) {
            addBinding(el, () => {
                const bound = setEvent(el, key, raw);
                if (!bound)
                    return;
                onCleanup(() => el.removeEventListener(bound.event, bound.listener));
            });
            continue;
        }
        if (typeof raw === "function" && key !== "ref") {
            addBinding(el, () => createReactiveEffect(() => setProp(el, key, raw())));
        }
        else {
            setProp(el, key, raw);
        }
    }
};
//# sourceMappingURL=props.js.map