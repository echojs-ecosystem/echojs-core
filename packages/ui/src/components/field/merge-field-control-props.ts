import { mergeProps } from "../../utils/merge-props";
import { getFieldContext } from "./field-context";

/**
 * Merges {@link Field} context a11y props with control-specific props (Input, Textarea, …).
 *
 * @example
 * ```ts
 * Field({
 *   label: "Email",
 *   children: (ctx) =>
 *     Input(mergeFieldControlProps(ctx.inputProps, {
 *       value: email.value(),
 *       onInput: (e) => email.set(e.currentTarget.value),
 *     })),
 * });
 * ```
 */
export const mergeFieldControlProps = <T extends Record<string, unknown>>(
  base: T,
  overrides?: Record<string, unknown>,
): T => {
  const ctx = getFieldContext();
  if (!ctx) {
    return mergeProps(undefined, base, overrides ?? {}) as T;
  }
  return mergeProps(ctx.inputProps, base, overrides ?? {}) as T;
};
