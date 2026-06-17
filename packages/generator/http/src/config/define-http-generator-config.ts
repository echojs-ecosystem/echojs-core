import type { HttpGeneratorConfig, HttpGeneratorPluginToggle, ResolvedHttpGeneratorConfig } from "./types";
import type { ResolvedAsyncGeneratorDefaults } from "./async-types";

function resolvePluginToggle<T extends Record<string, unknown>>(
  value: HttpGeneratorPluginToggle<T> | undefined,
  defaults: { enabled: false } & Required<T>,
): { enabled: boolean } & Required<T> {
  if (value === undefined || value === false) {
    return { ...defaults, enabled: false };
  }

  if (value === true) {
    return { ...defaults, enabled: true };
  }

  return {
    ...defaults,
    ...value,
    enabled: value.enabled ?? true,
  } as { enabled: boolean } & Required<T>;
}

function resolveAsyncDefaults(
  defaults: import("./async-types").AsyncGeneratorDefaultsConfig | undefined,
): ResolvedAsyncGeneratorDefaults {
  return {
    query: defaults?.query ?? {},
    infiniteQuery: defaults?.infiniteQuery ?? {},
    mutation: defaults?.mutation ?? {},
  };
}

export function defineHttpGeneratorConfig(config: HttpGeneratorConfig): ResolvedHttpGeneratorConfig {
  return {
    ...config,
    client: {
      importPath: config.client.importPath,
      exportName: config.client.exportName,
      access: config.client.access,
      typesImportPath: config.client.typesImportPath ?? "@echojs-ecosystem/network/http",
    },
    baseUrl: config.baseUrl ?? "",
    grouping: config.grouping ?? "tag",
    naming: {
      operation: config.naming?.operation ?? "camelCase",
      models: config.naming?.models ?? "pascalCase",
      files: config.naming?.files ?? "kebabCase",
      modelFiles: config.naming?.modelFiles ?? "kebabCase",
    },
    plugins: {
      zod: resolvePluginToggle(config.plugins?.zod, { enabled: false, path: "schemas" }),
      msw: resolvePluginToggle(config.plugins?.msw, {
        enabled: false,
        path: "mocks",
        handlers: true,
      }),
      async: (() => {
        const pluginConfig = config.plugins?.async;

        if (pluginConfig === undefined || pluginConfig === false) {
          return {
            enabled: false,
            path: "async",
            importPath: "@echojs-ecosystem/async",
            queryKeys: undefined,
            defaults: resolveAsyncDefaults(undefined),
          };
        }

        const options = pluginConfig === true ? {} : pluginConfig;

        return {
          enabled: options.enabled ?? true,
          path: options.path ?? "async",
          importPath: options.importPath ?? "@echojs-ecosystem/async",
          queryKeys: options.queryKeys,
          defaults: resolveAsyncDefaults(options.defaults),
        };
      })(),
    },
    hooks: {
      afterGenerate: config.hooks?.afterGenerate ?? [],
    },
  };
}
