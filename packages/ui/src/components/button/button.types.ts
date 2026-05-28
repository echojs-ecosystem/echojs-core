import type { Child, Props } from "@echojs/hyperdom";
import type { UIComponentBaseProps } from "../../core/types";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = UIComponentBaseProps &
  Omit<Props<HTMLButtonElement>, "children"> &
  Omit<Props<HTMLAnchorElement>, "children"> & {
    as?: "button" | "a";

    variant?: ButtonVariant;
    size?: ButtonSize;
    rounded?: boolean;

    isLoading?: boolean;
    isDisabled?: boolean;

    type?: "button" | "submit" | "reset";
    children?: Child;
  };

