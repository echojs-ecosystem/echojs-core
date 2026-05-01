import type { Child } from "./types";
import { render } from "./render";

export interface MountResult {
  node: HTMLElement;
  dispose: () => void;
}

/**
 * Mounts a view into a container element.
 *
 * Creates a container `<div>` by default and returns `{ node, dispose }`.
 */
export const mount = (
  view: Child,
  options?: { container?: HTMLElement; className?: string },
): MountResult => {
  const node = options?.container ?? document.createElement("div");
  if (options?.className) node.className = options.className;

  const dispose = render(view, node);

  // Optional interop with @echojs-ecosystem/core unmount() mechanism.
  (node as any).__echoDispose = dispose;

  return { node, dispose };
};
