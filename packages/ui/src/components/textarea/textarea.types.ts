import type { Props } from "@echojs/hyperdom";
import type { UIComponentBaseProps } from "../../core/types";

export type TextareaVariant = "outline" | "filled" | "ghost";
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export type TextareaProps = UIComponentBaseProps &
  Omit<Props<HTMLTextAreaElement>, "children" | "value" | "defaultValue"> & {
    value?: string;
    defaultValue?: string;

    name?: string;
    placeholder?: string;

    rows?: number;
    cols?: number;

    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    invalid?: boolean;

    resize?: TextareaResize;

    size?: TextareaSize;
    variant?: TextareaVariant;
  };

