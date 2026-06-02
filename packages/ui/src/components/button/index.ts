export { Button } from "./button";
export { defaultButtonSpinner } from "./button-spinner";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonRadius,
} from "./button.types";
export { buttonStyles } from "./button.styles";
import type { VariantProps } from "../../theme/variants";
import { buttonStyles } from "./button.styles";

export type ButtonVariantProps = VariantProps<typeof buttonStyles>;
