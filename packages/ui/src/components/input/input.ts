import { createUIComponent } from "../../core/component";
import { INPUT_FIELD_OWN_KEYS, type InputFieldOwnProps } from "../input-shared/field.types";
import { inputStyles } from "../input-shared/input.styles";
import { renderInputField } from "../input-shared/render-input-field";

export const Input = createUIComponent<"input", InputFieldOwnProps>({
  name: "Input",
  tag: "input",
  ownKeys: INPUT_FIELD_OWN_KEYS,
  defaultProps: {
    type: "text",
    variant: "outline",
    size: "md",
  },
  variants: inputStyles.wrapper,
  render: ({ props, domProps, headless, className }) => {
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
    } = props;

    return renderInputField({
      headless,
      className,
      variant,
      size,
      disabled,
      invalid,
      readonly: readonlyProp ?? readOnly,
      required,
      startContent,
      endContent,
      inputProps: { ...domProps, type: props.type ?? "text" },
    });
  },
});
