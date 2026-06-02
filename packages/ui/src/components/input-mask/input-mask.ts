import { createUIComponent } from "../../core/component";
import { attachInputMask } from "../../utils/input-mask";
import type { MaskPattern } from "../../utils/input-mask";
import { inputStyles } from "../input-shared/input.styles";
import { pickInputDomProps, renderInputField } from "../input-shared/render-input-field";
import type { InputSize, InputVariant } from "../input-shared/field.types";
import type { InputMaskProps } from "./input-mask.types";

export const InputMask = createUIComponent<InputMaskProps, HTMLInputElement>({
  name: "InputMask",
  defaultTag: "input",
  defaultProps: {
    mask: "phone",
    variant: "outline",
    size: "md",
  },
  variants: (options) => inputStyles.wrapper(options as Record<string, unknown>),
  render: ({ props, headless, className }) => {
    const p = props as unknown as Record<string, unknown>;
    const mask = p.mask as MaskPattern;
    const onMaskValueChange = p.onMaskValueChange as InputMaskProps["onMaskValueChange"];
    const onInput = p.onInput as InputMaskProps["onInput"];

    const domProps = pickInputDomProps(p);
    const readonly = Boolean(p.readonly ?? p.readOnly);

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
      variant: p.variant as InputVariant | undefined,
      size: p.size as InputSize | undefined,
      disabled: p.disabled as boolean | undefined,
      invalid: p.invalid as boolean | undefined,
      readonly,
      required: p.required as boolean | undefined,
      startContent: p.startContent as InputMaskProps["startContent"],
      endContent: p.endContent as InputMaskProps["endContent"],
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
