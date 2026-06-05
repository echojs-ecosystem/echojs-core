import type { Props } from "@echojs-ecosystem/hyperdom";
import type { InputFieldProps } from "../input-shared/field.types";

export type { InputSize, InputVariant } from "../input-shared/field.types";

export type InputProps = InputFieldProps &
  Omit<Props<HTMLInputElement>, keyof InputFieldProps> & {
    type?: "text" | "email" | "url" | "tel" | "search" | "password";
  };
