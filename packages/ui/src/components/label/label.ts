import { h, type Child } from "@echojs/hyperdom";
import { createUIComponent } from "../../core/component";
import { cn } from "../../utils/cn";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { labelStyles } from "./label.styles";
import type { LabelProps } from "./label.types";

export const Label = createUIComponent<LabelProps, HTMLLabelElement>({
  name: "Label",
  defaultTag: "label",
  defaultProps: {
    requiredIndicator: "*",
  },
  variants: () => labelStyles({} as any),
  render: ({ props, headless, className }) => {
    const {
      for: htmlFor,
      required,
      disabled,
      invalid,
      requiredIndicator,
      optionalIndicator,
      children,
      ...rest
    } = props as any;

    const indicator =
      required === true
        ? requiredIndicator
        : required === false && optionalIndicator
          ? optionalIndicator
          : null;

    const visualClass = headless ? undefined : cn(className);

    return h(
      "label",
      {
        ...rest,
        for: htmlFor,
        ...dataDisabled(Boolean(disabled)),
        ...dataInvalid(Boolean(invalid)),
        className: visualClass,
        class: visualClass,
      } as any,
      [
        children as Child,
        indicator ? h("span", { "aria-hidden": "true", className: headless ? undefined : "ml-1" }, indicator) : null,
      ],
    );
  },
});

