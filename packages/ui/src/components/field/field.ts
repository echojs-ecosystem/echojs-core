import { h, type Child } from "@echojs-ecosystem/hyperdom";
import { createId } from "../../core/ids";
import { getUIContextOrDefault } from "../../theme/theme-context";
import { cn } from "../../utils/cn";
import { dataDisabled, dataInvalid } from "../../utils/data-attributes";
import { mergeProps } from "../../utils/merge-props";
import { Label } from "../label/label";
import { fieldStyles } from "./field.styles";
import type { FieldContext, FieldProps } from "./field.types";
import { runWithFieldContext } from "./field-context";

const isFnChild = (children: FieldProps["children"]): children is (ctx: FieldContext) => Child =>
  typeof children === "function";

export const Field = (props: FieldProps): Child => {
  const ui = getUIContextOrDefault();
  const slice = ui.theme.components?.field;
  const headless = props.headless ?? ui.headless ?? ui.theme.headless ?? false;

  const themeDefaults: Record<string, unknown> = {
    ...slice?.defaultProps,
  };

  if (!headless) {
    if (slice?.baseClass) themeDefaults.className = cn(themeDefaults.className as any, slice.baseClass);
    if (slice?.className) themeDefaults.className = cn(themeDefaults.className as any, slice.className);
  }

  const merged = mergeProps(undefined, themeDefaults, props as any) as FieldProps & Record<string, unknown>;

  const id = merged.id ?? createId("field");
  const inputId = createId(`${id}-input`);
  const labelId = createId(`${id}-label`);
  const descriptionId = merged.description ? createId(`${id}-description`) : undefined;
  const errorId = merged.error ? createId(`${id}-error`) : undefined;

  const invalid = Boolean(merged.invalid || merged.error);
  const disabled = Boolean(merged.disabled);
  const required = Boolean(merged.required);

  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  const ctx: FieldContext = {
    id,
    inputId,
    labelId,
    descriptionId,
    errorId,

    invalid,
    disabled,
    required,

    inputProps: {
      id: inputId,
      "aria-labelledby": labelId,
      "aria-describedby": describedBy,
      "aria-invalid": invalid ? "true" : undefined,
      "aria-required": required ? "true" : undefined,
      required: required || undefined,
      disabled: disabled || undefined,
      invalid: invalid || undefined,
    },

    labelProps: {
      id: labelId,
      for: inputId,
      required: required || undefined,
      disabled: disabled || undefined,
      invalid: invalid || undefined,
    },

    descriptionProps: descriptionId ? { id: descriptionId } : undefined,
    errorProps: errorId ? { id: errorId, role: "alert" } : undefined,
  };

  const rootClass = headless
    ? undefined
    : cn(fieldStyles.root(), merged.className as string | undefined, merged.class as string | undefined);

  const content = isFnChild(merged.children) ? merged.children(ctx) : merged.children;

  return runWithFieldContext(ctx, () =>
    h(
      "div",
      {
        className: rootClass,
        class: rootClass,
        ...dataInvalid(invalid),
        ...dataDisabled(disabled),
        ...(required ? { "data-required": "" } : {}),
      } as any,
      [
        merged.label
          ? Label({
              ...ctx.labelProps,
              headless,
              children: merged.label,
            } as any)
          : null,

        content,

        merged.description
          ? h(
              "div",
              {
                id: descriptionId,
                className: headless ? undefined : fieldStyles.description(),
              } as any,
              merged.description as Child,
            )
          : null,

        merged.error
          ? h(
              "div",
              {
                id: errorId,
                role: "alert",
                className: headless ? undefined : fieldStyles.error(),
              } as any,
              merged.error as Child,
            )
          : null,
      ],
    ),
  );
};

