import { h } from "../../hyperscript/h";
import type { Child } from "../../core/types";

/**
 * Wraps content and toggles visibility with CSS `display` (keeps DOM mounted).
 *
 * Visible: `display: contents` (no extra layout box).
 * Hidden: `display: none`.
 */
export const displayRegion = (visible: () => boolean, render: () => Child): Child =>
  h(
    "span",
    {
      style: () => (visible() ? { display: "contents" } : { display: "none" }),
    },
    render(),
  );
