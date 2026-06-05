import type { Child } from "@echojs-ecosystem/hyperdom";

export type PortalProps = {
  children?: Child;
  /** Target container. Defaults to `document.body`. */
  container?: Element;
};

const appendChild = (host: Element, child: Child): void => {
  if (child == null || child === false || child === true) return;

  if (typeof child === "string" || typeof child === "number") {
    host.appendChild(document.createTextNode(String(child)));
    return;
  }

  if (child instanceof Node) {
    host.appendChild(child);
    return;
  }

  if (Array.isArray(child)) {
    for (const item of child) appendChild(host, item);
  }
};

/**
 * Renders children into a portal container (defaults to `document.body`).
 */
export const Portal = (props: PortalProps): Child => {
  const container = props.container ?? document.body;
  const host = document.createElement("div");
  container.appendChild(host);

  if (props.children !== undefined) {
    appendChild(host, props.children);
  }

  return host;
};
