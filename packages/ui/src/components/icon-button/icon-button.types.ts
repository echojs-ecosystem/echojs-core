import type { Child } from "@echojs/hyperdom";
import type { ButtonProps } from "../button/button.types";

export type IconButtonSize = "xs" | "sm" | "md" | "lg";

export type IconButtonProps = Omit<ButtonProps, "size" | "children"> & {
  size?: IconButtonSize;
  children: Child;
};

