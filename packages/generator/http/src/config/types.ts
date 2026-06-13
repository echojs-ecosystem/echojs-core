import type { BaseGeneratorConfig, GeneratorNamingConfig } from "../../../core/src/config/types";

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

export interface HttpGeneratorConfig extends BaseGeneratorConfig {
  client: HttpClientGeneratorConfig;
  grouping?: HttpGrouping;
  naming?: GeneratorNamingConfig & {
    files?: "kebabCase" | "camelCase";
  };
}

export interface ResolvedHttpGeneratorConfig extends HttpGeneratorConfig {
  client: ResolvedHttpClientGeneratorConfig;
  grouping: HttpGrouping;
  naming: Required<GeneratorNamingConfig> & { files: "kebabCase" | "camelCase" };
}
