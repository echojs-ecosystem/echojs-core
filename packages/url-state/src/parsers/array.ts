import { createCustomMultiParser } from "../core/custom-multi-parser";
import type { MultiParser, Parser } from "../core/types";

/**
 * Array serialized as repeated keys or a custom separator in one key (see second argument).
 *
 * For native `?tag=a&tag=b` only, prefer {@link parseAsNativeArrayOf}.
 */
export const parseAsArrayOf = <Item>(item: Parser<Item>, separator?: string) =>
  createCustomMultiParser<Item[]>({
    parse(value) {
      let rawItems: readonly string[];
      if (value.length === 0) return [];
      if (separator && value.length === 1) {
        rawItems = value[0]!.split(separator).filter(Boolean);
      } else {
        rawItems = value;
      }

      const out: Item[] = [];
      for (const raw of rawItems) {
        const parsed = item.parse(raw);
        if (parsed === null) return null;
        out.push(parsed);
      }
      return out;
    },
    serialize(items) {
      if (separator) {
        const parts: string[] = [];
        for (const entry of items) {
          const serialized = item.serialize(entry);
          if (serialized === null) return [];
          if (Array.isArray(serialized)) parts.push(...serialized);
          else parts.push(serialized as string);
        }
        return parts.length ? [parts.join(separator)] : [];
      }

      const out: string[] = [];
      for (const entry of items) {
        const serialized = item.serialize(entry);
        if (serialized === null) return [];
        if (Array.isArray(serialized)) out.push(...serialized);
        else out.push(serialized as string);
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
  });
