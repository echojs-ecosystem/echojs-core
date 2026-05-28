import type { Child, Props } from "@echojs/hyperdom";
import type { UIComponentBaseProps } from "../../core/types";

export type InputVariant = "outline" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export type InputProps = UIComponentBaseProps &
  Omit<Props<HTMLInputElement>, "children" | "type" | "value" | "defaultValue" | "size"> & {
    value?: string;
    defaultValue?: string;

    type?: "text" | "email" | "url" | "tel" | "search" | "password";

    name?: string;
    placeholder?: string;
    autocomplete?: string;

    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    invalid?: boolean;

    size?: InputSize;
    variant?: InputVariant;

    startContent?: Child;
    endContent?: Child;
  };

