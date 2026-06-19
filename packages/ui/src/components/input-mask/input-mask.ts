import { createUIComponent } from "../../core/component";
import { attachInputMask } from "../../utils/input-mask";
import { inputStyles } from "../input-shared/input.styles";
import { renderInputField } from "../input-shared/render-input-field";
import { INPUT_MASK_OWN_KEYS, type InputMaskOwnProps } from "./input-mask.types";

export const InputMask = createUIComponent<"input", InputMaskOwnProps>({
  name: "InputMask",
  tag: "input",
  ownKeys: INPUT_MASK_OWN_KEYS,
  defaultProps: {
    mask: "phone",
    variant: "outline",
    size: "md",
  },
  variants: inputStyles.wrapper,
  render: ({ props, domProps, headless, className }) => {
    const {
      mask,
      onMaskValueChange,
      onInput,
      readonly: readonlyProp,
      readOnly,
      variant,
      size,
      disabled,
      invalid,
      required,
      startContent,
      endContent,
    } = props;

    const readonly = Boolean(readonlyProp ?? readOnly);
    let disposeMask: (() => void) | undefined;

    const inputRef = (element: HTMLInputElement | null) => {
      disposeMask?.();
      disposeMask = undefined;
      if (!element) return;

      disposeMask = attachInputMask(element, {
        mask,
        onValueChange: onMaskValueChange,
      });

      const userRef = domProps.ref;
      if (typeof userRef === "function") userRef(element);
    };

    const { ref: _ref, ...inputRest } = domProps;

    return renderInputField({
      headless,
      className,
      variant,
      size,
      disabled,
      invalid,
      readonly,
      required,
      startContent,
      endContent,
      inputRef,
      inputProps: {
        ...inputRest,
        type: "text",
        inputMode: "numeric",
        onInput,
      },
    });
  },
});
