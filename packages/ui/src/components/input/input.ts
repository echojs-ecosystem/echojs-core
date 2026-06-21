import { createUIComponent } from "../../core/component";
import { asOptionalBool } from "../input-shared/as-optional-bool";
import {
  INPUT_FIELD_OWN_KEYS,
  type InputFieldOwnProps,
} from "../input-shared/field.types";
import { inputStyles } from "../input-shared/input.styles";
import { renderInputField } from "../input-shared/render-input-field";

export const Input = createUIComponent<"input", InputFieldOwnProps, "children" | "size">({
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
      readOnly,
      required,
      variant,
      size,
      type,
    } = props;

    return renderInputField({
      headless,
      className,
      variant,
      size,
      disabled: asOptionalBool(disabled),
      invalid: asOptionalBool(invalid),
      readonly: asOptionalBool(readOnly),
      required: asOptionalBool(required),
      startContent,
      endContent,
      inputProps: { ...domProps, type: type ?? "text" },
    });
  },
});
