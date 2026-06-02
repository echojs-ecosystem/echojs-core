import { formatMaskedValue } from "./format-mask";
import { parseMaskPattern } from "./parse-mask";
import { resolveMaskPattern } from "./presets";
import type { AttachInputMaskOptions } from "./types";

/**
 * Binds mask formatting to a native `<input>` (vanilla, hyperdom-friendly).
 * Inspired by [use-mask-input](https://github.com/eduardoborges/use-mask-input) / Inputmask.
 */
export const attachInputMask = (
  input: HTMLInputElement,
  options: AttachInputMaskOptions,
): (() => void) => {
  const pattern = resolveMaskPattern(options.mask);
  const tokens = parseMaskPattern(pattern);

  const apply = (raw: string, notify = true): void => {
    const result = formatMaskedValue(raw, tokens);
    if (input.value !== result.masked) {
      input.value = result.masked;
    }
    if (notify) options.onValueChange?.(result);
  };

  const onInput = (): void => apply(input.value);
  const onBlur = (): void => apply(input.value);

  input.addEventListener("input", onInput);
  input.addEventListener("blur", onBlur);

  if (input.value) apply(input.value, true);

  return () => {
    input.removeEventListener("input", onInput);
    input.removeEventListener("blur", onBlur);
  };
};
