import { h, type Child } from "@echojs/hyperdom";
import { createUIComponent } from "../../core/component";
import { cn } from "../../utils/cn";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { inputStyles } from "./input.styles";
import type { InputProps } from "./input.types";

export const Input = createUIComponent<InputProps, HTMLInputElement>({
  name: "Input",
  defaultTag: "input",
  defaultProps: {
    type: "text",
    variant: "outline",
    size: "md",
  },
  variants: (options) => {
    const slots = inputStyles(options as any);
    return slots.wrapper();
  },
  render: ({ props, headless, className }) => {
    const {
      startContent,
      endContent,
      invalid,
      disabled,
      readonly,
      required,
      children, // not used for input
      ...rest
    } = props as any;

    const describedBy = rest["aria-describedby"] as string | undefined;

    const ariaInvalid = invalid ? "true" : (rest["aria-invalid"] as any);

    const dataReadonly = readonly ? { "data-readonly": "" } : {};

    if (!startContent && !endContent) {
      return h("input", {
        ...rest,
        disabled,
        readonly,
        required,
        "aria-invalid": ariaInvalid,
        ...dataDisabled(Boolean(disabled)),
        ...dataInvalid(Boolean(invalid)),
        ...dataReadonly,
        ...(headless ? { className: undefined, class: undefined } : {}),
        className: headless ? undefined : className,
        class: headless ? undefined : className,
        "aria-describedby": describedBy,
      });
    }

    const slots = inputStyles({
      variant: props.variant,
      size: props.size,
    } as any);

    const wrapperClass = headless ? undefined : cn(slots.wrapper(), className);
    const inputClass = headless ? undefined : slots.input();

    return h(
      "div",
      {
        className: wrapperClass,
        class: wrapperClass,
        ...dataDisabled(Boolean(disabled)),
        ...dataInvalid(Boolean(invalid)),
        ...dataReadonly,
      } as any,
      [
        startContent ? h("span", { className: headless ? undefined : slots.start() }, startContent as Child) : null,
        h("input", {
          ...rest,
          className: inputClass,
          class: inputClass,
          disabled,
          readonly,
          required,
          "aria-invalid": ariaInvalid,
          "aria-describedby": describedBy,
        }),
        endContent ? h("span", { className: headless ? undefined : slots.end() }, endContent as Child) : null,
      ],
    );
  },
});

