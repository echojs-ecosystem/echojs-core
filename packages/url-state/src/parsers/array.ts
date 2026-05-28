import { createParser } from "../core/parser";
import type { Parser } from "../core/types";

export const parseAsArrayOf = <Item>(item: Parser<Item>) => {
  return createParser<Item[]>({
    parse(value) {
      if (value === null) return null;
      const rawItems = Array.isArray(value) ? value : [value];
      const out: Item[] = [];
      for (const raw of rawItems) {
        const parsed = item.parse(raw as any);
        if (parsed === null) return null;
        out.push(parsed);
      }
      return out;
    },
    serialize(value) {
      const out: string[] = [];
      for (const v of value) {
        const serialized = item.serialize(v);
        if (serialized === null) return null;
        if (Array.isArray(serialized)) out.push(...serialized);
        else out.push(serialized as string);
      }
      return out;
    },
  });
};

