import type { MaskPattern, MaskPreset } from "./types";

/** Built-in mask patterns (inspired by [use-mask-input](https://github.com/eduardoborges/use-mask-input)). */
export const MASK_PRESETS: Record<MaskPreset, string> = {
  phone: "(99) 99999-9999",
  cpf: "999.999.999-99",
  cnpj: "99.999.999/9999-99",
  date: "99/99/9999",
  cep: "99999-999",
  time: "99:99",
  "credit-card": "9999 9999 9999 9999",
};

export const resolveMaskPattern = (mask: MaskPattern): string =>
  mask in MASK_PRESETS ? MASK_PRESETS[mask as MaskPreset] : mask;
