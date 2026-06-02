import type { Child } from "@echojs/hyperdom";

export type FieldContext = {
  id: string;
  inputId: string;
  labelId: string;
  descriptionId?: string;
  errorId?: string;

  invalid: boolean;
  disabled: boolean;
  required: boolean;

  inputProps: {
    id: string;
    "aria-labelledby": string;
    "aria-describedby"?: string;
    "aria-invalid"?: "true";
    "aria-required"?: "true";
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
  };

  labelProps: {
    id: string;
    for: string;
    required?: boolean;
    disabled?: boolean;
    invalid?: boolean;
  };

  descriptionProps?: {
    id: string;
  };

  errorProps?: {
    id: string;
    role: "alert";
  };
};

export type FieldProps = {
  id?: string;

  label?: Child;
  description?: Child;
  error?: Child;

  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;

  children: Child | ((ctx: FieldContext) => Child);

  headless?: boolean;
  class?: unknown;
  className?: unknown;
};

