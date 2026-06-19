import { h, type Child } from "@echojs-ecosystem/hyperdom";

import { createUIComponent } from "../../core/component";
import { composeEventHandlers } from "../../utils/compose-event-handlers";
import { dataDisabled, dataPending } from "../../utils/data-attributes";
import { defaultButtonSpinner } from "./button-spinner";
import { buttonStyles } from "./button.styles";
import { BUTTON_OWN_KEYS, type ButtonOwnProps, type ButtonProps, type ButtonSize } from "./button.types";

const wrapIcon = (node: Child): Child =>
  h(
    "span",
    { "data-btn-icon": "", className: "inline-flex shrink-0", "aria-hidden": "true" } as const,
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

export const Button = createUIComponent<"button", ButtonOwnProps>({
  name: "Button",
  tag: "button",
  ownKeys: BUTTON_OWN_KEYS,
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
  render: ({ props, domProps, className, headless }) => {
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
    } = props;

    const pending = Boolean(pendingProp || loadingProp);
    const inactive = Boolean(disabledProp || pending);
    const visualClass = headless ? undefined : className;

    const handleClick = composeEventHandlers(
      onClick,
      inactive ? (event) => event.preventDefault() : undefined,
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
      },
      buildContent({
        pending,
        size,
        leftIcon,
        rightIcon,
        spinner,
        children,
      }),
    );
  },
});
