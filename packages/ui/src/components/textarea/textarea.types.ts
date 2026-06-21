import type { UIComponentProps } from "../../core/props-types";

export type TextareaVariant = "outline" | "filled" | "ghost";
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

export type TextareaOwnProps = {
  invalid?: boolean;
  resize?: TextareaResize;
  size?: TextareaSize;
  variant?: TextareaVariant;
  readOnly?: boolean;
};

export type TextareaProps = UIComponentProps<"textarea", TextareaOwnProps, "children" | "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  /** @deprecated Use `readOnly`. */
  readonly?: boolean;
  required?: boolean;
};

export const TEXTAREA_OWN_KEYS = ["invalid", "resize", "size", "variant", "readOnly"] as const satisfies readonly (keyof TextareaOwnProps)[];
