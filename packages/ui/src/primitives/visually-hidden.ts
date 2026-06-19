import { h, type Child } from "@echojs-ecosystem/hyperdom";

import { createUIComponent } from "../core/component";
import type { UIComponentProps } from "../core/props-types";

export type VisuallyHiddenOwnProps = {
  as?: keyof HTMLElementTagNameMap;
};

export type VisuallyHiddenProps = UIComponentProps<"span", VisuallyHiddenOwnProps>;

export const VISUALLY_HIDDEN_OWN_KEYS = ["as"] as const satisfies readonly (keyof VisuallyHiddenOwnProps)[];

/**
 * Hides content visually while keeping it available to assistive tech.
 */
export const VisuallyHidden = createUIComponent<"span", VisuallyHiddenOwnProps>({
  name: "VisuallyHidden",
  tag: "span",
  ownKeys: VISUALLY_HIDDEN_OWN_KEYS,
  defaultProps: {
    as: "span",
    className: "sr-only",
  },
  render: ({ props, domProps, headless, className }) => {
    const tag = props.as ?? "span";
    const classes = headless ? undefined : (className ?? "sr-only");

    return h(tag, { ...domProps, className: classes, class: classes }, props.children as Child);
  },
});
