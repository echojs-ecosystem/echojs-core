import { createCustomMultiParser } from "../core/custom-multi-parser";
import type { Parser } from "../core/types";
import type { SearchParamValue } from "../core/url";

const serializeItem = <Item>(item: Parser<Item>, value: Item): string | null => {
  const serialized = item.serialize(value);
  if (serialized === null) return null;
  if (Array.isArray(serialized)) return serialized[0] ?? null;
  return serialized as string;
};

/**
 * Native URL arrays via repeated keys: `?tag=a&tag=b`.
 *
 * @see https://nuqs.dev/docs/parsers/built-in#native-arrays
 */
export const parseAsNativeArrayOf = <Item>(item: Parser<Item>) =>
  createCustomMultiParser<Item[]>({
    parse(values) {
      const out: Item[] = [];
      for (const raw of values) {
        const parsed = item.parse(raw);
        if (parsed === null) return null;
        out.push(parsed);
      }
      return out;
    },
    serialize(items) {
      const out: string[] = [];
      for (const entry of items) {
        const next = serializeItem(item, entry);
        if (next === null) return [];
        out.push(next);
      }
      return out;
    },
    eq(a, b) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i += 1) {
        if (!Object.is(a[i], b[i])) return false;
      }
      return true;
    },
  }).withDefault([]);
