import { h } from "@echojs-ecosystem/hyperdom";
import { createUIComponent } from "../../core/component";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { textareaStyles } from "./textarea.styles";
import type { TextareaProps } from "./textarea.types";

export const Textarea = createUIComponent<TextareaProps, HTMLTextAreaElement>({
  name: "Textarea",
  defaultTag: "textarea",
  defaultProps: {
    variant: "outline",
    size: "md",
    resize: "vertical",
  },
  variants: (options) => textareaStyles(options as any),
  render: ({ props, headless, className }) => {
    const { invalid, disabled, readonly, required, ...rest } = props as any;

    const ariaInvalid = invalid ? "true" : (rest["aria-invalid"] as any);
    const dataReadonly = readonly ? { "data-readonly": "" } : {};

    return h("textarea", {
      ...rest,
      disabled,
      readonly,
      required,
      "aria-invalid": ariaInvalid,
      ...dataDisabled(Boolean(disabled)),
      ...dataInvalid(Boolean(invalid)),
      ...dataReadonly,
      className: headless ? undefined : className,
      class: headless ? undefined : className,
    });
  },
});

