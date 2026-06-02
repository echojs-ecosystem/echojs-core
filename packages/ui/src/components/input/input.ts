import { createUIComponent } from "../../core/component";
import { inputStyles } from "../input-shared/input.styles";
import { pickInputDomProps, renderInputField } from "../input-shared/render-input-field";
import type { InputProps } from "./input.types";

export const Input = createUIComponent<InputProps, HTMLInputElement>({
  name: "Input",
  defaultTag: "input",
  defaultProps: {
    type: "text",
    variant: "outline",
    size: "md",
  },
  variants: (options) => inputStyles.wrapper(options as Record<string, unknown>),
  render: ({ props, headless, className }) => {
    const {
      startContent,
      endContent,
      invalid,
      disabled,
      readonly: readonlyProp,
      readOnly,
      required,
      variant,
      size,
      ...rest
    } = props as InputProps & Record<string, unknown>;

    const readonly = readonlyProp ?? readOnly;
    const domProps = pickInputDomProps(rest as Record<string, unknown>);

    return renderInputField({
      headless,
      className,
      variant: variant as InputProps["variant"],
      size: size as InputProps["size"],
      disabled,
      invalid,
      readonly,
      required,
      startContent,
      endContent,
      inputProps: domProps,
    });
  },
});
