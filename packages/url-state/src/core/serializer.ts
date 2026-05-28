import type { Parser } from "./types";

export const serializeValue = <Value>(parser: Parser<Value>, value: Value) => parser.serialize(value);

