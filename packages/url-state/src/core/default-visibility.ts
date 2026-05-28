import { defaultEquals } from "../utils/equality";
import type { DefaultVisibility, Parser, ParserWithDefault, QueryStateSetOptions } from "./types";
import { hasDefault } from "./parser-meta";

const isVisibilityMode = (value: unknown): value is DefaultVisibility =>
  value === "hide" || value === "show";

export const resolveDefaultVisibility = (options: QueryStateSetOptions): DefaultVisibility => {
  if (isVisibilityMode(options.defaultVisibility)) return options.defaultVisibility;
  if (isVisibilityMode(options.defaultParamsBehavior)) return options.defaultParamsBehavior;

  if (options.clearOnDefault === false) return "show";
  if (options.clearOnDefault === true) return "hide";

  return "hide";
};

export const shouldHideDefaultInUrl = <Value>(
  value: Value,
  parser: Parser<Value>,
  options: QueryStateSetOptions,
): boolean => {
  if (!hasDefault(parser)) return false;
  if (resolveDefaultVisibility(options) === "show") return false;

  const parserEq = parser.eq;
  const equals =
    options.equals === false ? null : (parserEq ?? options.equals ?? defaultEquals);
  return equals ? equals(value, (parser as ParserWithDefault<Value>).defaultValue) : false;
};

/** @deprecated Use {@link shouldHideDefaultInUrl} */
export const shouldClearOnDefault = shouldHideDefaultInUrl;
