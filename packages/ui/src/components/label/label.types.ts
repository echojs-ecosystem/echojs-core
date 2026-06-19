import type { Child } from "@echojs-ecosystem/hyperdom";

import type { UIComponentProps } from "../../core/props-types";

export type LabelOwnProps = {
  for?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  requiredIndicator?: Child;
  optionalIndicator?: Child;
};

export type LabelProps = UIComponentProps<"label", LabelOwnProps>;

export const LABEL_OWN_KEYS = [
  "for",
  "required",
  "disabled",
  "invalid",
  "requiredIndicator",
  "optionalIndicator",
] as const satisfies readonly (keyof LabelOwnProps)[];
