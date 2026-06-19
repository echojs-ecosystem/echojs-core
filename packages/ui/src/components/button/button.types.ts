import type { Child, Props } from "@echojs-ecosystem/hyperdom";

import type { UIComponentProps } from "../../core/props-types";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "dangerSoft"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

/** Props that exist only on `Button`, not on `<button>`. */
export type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  fullWidth?: boolean;
  iconOnly?: boolean;
  pending?: boolean;
  /** @deprecated Use `pending`. */
  loading?: boolean;
  leftIcon?: Child;
  rightIcon?: Child;
  spinner?: Child;
};

/** Native `<button>` only. For navigation, use `Link` (planned). */
export type ButtonProps = UIComponentProps<"button", ButtonOwnProps, "disabled" | "children"> & {
  disabled?: boolean;
  children?: Child;
  type?: "button" | "submit" | "reset";
};

export const BUTTON_OWN_KEYS = [
  "variant",
  "size",
  "radius",
  "fullWidth",
  "iconOnly",
  "pending",
  "loading",
  "leftIcon",
  "rightIcon",
  "spinner",
] as const satisfies readonly (keyof ButtonOwnProps)[];
