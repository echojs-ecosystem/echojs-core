import { createUIComponent } from "../../core/component";
import { Button } from "../button/button";
import { iconButtonStyles } from "./icon-button.styles";
import type { IconButtonProps } from "./icon-button.types";

const isDev = (): boolean => {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV;
  return env !== "production";
};

export const IconButton = createUIComponent<IconButtonProps, HTMLElement>({
  name: "IconButton",
  defaultTag: "button",
  defaultProps: {
    variant: "ghost",
    size: "md",
  },
  variants: (options) => iconButtonStyles(options as Record<string, unknown>),
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
