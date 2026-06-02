import { h, type Child } from "@echojs/hyperdom";

import { createUIComponent } from "../../core/component";
import { composeEventHandlers } from "../../utils/compose-event-handlers";
import { dataDisabled, dataPending } from "../../utils/data-attributes";
import { defaultButtonSpinner } from "./button-spinner";
import { buttonStyles } from "./button.styles";
import type { ButtonProps, ButtonSize } from "./button.types";

const INTERNAL_KEYS = new Set([
  "variant",
  "size",
  "radius",
  "fullWidth",
  "iconOnly",
  "pending",
  "loading",
  "disabled",
  "leftIcon",
  "rightIcon",
  "spinner",
  "headless",
  "children",
  "onClick",
]);

const pickDomProps = (props: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!INTERNAL_KEYS.has(key)) out[key] = value;
  }
  return out;
};

const wrapIcon = (node: Child): Child =>
  h(
    "span",
    { "data-btn-icon": "", className: "inline-flex shrink-0", "aria-hidden": "true" } as any,
    node,
  );

const buildContent = (options: {
  pending: boolean;
  size: ButtonSize;
  leftIcon?: Child;
  rightIcon?: Child;
  spinner?: Child;
  children?: Child;
}): Child => {
  const { pending, size, leftIcon, rightIcon, spinner, children } = options;
  const parts: Child[] = [];

  if (pending) {
    parts.push(spinner ?? defaultButtonSpinner(size));
  } else if (leftIcon) {
    parts.push(wrapIcon(leftIcon));
  }

  if (children !== undefined && children !== null && children !== false) {
    parts.push(children);
  }

  if (!pending && rightIcon) {
    parts.push(wrapIcon(rightIcon));
  }

  if (parts.length === 1) return parts[0]!;
  return parts;
};

export const Button = createUIComponent<ButtonProps, HTMLButtonElement>({
  name: "Button",
  defaultTag: "button",
  defaultProps: {
    variant: "primary",
    size: "md",
    radius: "full",
    type: "button",
    fullWidth: false,
    iconOnly: false,
    pending: false,
    loading: false,
    disabled: false,
  },
  variants: buttonStyles,
  render: ({ props, className, headless }) => {
    const {
      pending: pendingProp,
      loading: loadingProp = false,
      disabled: disabledProp = false,
      type,
      leftIcon,
      rightIcon,
      spinner,
      children,
      size = "md",
      onClick,
      ...rest
    } = props as ButtonProps & Record<string, unknown>;

    const pending = Boolean(pendingProp || loadingProp);
    const inactive = Boolean(disabledProp || pending);

    const content = buildContent({
      pending,
      size: size as ButtonSize,
      leftIcon,
      rightIcon,
      spinner,
      children,
    });

    const domProps = pickDomProps(rest as Record<string, unknown>);
    const visualClass = headless ? undefined : className;

    const handleClick = composeEventHandlers(
      onClick as ((e: MouseEvent) => void) | undefined,
      inactive ? (event: MouseEvent) => event.preventDefault() : undefined,
      { checkDefaultPrevented: true },
    );

    return h(
      "button",
      {
        ...domProps,
        type: type ?? "button",
        disabled: inactive,
        className: visualClass,
        class: visualClass,
        ...dataDisabled(inactive),
        ...dataPending(pending),
        "aria-disabled": inactive ? "true" : undefined,
        "aria-busy": pending ? "true" : undefined,
        onClick: inactive ? handleClick : onClick,
      } as any,
      content as Child,
    );
  },
});
