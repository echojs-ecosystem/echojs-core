import { createUIComponent } from "../../core/component";
import { Button } from "../button/button";
import { BUTTON_OWN_KEYS } from "../button/button.types";
import { iconButtonStyles } from "./icon-button.styles";
import { ICON_BUTTON_OWN_KEYS, type IconButtonOwnProps } from "./icon-button.types";

const isDev = (): boolean => {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  return env !== "production";
};

export const IconButton = createUIComponent<"button", IconButtonOwnProps>({
  name: "IconButton",
  tag: "button",
  ownKeys: [...BUTTON_OWN_KEYS, ...ICON_BUTTON_OWN_KEYS],
  defaultProps: {
    variant: "ghost",
    size: "md",
  },
  variants: iconButtonStyles,
  render: ({ props, className, headless }) => {
    const ariaLabel = props["aria-label"];
    if (isDev() && (!ariaLabel || String(ariaLabel).trim().length === 0)) {
      throw new Error(
        'IconButton: prop "aria-label" is required (e.g. IconButton({ "aria-label": "Close", children: ... })).',
      );
    }

    const { size: _iconSize, children, ...rest } = props;

    return Button({
      ...rest,
      headless,
      size: "md",
      className,
      children,
    });
  },
});
