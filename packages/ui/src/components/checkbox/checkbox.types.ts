import type { Props } from "@echojs-ecosystem/hyperdom";
import type { UIComponentBaseProps } from "../../core/types";

export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxProps = UIComponentBaseProps &
  Omit<Props<HTMLInputElement>, "children" | "type" | "checked" | "defaultChecked" | "size"> & {
    /** Controlled checked state. */
    checked?: boolean;
    /** Uncontrolled initial state. */
    defaultChecked?: boolean;

    indeterminate?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    required?: boolean;

    size?: CheckboxSize;

    name?: string;
    value?: string;
  };
