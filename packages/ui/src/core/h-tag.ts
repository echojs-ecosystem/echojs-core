import { h, type Child, type Props } from "@echojs-ecosystem/hyperdom";

import type { ElementForTag } from "./props-types";

/** Typed `h()` for intrinsic tags — avoids overload ambiguity in component renderers. */
export const hTag = <TTag extends keyof HTMLElementTagNameMap>(
  tag: TTag,
  props?: Props<ElementForTag<TTag>> | null,
  children?: Child,
): Child => {
  const render = h as (
    tag: TTag,
    props?: Props<ElementForTag<TTag>> | null,
    children?: Child,
  ) => Child;

  return render(tag, props, children);
};
