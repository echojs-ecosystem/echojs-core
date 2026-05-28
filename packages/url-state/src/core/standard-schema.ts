/** Minimal Standard Schema v1 shape (Zod 4, Valibot, ArkType, …). */
export type StandardSchemaLike<T = unknown> = {
  "~standard": {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (value: unknown) => StandardSchemaResult<T>;
  };
};

type StandardSchemaResult<T> =
  | { readonly value: T; readonly issues?: undefined }
  | { readonly issues: ReadonlyArray<{ readonly message: string }> };

export type JsonSchema<T> = StandardSchemaLike<T> | ((value: unknown) => T | null);

const isStandardSchema = <T>(schema: JsonSchema<T>): schema is StandardSchemaLike<T> =>
  typeof schema === "object" && schema !== null && "~standard" in schema;

export const validateJsonSchema = <T>(schema: JsonSchema<T> | undefined, value: unknown): T | null => {
  if (!schema) return value as T;

  if (typeof schema === "function") {
    try {
      return schema(value);
    } catch {
      return null;
    }
  }

  const result = schema["~standard"].validate(value);
  if (result && "value" in result && result.issues === undefined) {
    return result.value;
  }
  return null;
};
