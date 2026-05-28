import type { Parser, ParserWithDefault } from "./types";

export const hasDefault = <Value>(parser: Parser<Value>): parser is ParserWithDefault<Value> =>
  Object.prototype.hasOwnProperty.call(parser, "defaultValue");
