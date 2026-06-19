import { h } from "@echojs-ecosystem/hyperdom";

import { createUIComponent } from "../../core/component";
import { cn } from "../../utils/cn";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { inputStyles } from "../input-shared/input.styles";
import { INPUT_OTP_OWN_KEYS, type InputOtpOwnProps } from "./input-otp.types";

const normalizeOtp = (value: string, length: number): string =>
  value.replace(/\D/g, "").slice(0, length);

export const InputOtp = createUIComponent<"div", InputOtpOwnProps>({
  name: "InputOtp",
  tag: "div",
  ownKeys: INPUT_OTP_OWN_KEYS,
  defaultProps: {
    length: 6,
    variant: "outline",
    size: "md",
    autocomplete: "one-time-code",
  },
  variants: inputStyles.wrapper,
  render: ({ props, domProps, headless, className }) => {
    const {
      length = 6,
      value = "",
      invalid,
      disabled,
      readonly: readonlyProp,
      readOnly,
      required,
      variant = "outline",
      size = "md",
      autocomplete = "one-time-code",
      onValueChange,
      onInput,
    } = props;

    const readonly = readonlyProp ?? readOnly;
    const digits = normalizeOtp(String(value), length);
    const slotOptions = { variant, size };
    const cellClass = headless
      ? undefined
      : cn(
          inputStyles.input(slotOptions),
          "w-10 text-center px-0",
          size === "sm" && "w-8",
          size === "lg" && "w-12",
        );

    const groupClass = headless
      ? "flex gap-2"
      : cn("flex gap-2", inputStyles.wrapper(slotOptions), className);

    const emitChange = (next: string, input?: HTMLInputElement): void => {
      const normalized = normalizeOtp(next, length);
      onValueChange?.(normalized);
      if (input) {
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    const cells = Array.from({ length }, (_, index) => {
      const char = digits[index] ?? "";

      return h("input", {
        type: "text",
        inputMode: "numeric",
        pattern: "[0-9]*",
        maxlength: 1,
        value: char,
        disabled,
        readonly,
        required,
        autocomplete: index === 0 ? autocomplete : "off",
        "aria-label": `Digit ${index + 1} of ${length}`,
        className: cellClass,
        class: cellClass,
        onInput: (event: Event) => {
          const input = event.currentTarget as HTMLInputElement;
          const digit = normalizeOtp(input.value, 1).slice(-1);
          input.value = digit;

          const chars = [...digits];
          while (chars.length < length) chars.push("");
          chars[index] = digit;
          emitChange(chars.join(""), input);

          if (digit && index < length - 1) {
            const group = input.parentElement;
            const nextInput = group?.querySelectorAll("input")[index + 1] as HTMLInputElement | undefined;
            nextInput?.focus();
          }

          onInput?.(event as Event & { currentTarget: HTMLInputElement });
        },
        onKeyDown: (event: KeyboardEvent) => {
          const input = event.currentTarget as HTMLInputElement;
          if (event.key === "Backspace" && !input.value && index > 0) {
            const group = input.parentElement;
            const prevInput = group?.querySelectorAll("input")[index - 1] as HTMLInputElement | undefined;
            prevInput?.focus();
            const chars = digits.split("");
            chars[index - 1] = "";
            emitChange(chars.join(""), input);
          }
        },
        onPaste: (event: ClipboardEvent) => {
          event.preventDefault();
          const text = event.clipboardData?.getData("text") ?? "";
          emitChange(text, event.currentTarget as HTMLInputElement);
        },
      } as any);
    });

    return h(
      "div",
      {
        ...domProps,
        role: "group",
        "aria-label": domProps["aria-label"] ?? "One-time code",
        className: groupClass,
        class: groupClass,
        ...dataDisabled(Boolean(disabled)),
        ...dataInvalid(Boolean(invalid)),
        ...(readonly ? { "data-readonly": "" } : {}),
      } as any,
      cells,
    );
  },
});
