import { Button } from "../button/button";
import { cn } from "../../utils/cn";
import { iconButtonStyles } from "./icon-button.styles";
import type { IconButtonProps } from "./icon-button.types";

const isDev = (): boolean => {
  const env = (globalThis as any)?.process?.env?.NODE_ENV;
  return env !== "production";
};

export const IconButton = (props: IconButtonProps) => {
  const ariaLabel = (props as any)["aria-label"] as string | undefined;
  if (isDev() && (!ariaLabel || ariaLabel.trim().length === 0)) {
    throw new Error(
      'IconButton: проп \"aria-label\" обязателен (например: IconButton({ \"aria-label\": \"Close\", children: ... })).',
    );
  }

  const { size = "md", className, class: klass, ...rest } = props as any;

  return Button({
    ...rest,
    size: "md",
    className: cn(iconButtonStyles({ size } as any), className, klass),
    children: props.children,
  } as any);
};

