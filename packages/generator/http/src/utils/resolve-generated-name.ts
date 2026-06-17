import { camelCase, kebabCase, pascalCase, snakeCase } from "../../../core/src/utils/naming";
import type { ResolvedHttpGeneratorConfig } from "../config/types";

export type KubbResolveType = "file" | "function" | "type" | "const" | undefined;

export function resolveGeneratedName(
  name: string,
  type: KubbResolveType,
  naming: ResolvedHttpGeneratorConfig["naming"],
): string {
  if (type === "file") {
    switch (naming.modelFiles) {
      case "kebabCase":
        return kebabCase(name);
      case "camelCase":
        return camelCase(name);
      case "pascalCase":
      default:
        return pascalCase(name);
    }
  }

  switch (naming.models) {
    case "camelCase":
      return camelCase(name);
    case "kebabCase":
      return kebabCase(name);
    case "snakeCase":
      return snakeCase(name);
    case "pascalCase":
    default:
      return pascalCase(name);
  }
}
