export const asOptionalBool = (value: unknown): boolean | undefined => {
  if (value == null) return undefined;
  if (typeof value === "function") return Boolean((value as () => unknown)());
  return Boolean(value);
};
