const SPLIT_PATTERN = /[\s._-]+/;

export function toWords(input: string): string[] {
  const normalized = input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim();

  return normalized.split(SPLIT_PATTERN).filter(Boolean);
}

export function camelCase(input: string): string {
  const words = toWords(input);
  if (words.length === 0) return "";

  const [first = "", ...rest] = words;
  return [first.toLowerCase(), ...rest.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())].join("");
}

export function pascalCase(input: string): string {
  const words = toWords(input);
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
}

export function kebabCase(input: string): string {
  return toWords(input).map((word) => word.toLowerCase()).join("-");
}

export function snakeCase(input: string): string {
  return toWords(input).map((word) => word.toLowerCase()).join("_");
}

function singularize(resource: string): string {
  if (resource.endsWith("ies")) {
    return `${resource.slice(0, -3)}y`;
  }

  if (resource.endsWith("s") && resource.length > 1) {
    return resource.slice(0, -1);
  }

  return resource;
}

export function operationNameFromPath(method: string, path: string): string {
  const segments = path.split("/").filter(Boolean);
  const hasPathParam = segments.some((segment) => segment.startsWith("{"));
  const resourceSegments = segments.filter((segment) => !segment.startsWith("{"));
  const resource = resourceSegments.at(-1) ?? "resource";
  const entity = singularize(resource);

  switch (method.toLowerCase()) {
    case "get":
      return hasPathParam ? `get${pascalCase(entity)}` : `list${pascalCase(resource)}`;
    case "post":
      return `create${pascalCase(entity)}`;
    case "put":
    case "patch":
      return `update${pascalCase(entity)}`;
    case "delete":
      return `delete${pascalCase(entity)}`;
    default:
      return camelCase(`${method}_${path}`);
  }
}

export function resolveOperationName(operationId: string | undefined, method: string, path: string): string {
  if (operationId) {
    return camelCase(operationId);
  }

  return camelCase(operationNameFromPath(method, path));
}
