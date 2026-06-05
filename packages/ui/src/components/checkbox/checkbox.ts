import { h } from "@echojs-ecosystem/hyperdom";

import { createUIComponent } from "../../core/component";
import { ariaBool } from "../../core/aria";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { checkboxStyles } from "./checkbox.styles";
import type { CheckboxProps } from "./checkbox.types";

const INTERNAL_KEYS = new Set([
  "size",
  "indeterminate",
  "invalid",
  "disabled",
  "checked",
  "defaultChecked",
  "required",
  "headless",
  "children",
  "className",
  "class",
]);

const pickDomProps = (props: Record<string, unknown>): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!INTERNAL_KEYS.has(key)) out[key] = value;
  }
  return out;
};

export const Checkbox = createUIComponent<CheckboxProps, HTMLInputElement>({
  name: "Checkbox",
  defaultTag: "input",
  defaultProps: {
    size: "md",
  },
  variants: checkboxStyles,
  render: ({ props, headless, className }) => {
    const {
      checked,
      defaultChecked,
      indeterminate = false,
      disabled,
      invalid,
      required,
      ...rest
    } = props as CheckboxProps & Record<string, unknown>;

    const domProps = pickDomProps(rest as Record<string, unknown>);
    const visualClass = headless ? undefined : className;

    return h(
      "input",
      {
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
      } as any,
    );
  },
});
