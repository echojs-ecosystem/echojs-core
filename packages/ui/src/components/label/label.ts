import { type Child } from "@echojs-ecosystem/hyperdom";

import { createUIComponent } from "../../core/component";
import { hTag } from "../../core/h-tag";
import { cn } from "../../utils/cn";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { labelStyles } from "./label.styles";
import { LABEL_OWN_KEYS, type LabelOwnProps } from "./label.types";

export const Label = createUIComponent<"label", LabelOwnProps>({
  name: "Label",
  tag: "label",
  ownKeys: LABEL_OWN_KEYS,
  defaultProps: {
    requiredIndicator: "*",
  },
  variants: () => labelStyles({}),
  render: ({ props, domProps, className, headless }) => {
    const { for: htmlFor, required, disabled, invalid, requiredIndicator, optionalIndicator, children } = props;

    const indicator =
      required === true
        ? requiredIndicator
        : required === false && optionalIndicator
          ? optionalIndicator
          : null;

    const visualClass = headless ? undefined : cn(className);
    const { children: _domChildren, ...labelDomProps } = domProps;

    return hTag(
      "label",
      {
        ...labelDomProps,
        htmlFor,
        ...dataDisabled(Boolean(disabled)),
        ...dataInvalid(Boolean(invalid)),
        className: visualClass,
        class: visualClass,
      },
      [
        children as Child,
        indicator
          ? hTag("span", { "aria-hidden": "true", className: headless ? undefined : "ml-1" }, indicator)
          : null,
      ],
    );
  },
});
