import type { Child } from "@echojs-ecosystem/hyperdom";

import type { UIComponentProps } from "../../core/props-types";

export type InputVariant = "outline" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export type InputFieldOwnProps = {
  invalid?: boolean;
  size?: InputSize;
  variant?: InputVariant;
  startContent?: Child;
  endContent?: Child;
  /** Alias normalized to `readonly` in render. */
  readOnly?: boolean;
};

/** Shared props for text-field controls (Input, InputMask, …). */
export type InputFieldProps = UIComponentProps<
  "input",
  InputFieldOwnProps,
  "children" | "type" | "value" | "defaultValue" | "size"
> & {
  value?: string;
  defaultValue?: string;
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
};

export const INPUT_FIELD_OWN_KEYS = [
  "variant",
  "size",
  "startContent",
  "endContent",
  "invalid",
  "readOnly",
] as const satisfies readonly (keyof InputFieldOwnProps)[];
