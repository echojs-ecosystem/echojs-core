import type { BaseGeneratorConfig, GeneratorNamingConfig } from "../../../core/src/config/types";

import type { AsyncGeneratorDefaultsConfig } from "./async-types";

export type HttpGrouping = "tag" | "none";

/** How generated endpoints access the HTTP client export. */
export type HttpClientAccess = "variable" | "function";

export interface HttpClientGeneratorConfig {
  /** Module path or package import where the client is exported from. */
  importPath: string;
  /** Export name: `http`, `httpClient`, `getHttpClient`, etc. */
  exportName: string;
  /** Use a ready client export (`variable`) or call a getter (`function`). */
  access: HttpClientAccess;
  /** Module for `RequestOptions` type imports. Defaults to `@echojs-ecosystem/network/http`. */
  typesImportPath?: string;
}

export interface ResolvedHttpClientGeneratorConfig {
  importPath: string;
  exportName: string;
  access: HttpClientAccess;
  typesImportPath: string;
}

export type HttpGeneratorPluginToggle<T = Record<string, unknown>> =
  | boolean
  | ({ enabled?: boolean } & T);

export interface HttpGeneratorPluginsConfig {
  /** Generate Zod schemas via `@kubb/plugin-zod`. */
  zod?: HttpGeneratorPluginToggle<{ path?: string }>;
  /** Generate MSW handlers via `@kubb/plugin-msw`. */
  msw?: HttpGeneratorPluginToggle<{ path?: string; handlers?: boolean }>;
  /** Generate `@echojs-ecosystem/async` query/mutation definitions. */
  async?: HttpGeneratorPluginToggle<{
    path?: string;
    /** Module import for `createQuery` / `createMutation` / `createInfiniteQuery`. */
    importPath?: string;
    /** Shared query-key factory import (optional). */
    queryKeys?: {
      importPath: string;
      exportName: string;
    };
    /** Base config merged into every generated definition. */
    defaults?: AsyncGeneratorDefaultsConfig;
  }>;
}

export interface HttpGeneratorNamingConfig extends GeneratorNamingConfig {
  /** Endpoint file naming style. */
  files?: "kebabCase" | "camelCase";
  /** Model/type file naming style (`CreateUser.ts` vs `create-user.ts`). */
  modelFiles?: "kebabCase" | "camelCase" | "pascalCase";
}

export interface HttpGeneratorHooks {
  /** Shell commands executed after a successful generation run (`cwd` = app root). */
  afterGenerate?: string[];
}

export interface HttpGeneratorConfig extends BaseGeneratorConfig {
  client: HttpClientGeneratorConfig;
  /** Base URL for MSW handlers (`@kubb/plugin-msw`). Configure the HTTP client separately. */
  baseUrl?: string;
  grouping?: HttpGrouping;
  naming?: HttpGeneratorNamingConfig;
  plugins?: HttpGeneratorPluginsConfig;
  hooks?: HttpGeneratorHooks;
}

export interface ResolvedHttpGeneratorConfig extends HttpGeneratorConfig {
  client: ResolvedHttpClientGeneratorConfig;
  baseUrl: string;
  grouping: HttpGrouping;
  naming: Required<HttpGeneratorNamingConfig> & {
    files: "kebabCase" | "camelCase";
    modelFiles: "kebabCase" | "camelCase" | "pascalCase";
  };
  plugins: {
    zod: { enabled: boolean; path: string };
    msw: { enabled: boolean; path: string; handlers: boolean };
    async: {
      enabled: boolean;
      path: string;
      importPath: string;
      queryKeys?: { importPath: string; exportName: string };
      defaults: import("./async-types").ResolvedAsyncGeneratorDefaults;
    };
  };
  hooks: {
    afterGenerate: string[];
  };
}
