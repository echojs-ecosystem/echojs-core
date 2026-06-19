import { h, type Child } from "@echojs-ecosystem/hyperdom";

import { createUIComponent } from "../../core/component";
import { cn } from "../../utils/cn";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { inputStyles } from "../input-shared/input.styles";
import { renderInputField } from "../input-shared/render-input-field";
import { INPUT_TAGS_OWN_KEYS, type InputTagsOwnProps } from "./input-tags.types";

const normalizeTag = (raw: string): string => raw.trim();

const canAddTag = (
  tags: string[],
  tag: string,
  options: { allowDuplicates?: boolean; maxTags?: number },
): boolean => {
  if (!tag) return false;
  if (options.maxTags !== undefined && tags.length >= options.maxTags) return false;
  if (!options.allowDuplicates && tags.includes(tag)) return false;
  return true;
};

export const InputTags = createUIComponent<"div", InputTagsOwnProps>({
  name: "InputTags",
  tag: "div",
  ownKeys: INPUT_TAGS_OWN_KEYS,
  defaultProps: {
    value: [],
    separators: [",", "Enter"],
    allowDuplicates: false,
    variant: "outline",
    size: "md",
    placeholder: "Add tag…",
  },
  variants: inputStyles.wrapper,
  render: ({ props, domProps, headless, className }) => {
    const {
      value = [],
      separators = [",", "Enter"],
      allowDuplicates = false,
      maxTags,
      startContent,
      endContent,
      invalid,
      disabled,
      readonly: readonlyProp,
      readOnly,
      required,
      variant = "outline",
      size = "md",
      placeholder,
      onValueChange,
      onInput,
    } = props;

    const readonly = readonlyProp ?? readOnly;
    const tags = Array.isArray(value) ? value : [];
    const slotOptions = { variant, size };

    const addTag = (draft: string, input: HTMLInputElement): void => {
      const tag = normalizeTag(draft);
      if (!canAddTag(tags, tag, { allowDuplicates, maxTags })) return;
      onValueChange?.([...tags, tag]);
      input.value = "";
    };

    const removeTag = (index: number): void => {
      onValueChange?.(tags.filter((_, i) => i !== index));
    };

    const tagChips: Child[] = tags.map((tag, index) =>
      h(
        "span",
        {
          "data-tag": "",
          className: headless
            ? undefined
            : "inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-sm text-zinc-800",
        },
        [
          tag,
          readonly || disabled
            ? null
            : h(
                "button",
                {
                  type: "button",
                  className: "text-zinc-500 hover:text-zinc-800",
                  "aria-label": `Remove ${tag}`,
                  onClick: () => removeTag(index),
                },
                "×",
              ),
        ],
      ),
    );

    const innerInput = renderInputField({
      headless: true,
      variant: variant,
      size: size,
      disabled,
      invalid,
      readonly,
      required,
      inputProps: {
        type: "text",
        className: "min-w-24 flex-1 border-0 bg-transparent shadow-none outline-none",
        placeholder: tags.length === 0 ? placeholder : undefined,
        onInput,
        onKeyDown: (event: KeyboardEvent) => {
          const input = event.currentTarget as HTMLInputElement;
          if (separators.includes(event.key)) {
            event.preventDefault();
            addTag(input.value, input);
            return;
          }
          if (event.key === "Backspace" && input.value === "" && tags.length > 0) {
            removeTag(tags.length - 1);
          }
        },
      },
    });

    const wrapperClass = headless
      ? cn("flex min-w-0 flex-1 flex-wrap items-center gap-1.5")
      : cn(inputStyles.wrapper(slotOptions), "min-h-10 flex-wrap items-center gap-1.5 py-1", className);

    return h(
      "div",
      {
        ...domProps,
        className: wrapperClass,
        class: wrapperClass,
        ...dataDisabled(Boolean(disabled)),
        ...dataInvalid(Boolean(invalid)),
        ...(readonly ? { "data-readonly": "" } : {}),
      } as any,
      [
        startContent
          ? h(
              "span",
              { "data-input-slot": "start", className: headless ? undefined : inputStyles.start() },
              startContent,
            )
          : null,
        ...tagChips,
        innerInput,
        endContent
          ? h("span", { "data-input-slot": "end", className: headless ? undefined : inputStyles.end() }, endContent)
          : null,
      ],
    );
  },
});
