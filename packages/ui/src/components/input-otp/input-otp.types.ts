import type { InputFieldProps } from "../input-shared/field.types";

export type InputOtpProps = Omit<
  InputFieldProps,
  "startContent" | "endContent" | "placeholder" | "value" | "defaultValue"
> & {
  length?: number;
  value?: string;
  defaultValue?: string;
  autocomplete?: "one-time-code" | string;
  onValueChange?: (value: string) => void;
};
