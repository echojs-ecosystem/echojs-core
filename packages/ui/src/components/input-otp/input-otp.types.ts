import type { InputFieldOwnProps, InputFieldProps } from "../input-shared/field.types";
import { INPUT_FIELD_OWN_KEYS } from "../input-shared/field.types";

export type InputOtpOwnProps = Omit<InputFieldOwnProps, "startContent" | "endContent"> & {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  autocomplete?: "one-time-code" | string;
  disabled?: boolean;
  required?: boolean;
};

export type InputOtpProps = Omit<
  InputFieldProps,
  "startContent" | "endContent" | "placeholder" | "value" | "defaultValue"
> &
  InputOtpOwnProps;

export const INPUT_OTP_OWN_KEYS = [
  ...INPUT_FIELD_OWN_KEYS.filter((key) => key !== "startContent" && key !== "endContent"),
  "length",
  "value",
  "defaultValue",
  "onValueChange",
  "autocomplete",
  "disabled",
  "required",
] as const;
