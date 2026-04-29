import { createReactiveEffect } from "../lifecycle/reactive";
import { onCleanup } from "../lifecycle/cleanup";
import { addBinding } from "./bindings";
import { setEvent } from "./events";

type StyleObject = Record<string, string | number | null | undefined | false>;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && (v as any).constructor === Object;

function setStyle(el: HTMLElement, value: unknown): void {
  if (value == null || value === false) {
    el.removeAttribute("style");
    return;
  }
  if (typeof value === "string") {
    el.setAttribute("style", value);
    return;
  }
  if (isPlainObject(value)) {
    const style = el.style;
    for (const [k, v] of Object.entries(value as StyleObject)) {
      if (v == null || v === false) {
        style.removeProperty(k);
      } else {
        style.setProperty(k, String(v));
      }
    }
  }
}

function setRef(el: Element, value: unknown): void {
  if (typeof value !== "function") return;
  const ref = value as (el: Element | null) => void;
  ref(el);
  onCleanup(() => ref(null));
}

function setAttr(el: Element, key: string, value: unknown): void {
  if (value == null || value === false) {
    el.removeAttribute(key);
    return;
  }
  el.setAttribute(key, value === true ? "" : String(value));
}

function setDomProp(el: any, key: string, value: unknown): void {
  if (value == null || value === false) {
    try {
      el[key] = key === "value" ? "" : false;
    } catch {
      // ignore
    }
    return;
  }
  try {
    el[key] = value;
  } catch {
    // ignore
  }
}

export function setProp(el: Element, key: string, value: unknown): void {
  if (key === "children") return;

  // Events (deferred, because cleanup depends on render scope)
  if (key.startsWith("on")) return;

  if (key === "ref") {
    addBinding(el, () => setRef(el, value));
    return;
  }

  if (key === "class" || key === "className") {
    setAttr(el, "class", value);
    return;
  }

  if (key === "style") {
    setStyle(el as HTMLElement, value);
    return;
  }

  if (key.startsWith("data-") || key.startsWith("aria-")) {
    setAttr(el, key, value);
    return;
  }

  // Prefer DOM properties when they exist on the element
  if (key in (el as any)) {
    setDomProp(el as any, key, value);
    return;
  }

  setAttr(el, key, value);
}

export function setProps(el: Element, props: Record<string, unknown> | null | undefined): void {
  if (!props) return;

  for (const [key, raw] of Object.entries(props)) {
    if (key.startsWith("on")) {
      addBinding(el, () => {
        setEvent(el, key, raw);
        const eventName = key.slice(2);
        const domEvent = eventName.charAt(0).toLowerCase() + eventName.slice(1);
        const listener = raw as any as EventListener;
        onCleanup(() => el.removeEventListener(domEvent, listener));
      });
      continue;
    }

    if (typeof raw === "function" && key !== "ref") {
      addBinding(el, () => createReactiveEffect(() => setProp(el, key, (raw as any)())));
    } else {
      setProp(el, key, raw);
    }
  }
}

