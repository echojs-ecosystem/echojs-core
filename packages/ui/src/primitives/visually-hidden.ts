import { h } from "@echojs/hyperdom";
import type { Child } from "@echojs/hyperdom";
import type { UIComponentBaseProps } from "../core/types";
import { createUIComponent } from "../core/component";

export type VisuallyHiddenProps = UIComponentBaseProps & {
  as?: keyof HTMLElementTagNameMap;
};

const defaultProps: Partial<VisuallyHiddenProps> = {
  as: "span",
};

/**
 * Hides content visually while keeping it available to assistive tech.
 */
export const VisuallyHidden = createUIComponent<VisuallyHiddenProps>({
  name: "VisuallyHidden",
  defaultTag: "span",
  defaultProps: {
    ...defaultProps,
    className: "sr-only",
  },
  render: ({ props, headless, className }) => {
    const { as = "span", children, ...rest } = props;
    const classes = headless ? undefined : className ?? "sr-only";
    return h(as, { ...rest, className: classes, class: classes }, children as Child);
  },
});
