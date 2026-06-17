import type { AsyncGeneratorDefaultValue } from "../config/async-types";

export function serializeTsValue(value: AsyncGeneratorDefaultValue, indent = 0): string {
  if (value === null) {
    return "null";
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    const pad = " ".repeat(indent + 2);
    const items = value.map((item) => `${pad}${serializeTsValue(item, indent + 2)}`).join(",\n");
    return `[\n${items},\n${" ".repeat(indent)}]`;
  }

  const entries = Object.entries(value);
  if (entries.length === 0) {
    return "{}";
  }

  const pad = " ".repeat(indent + 2);
  const props = entries
    .map(([key, nested]) => {
      const property = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      return `${pad}${property}: ${serializeTsValue(nested, indent + 2)}`;
    })
    .join(",\n");

  return `{\n${props},\n${" ".repeat(indent)}}`;
}

export function serializeTsObjectLiteral(value: Record<string, AsyncGeneratorDefaultValue>): string {
  if (Object.keys(value).length === 0) {
    return "";
  }

  return serializeTsValue(value);
}

export function hasSerializedDefaults(value: Record<string, AsyncGeneratorDefaultValue>): boolean {
  return Object.keys(value).length > 0;
}
