export { Checkbox } from "./checkbox";
export type { CheckboxProps, CheckboxSize } from "./checkbox.types";
export { checkboxStyles } from "./checkbox.styles";
import type { VariantProps } from "../../theme/variants";
import { checkboxStyles } from "./checkbox.styles";

export type CheckboxVariantProps = VariantProps<typeof checkboxStyles>;
