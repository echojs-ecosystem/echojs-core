import type { InputFieldOwnProps, InputFieldProps } from "../input-shared/field.types";
import type { MaskPattern } from "../../utils/input-mask";
import { INPUT_FIELD_OWN_KEYS } from "../input-shared/field.types";

export type InputMaskOwnProps = InputFieldOwnProps & {
  mask: MaskPattern;
  onMaskValueChange?: (value: { masked: string; unmasked: string }) => void;
};

export type InputMaskProps = Omit<InputFieldProps, "type" | "value" | "defaultValue"> & InputMaskOwnProps;

export const INPUT_MASK_OWN_KEYS = [...INPUT_FIELD_OWN_KEYS, "mask", "onMaskValueChange"] as const;
