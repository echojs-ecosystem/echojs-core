import type { MaskSlotKind, MaskToken } from "./types";

const SLOT_KINDS = new Set<MaskSlotKind>(["9", "a", "*"]);

/** Parses a mask pattern (`9` digit, `a` letter, `*` alphanumeric; other chars are literals). */
export const parseMaskPattern = (pattern: string): MaskToken[] => {
  const tokens: MaskToken[] = [];

  for (const char of pattern) {
    if (SLOT_KINDS.has(char as MaskSlotKind)) {
      tokens.push({ type: "slot", kind: char as MaskSlotKind });
      continue;
    }
    tokens.push({ type: "literal", char });
  }

  return tokens;
};
