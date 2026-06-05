import type { Child, Props } from "@echojs-ecosystem/hyperdom";
import type { UIComponentBaseProps } from "../../core/types";

export type LabelProps = UIComponentBaseProps &
  Omit<Props<HTMLLabelElement>, "children"> & {
    for?: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;

    requiredIndicator?: Child;
    optionalIndicator?: Child;

    children?: Child;
  };

