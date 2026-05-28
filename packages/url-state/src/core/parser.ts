import type { Parser, ParserWithDefault, QueryStateOptions } from "./types";

export const createParser = <Value>(impl: {
  parse(value: string | string[] | null): Value | null;
  serialize(value: Value): string | string[] | null;
}): Parser<Value> => {
  const base: Parser<Value> = {
    parserMode: "single",
    parse: impl.parse,
    serialize: impl.serialize,

    withDefault(defaultValue: Value): ParserWithDefault<Value> {
      return createParserWithDefault(base, defaultValue);
    },

    withOptions(options: Partial<QueryStateOptions>): Parser<Value> {
      return createParserWithOptions(base, options);
    },
  };
  return base;
};

const createParserWithDefault = <Value>(
  parser: Parser<Value>,
  defaultValue: Value,
): ParserWithDefault<Value> => {
  const next: ParserWithDefault<Value> = {
    ...parser,
    defaultValue,
    withDefault(value) {
      return createParserWithDefault(next, value);
    },
    withOptions(options) {
      return createParserWithOptions(next, options) as ParserWithDefault<Value>;
    },
  };
  return next;
};

const createParserWithOptions = <Value>(parser: Parser<Value>, options: Partial<QueryStateOptions>): Parser<Value> => {
  const next: Parser<Value> = {
    ...parser,
    options: { ...(parser.options ?? {}), ...options },
    withDefault(defaultValue) {
      return createParserWithDefault(next, defaultValue);
    },
    withOptions(more) {
      return createParserWithOptions(next, more);
    },
  };
  return next;
};

