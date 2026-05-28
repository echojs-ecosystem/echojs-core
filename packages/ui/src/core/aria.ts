export type AriaBoolean = "true" | "false";

/** Converts a boolean to an ARIA boolean string (`"true"` | `"false"`). */
export const ariaBool = (value: boolean): AriaBoolean => (value ? "true" : "false");

export { dataDisabled, dataInvalid, dataState } from "../utils/data-attributes";
