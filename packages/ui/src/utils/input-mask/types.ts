export type MaskSlotKind = "9" | "a" | "*";

export type MaskToken =
  | { type: "literal"; char: string }
  | { type: "slot"; kind: MaskSlotKind };

export type MaskPreset =
  | "phone"
  | "cpf"
  | "cnpj"
  | "date"
  | "cep"
  | "time"
  | "credit-card";

export type MaskPattern = string | MaskPreset;

export type MaskValue = {
  masked: string;
  unmasked: string;
};

export type AttachInputMaskOptions = {
  mask: MaskPattern;
  onValueChange?: (value: MaskValue) => void;
};
