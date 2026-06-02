import type { InputFieldProps } from "../input-shared/field.types";
import type { MaskPattern } from "../../utils/input-mask";

export type InputMaskProps = Omit<InputFieldProps, "type" | "value" | "defaultValue"> & {
  mask: MaskPattern;
  value?: string;
  defaultValue?: string;
  onMaskValueChange?: (value: { masked: string; unmasked: string }) => void;
};
