import type { Child, Props } from "@echojs/hyperdom";
import type { UIComponentBaseProps } from "../../core/types";

export type InputVariant = "outline" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

/** Shared props for text-field controls (Input, InputMask, …). */
export type InputFieldProps = UIComponentBaseProps &
  Omit<Props<HTMLInputElement>, "children" | "type" | "value" | "defaultValue" | "size"> & {
    value?: string;
    defaultValue?: string;

    name?: string;
    placeholder?: string;
    autocomplete?: string;

    disabled?: boolean;
    readonly?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;

    size?: InputSize;
    variant?: InputVariant;

    startContent?: Child;
    endContent?: Child;
  };
