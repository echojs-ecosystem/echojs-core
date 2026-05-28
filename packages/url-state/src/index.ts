export { createQueryParam } from "./core/create-query-param";
export { createQueryParams } from "./core/create-query-params";

export { createBrowserUrlStateAdapter } from "./adapters/browser-adapter";
export { createMemoryUrlStateAdapter } from "./adapters/memory-adapter";
export { createRouterUrlStateAdapter, type RouterLike } from "./adapters/router-adapter";
export { attachRouterQueryParams, type RouterBoundQueryParams, type RouterWithQueryParams } from "./adapters/bind-router-query-params";
export { getUrlStateRouter } from "./adapters/router-registry";

export { parseAsString } from "./parsers/string";
export { parseAsInteger } from "./parsers/integer";
export { parseAsFloat } from "./parsers/float";
export { parseAsBoolean } from "./parsers/boolean";
export { parseAsLiteral, parseAsNumberLiteral, parseAsStringLiteral } from "./parsers/literal";
export { parseAsArrayOf } from "./parsers/array";
export { parseAsNativeArrayOf } from "./parsers/native-array";
export { parseAsJson } from "./parsers/json";

export { createCustomParser } from "./core/custom-parser";
export { createCustomMultiParser, isMultiParser } from "./core/custom-multi-parser";
export { parseAsIsoDate } from "./parsers/date";
export { parseAsTimestamp } from "./parsers/timestamp";

export { throttle } from "./utils/throttle";
export { debounce } from "./utils/debounce";

export type {
  CustomParserConfig,
} from "./core/custom-parser";
export type {
  CustomMultiParserConfig,
} from "./core/custom-multi-parser";
export type {
  JsonSchema,
  StandardSchemaLike,
} from "./core/standard-schema";
export type {
  DefaultInUrlBehavior,
  DefaultParamsBehavior,
  DefaultVisibility,
  DefaultVisibilityMode,
  MultiParser,
  Parser,
  ParserMode,
  ParserWithDefault,
  QueryParamParser,
  QueryParamState,
  QueryParamsState,
  QueryStateOptions,
  QueryStateSetOptions,
  UrlStateAdapter,
} from "./core/types";

