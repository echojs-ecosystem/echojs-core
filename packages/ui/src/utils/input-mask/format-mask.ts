import type { MaskToken, MaskValue } from "./types";

const slotPattern = (kind: MaskToken & { type: "slot" }): RegExp => {
  switch (kind.kind) {
    case "9":
      return /\d/;
    case "a":
      return /[A-Za-z]/;
    case "*":
      return /[A-Za-z0-9]/;
  }
};

const extractSlotChars = (raw: string, tokens: MaskToken[]): string[] => {
  const slots = tokens.filter((t): t is MaskToken & { type: "slot" } => t.type === "slot");
  const out: string[] = [];

  for (const char of raw) {
    if (out.length >= slots.length) break;
    const slot = slots[out.length]!;
    if (slotPattern(slot).test(char)) out.push(char);
  }

  return out;
};

/** Applies mask tokens to raw user input. */
export const formatMaskedValue = (raw: string, tokens: MaskToken[]): MaskValue => {
  const slotChars = extractSlotChars(raw, tokens);
  let slotIndex = 0;
  let masked = "";
  const unmaskedParts: string[] = [];

  for (const token of tokens) {
    if (token.type === "literal") {
      masked += token.char;
      continue;
    }

    const char = slotChars[slotIndex];
    if (char === undefined) break;

    masked += char;
    unmaskedParts.push(char);
    slotIndex += 1;
  }

  return {
    masked,
    unmasked: unmaskedParts.join(""),
  };
};

/** Maximum number of slot characters for a mask. */
export const maskSlotCount = (tokens: MaskToken[]): number =>
  tokens.filter((t) => t.type === "slot").length;
