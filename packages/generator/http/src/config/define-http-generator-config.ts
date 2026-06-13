import type { HttpGeneratorConfig, ResolvedHttpGeneratorConfig } from "./types";

export function defineHttpGeneratorConfig(config: HttpGeneratorConfig): ResolvedHttpGeneratorConfig {
  return {
    ...config,
    client: {
      importPath: config.client.importPath,
      exportName: config.client.exportName,
      access: config.client.access,
      typesImportPath: config.client.typesImportPath ?? "@echojs-ecosystem/network/http",
    },
    grouping: config.grouping ?? "tag",
    naming: {
      operation: config.naming?.operation ?? "camelCase",
      models: config.naming?.models ?? "pascalCase",
      files: config.naming?.files ?? "kebabCase",
    },
  };
}
