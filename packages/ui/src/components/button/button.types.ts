import type { Child, Props } from "@echojs-ecosystem/hyperdom";
import type { UIComponentBaseProps } from "../../core/types";

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

/** Native `<button>` only. For navigation, use `Link` (planned). */
export type ButtonProps = UIComponentBaseProps &
  Omit<Props<HTMLButtonElement>, "children" | "disabled"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    radius?: ButtonRadius;

    fullWidth?: boolean;
    /** Icon-only square layout (HeroUI `isIconOnly`). */
    iconOnly?: boolean;

    /** Pending / loading state (HeroUI `isPending`). */
    pending?: boolean;
    /** @deprecated Use `pending`. */
    loading?: boolean;

    disabled?: boolean;

    type?: "button" | "submit" | "reset";

    leftIcon?: Child;
    rightIcon?: Child;
    spinner?: Child;

    children?: Child;
  };
