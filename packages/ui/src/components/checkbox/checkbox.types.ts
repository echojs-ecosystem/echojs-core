import type { Props } from "@echojs-ecosystem/hyperdom";

import type { UIComponentProps } from "../../core/props-types";

export type CheckboxSize = "sm" | "md" | "lg";

export type CheckboxOwnProps = {
  indeterminate?: boolean;
  invalid?: boolean;
  size?: CheckboxSize;
};

export type CheckboxProps = UIComponentProps<
  "input",
  CheckboxOwnProps,
  "children" | "type" | "checked" | "defaultChecked" | "size"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
};

export const CHECKBOX_OWN_KEYS = ["size", "indeterminate", "invalid"] as const satisfies readonly (keyof CheckboxOwnProps)[];
