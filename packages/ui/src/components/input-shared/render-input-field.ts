import { h, type Child } from "@echojs-ecosystem/hyperdom";

import { cn } from "../../utils/cn";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { inputStyles } from "./input.styles";
import type { InputSize, InputVariant } from "./field.types";

export const INPUT_INTERNAL_KEYS = new Set([
  "variant",
  "size",
  "startContent",
  "endContent",
  "invalid",
  "disabled",
  "readonly",
  "readOnly",
  "required",
  "headless",
  "children",
  "className",
  "class",
]);

export const pickInputDomProps = (props: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!INPUT_INTERNAL_KEYS.has(key)) out[key] = value;
  }
  return out;
};

export type RenderInputFieldOptions = {
  headless: boolean;
  className?: string;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  invalid?: boolean;
  readonly?: boolean;
  required?: boolean;
  describedBy?: string;
  startContent?: Child;
  endContent?: Child;
  inputProps: Record<string, unknown>;
  wrapperProps?: Record<string, unknown>;
  inputRef?: (element: HTMLInputElement | null) => void;
};

export const renderInputField = (options: RenderInputFieldOptions): Child => {
  const {
    headless,
    className,
    variant = "outline",
    size = "md",
    disabled,
    invalid,
    readonly,
    required,
    describedBy,
    startContent,
    endContent,
    inputProps,
    wrapperProps,
    inputRef,
  } = options;

  const ariaInvalid = invalid ? "true" : (inputProps["aria-invalid"] as string | undefined);
  const dataReadonly = readonly ? { "data-readonly": "" } : {};
  const slotOptions = { variant, size };
  const slots = inputStyles;

  const nativeInputProps = {
    ...inputProps,
    disabled,
    readonly,
    required,
    "aria-invalid": ariaInvalid,
    "aria-describedby": describedBy ?? inputProps["aria-describedby"],
    ref: inputRef ?? inputProps.ref,
  };

  if (!startContent && !endContent) {
    const visualClass = headless ? undefined : className;
    return h("input", {
      ...nativeInputProps,
      ...dataDisabled(Boolean(disabled)),
      ...dataInvalid(Boolean(invalid)),
      ...dataReadonly,
      className: visualClass,
      class: visualClass,
    } as any);
  }

  const wrapperClass = headless ? undefined : cn(slots.wrapper(slotOptions), className);
  const inputClass = headless ? undefined : slots.input(slotOptions);

  return h(
    "div",
    {
      ...wrapperProps,
      className: wrapperClass,
      class: wrapperClass,
      ...dataDisabled(Boolean(disabled)),
      ...dataInvalid(Boolean(invalid)),
      ...dataReadonly,
    } as any,
    [
      startContent
        ? h(
            "span",
            { "data-input-slot": "start", className: headless ? undefined : slots.start() },
            startContent,
          )
        : null,
      h("input", {
        ...nativeInputProps,
        className: inputClass,
        class: inputClass,
      } as any),
      endContent
        ? h("span", { "data-input-slot": "end", className: headless ? undefined : slots.end() }, endContent)
        : null,
    ],
  );
};
