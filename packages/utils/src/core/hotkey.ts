export type HotkeyModifier = "ctrl" | "shift" | "alt" | "meta";

export type ParsedHotkey = {
  key: string;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  meta: boolean;
};

const MODIFIERS: HotkeyModifier[] = ["ctrl", "shift", "alt", "meta"];

export const parseHotkey = (hotkey: string): ParsedHotkey => {
  const parts = hotkey
    .toLowerCase()
    .split("+")
    .map((p) => p.trim())
    .filter(Boolean);

  const modifiers = new Set(parts.filter((p) => MODIFIERS.includes(p as HotkeyModifier)));
  const keyPart = parts.find((p) => !modifiers.has(p)) ?? "";

  return {
    key: keyPart.length === 1 ? keyPart : keyPart,
    ctrl: modifiers.has("ctrl"),
    shift: modifiers.has("shift"),
    alt: modifiers.has("alt"),
    meta: modifiers.has("meta"),
  };
};

export const matchHotkey = (event: KeyboardEvent, parsed: ParsedHotkey): boolean => {
  if (event.ctrlKey !== parsed.ctrl) return false;
  if (event.shiftKey !== parsed.shift) return false;
  if (event.altKey !== parsed.alt) return false;
  if (event.metaKey !== parsed.meta) return false;

  const eventKey = event.key.toLowerCase();
  const wanted = parsed.key.toLowerCase();

  if (wanted === eventKey) return true;
  if (wanted === "space" && eventKey === " ") return true;
  if (wanted.length === 1 && event.code.toLowerCase() === `key${wanted}`) return true;

  return event.code.toLowerCase() === wanted;
};
