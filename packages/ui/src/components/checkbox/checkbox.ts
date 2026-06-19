import { h } from "@echojs-ecosystem/hyperdom";

import { createUIComponent } from "../../core/component";
import { ariaBool } from "../../core/aria";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { checkboxStyles } from "./checkbox.styles";
import { CHECKBOX_OWN_KEYS, type CheckboxOwnProps } from "./checkbox.types";

export const Checkbox = createUIComponent<"input", CheckboxOwnProps>({
  name: "Checkbox",
  tag: "input",
  ownKeys: CHECKBOX_OWN_KEYS,
  defaultProps: {
    size: "md",
  },
  variants: checkboxStyles,
  render: ({ props, domProps, className, headless }) => {
    const { checked, defaultChecked, indeterminate = false, disabled, invalid, required } = props;
    const visualClass = headless ? undefined : className;

    return h("input", {
      ...domProps,
      type: "checkbox",
      checked,
      defaultChecked,
      disabled,
      required,
      indeterminate,
      "aria-checked": indeterminate
        ? "mixed"
        : checked !== undefined
          ? ariaBool(Boolean(checked))
          : undefined,
      "aria-invalid": invalid ? "true" : undefined,
      "aria-required": required ? "true" : undefined,
      ...dataDisabled(Boolean(disabled)),
      ...dataInvalid(Boolean(invalid)),
      ...(indeterminate ? { "data-indeterminate": "" } : {}),
      className: visualClass,
      class: visualClass,
    });
  },
});
