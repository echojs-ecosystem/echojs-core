import { h, type Child } from "@echojs/hyperdom";
import { createUIComponent } from "../../core/component";
import { composeEventHandlers } from "../../utils/compose-event-handlers";
import { dataDisabled } from "../../utils/data-attributes";
import { buttonStyles } from "./button.styles";
import type { ButtonProps } from "./button.types";

const preventWhenDisabled = (disabled: boolean) => (event: Event) => {
  if (!disabled) return;
  event.preventDefault();
};

export const Button = createUIComponent<ButtonProps, HTMLElement>({
  name: "Button",
  defaultTag: "button",
  defaultProps: {
    as: "button",
    variant: "primary",
    size: "md",
    rounded: true,
  },
  variants: (options) => buttonStyles(options),
  render: ({ props, headless }) => {
    const {
      as = "button",
      isLoading = false,
      isDisabled: isDisabledProp = false,
      type,
      children,
      ...rest
    } = props;

    const disabled = Boolean(isDisabledProp || isLoading);

    const ariaDisabled = disabled ? "true" : undefined;
    const ariaBusy = isLoading ? "true" : undefined;

    const baseDataDisabled = dataDisabled(disabled);
    const dataLoading = isLoading ? { "data-loading": "" } : {};

    if (as === "a") {
      const onClick = composeEventHandlers(
        rest["on:click"] as ((e: MouseEvent) => void) | undefined,
        preventWhenDisabled(disabled) as any,
        { checkDefaultPrevented: true },
      );

      return h(
        "a",
        {
          ...rest,
          ...baseDataDisabled,
          ...dataLoading,
          "aria-disabled": ariaDisabled,
          "aria-busy": ariaBusy,
          "on:click": onClick,
        } as any,
        children as Child,
      );
    }

    return h(
      "button",
      {
        ...rest,
        ...baseDataDisabled,
        ...dataLoading,
        type: type ?? "button",
        disabled,
        "aria-disabled": ariaDisabled,
        "aria-busy": ariaBusy,
      } as any,
      children as Child,
    );
  },
});

