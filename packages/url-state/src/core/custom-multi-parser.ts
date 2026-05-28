import type { MultiParser, ParserWithDefault, QueryStateOptions } from "./types";
import type { SearchParamValue } from "./url";

export type CustomMultiParserConfig<Value> = {
  parse: (values: readonly string[]) => Value | null;
  serialize: (value: Value) => readonly string[];
  eq?: (a: Value, b: Value) => boolean;
};

const toQueryValues = (raw: SearchParamValue): string[] => {
  if (raw === null) return [];
  if (typeof raw === "string") return [raw];
  return [...raw];
};

const createMultiParserWithDefault = <Value>(
  parser: MultiParser<Value>,
  defaultValue: Value,
): MultiParser<Value> & ParserWithDefault<Value> => {
  const next: MultiParser<Value> & ParserWithDefault<Value> = {
    ...parser,
    parserMode: "multi",
    defaultValue,
    withDefault(value: Value) {
      return createMultiParserWithDefault(parser, value);
    },
    withOptions(options: Partial<QueryStateOptions>) {
      return createMultiParserWithOptions(parser, options);
    },
  };
  return next;
};

const createMultiParserWithOptions = <Value>(
  parser: MultiParser<Value>,
  options: Partial<QueryStateOptions>,
): MultiParser<Value> => ({
  ...parser,
  options: { ...(parser.options ?? {}), ...options },
  withDefault(defaultValue: Value) {
    return createMultiParserWithDefault(parser, defaultValue);
  },
  withOptions(more: Partial<QueryStateOptions>) {
    return createMultiParserWithOptions(parser, more);
  },
});

export const createCustomMultiParser = <Value>(
  config: CustomMultiParserConfig<Value>,
): MultiParser<Value> => {
  const parser: MultiParser<Value> = {
    parserMode: "multi",
    parse(raw: SearchParamValue) {
      return config.parse(toQueryValues(raw));
    },
    serialize(value: Value) {
      return [...config.serialize(value)];
    },
    withDefault(defaultValue: Value) {
      return createMultiParserWithDefault(parser, defaultValue);
    },
    withOptions(options: Partial<QueryStateOptions>) {
      return createMultiParserWithOptions(parser, options);
    },
  };

  if (config.eq) parser.eq = config.eq;

  return parser;
};

export const isMultiParser = <Value>(parser: { parserMode?: string }): parser is MultiParser<Value> =>
  parser.parserMode === "multi";
