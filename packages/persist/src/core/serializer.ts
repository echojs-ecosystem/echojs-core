import type { Serializer } from "./types";

export const jsonSerializer: Serializer<unknown> = {
  serialize(value) {
    return JSON.stringify(value);
  },
  deserialize(value) {
    try {
      return JSON.parse(value) as unknown;
    } catch (error) {
      throw new Error("jsonSerializer.deserialize: invalid JSON", { cause: error });
    }
  },
};

export const createJsonSerializer = <T>(): Serializer<T> => {
  return jsonSerializer as Serializer<T>;
};
