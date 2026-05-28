import type { Child, Props } from "@echojs/hyperdom";
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

