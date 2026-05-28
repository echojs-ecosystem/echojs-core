import { createParser } from "./parser";
import type { Parser, ParserWithDefault, QueryStateOptions } from "./types";
import type { SearchParamValue } from "./url";

export type CustomParserConfig<Value> = {
  parse: (value: SearchParamValue) => Value | null;
  serialize: (value: Value) => SearchParamValue;
  /** Used for `defaultVisibility: "hide"` equality checks (like nuqs `eq`). */
  eq?: (a: Value, b: Value) => boolean;
};

export const createCustomParser = <Value>(config: CustomParserConfig<Value>): Parser<Value> => {
  const parser = createParser<Value>({
    parse: config.parse,
    serialize: (value) => config.serialize(value) as string | string[] | null,
  }) as Parser<Value> & { eq?: (a: Value, b: Value) => boolean };

  if (config.eq) parser.eq = config.eq;
  parser.parserMode = "single";

  return parser;
};
