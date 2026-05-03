import type {
  Field,
  FieldAccessor,
  FieldArray,
  FieldSet,
  FieldTreeWire,
  WireFormModel,
} from "../types";

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

const maybeFieldSet = <Shape extends Record<string, any>>(v: unknown): v is FieldSet<Shape> =>
  isPlainObject(v) && "fields" in v && isPlainObject((v as any).fields);

const maybeFieldArray = <Item>(v: unknown): v is FieldArray<Item> =>
  isPlainObject(v) && "$items" in v && typeof (v as any).append === "function";

const maybeField = <T>(v: unknown): v is Field<T> =>
  isPlainObject(v) &&
  typeof (v as any).$value !== "undefined" &&
  typeof (v as any).$meta !== "undefined" &&
  typeof (v as any).set === "function" &&
  typeof (v as any).bind === "function";

/** Recursively wrap a field tree produced by `@echojs/form` primitives. */
export const wireFormModel = <TTree extends Record<string, any>>(
  fields: TTree,
): WireFormModel<TTree> => {
  const wireAny = (node: unknown): unknown => {
    if (maybeField(node)) return wireFieldNode(node);

    if (maybeFieldArray(node)) return node;

    if (maybeFieldSet(node)) {
      const shaped = {} as Record<string, unknown>;
      for (const [k, child] of Object.entries((node as FieldSet<any>).fields)) {
        shaped[k] = wireAny(child);
      }
      return { fields: shaped };
    }

    if (!isPlainObject(node)) return node;

    const out: Record<string, unknown> = {};
    for (const [k, child] of Object.entries(node)) {
      out[k] = wireAny(child);
    }
    return out;
  };

  const wireFieldNode = <T>(field: Field<T>): FieldAccessor<T> => {
    return {
      value: () => field.$value.value(),
      meta: () => field.$meta.value(),
      set: (next) => field.set(next),
      reset: (next) => field.reset(next),
      handlers: field.bind(),
      validate: () => field.validate(),
      validateAsync: () => field.validateAsync(),
      clearErrors: () => field.clearErrors(),
    };
  };

  const wired = {} as Record<string, unknown>;

  // Top-level retains property names (`name`, ...), not `{ fields }`.
  for (const [k, child] of Object.entries(fields)) {
    wired[k] = wireAny(child);
  }

  return wired as FieldTreeWire<TTree> & WireFormModel<TTree>;
};
