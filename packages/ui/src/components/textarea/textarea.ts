import { h } from "@echojs-ecosystem/hyperdom";

import { createUIComponent } from "../../core/component";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { textareaStyles } from "./textarea.styles";
import { TEXTAREA_OWN_KEYS, type TextareaOwnProps } from "./textarea.types";

export const Textarea = createUIComponent<"textarea", TextareaOwnProps>({
  name: "Textarea",
  tag: "textarea",
  ownKeys: TEXTAREA_OWN_KEYS,
  defaultProps: {
    variant: "outline",
    size: "md",
    resize: "vertical",
  },
  variants: textareaStyles,
  render: ({ props, domProps, className, headless }) => {
    const { invalid, disabled, readonly, required } = props;
    const visualClass = headless ? undefined : className;

    return h("textarea", {
      ...domProps,
      disabled,
      readonly,
      required,
      "aria-invalid": invalid ? "true" : domProps["aria-invalid"],
      ...dataDisabled(Boolean(disabled)),
      ...dataInvalid(Boolean(invalid)),
      ...(readonly ? { "data-readonly": "" } : {}),
      className: visualClass,
      class: visualClass,
    });
  },
});
