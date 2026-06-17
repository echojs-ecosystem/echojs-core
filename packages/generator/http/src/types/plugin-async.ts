import type { Group, Output, PluginFactoryOptions } from "@kubb/core";
import type { Oas } from "@kubb/oas";

import type { HttpGrouping, ResolvedHttpGeneratorConfig } from "../config/types";
import type { ResolvedAsyncGeneratorDefaults } from "../config/async-types";

export interface PluginEchoAsyncOptions {
  output?: Output<Oas>;
  group?: Group | false;
  grouping?: HttpGrouping;
  naming?: ResolvedHttpGeneratorConfig["naming"];
  importPath?: string;
  defaults?: ResolvedAsyncGeneratorDefaults;
  queryKeys?: {
    importPath?: string;
    exportName?: string;
  };
}

export interface ResolvedPluginEchoAsyncOptions {
  output: Output<Oas>;
  group: Group | false;
  grouping: HttpGrouping;
  naming: ResolvedHttpGeneratorConfig["naming"];
  importPath: string;
  defaults: ResolvedAsyncGeneratorDefaults;
  queryKeys?: {
    importPath: string;
    exportName: string;
  };
}

export type PluginEchoAsync = PluginFactoryOptions<
  "plugin-echo-async",
  PluginEchoAsyncOptions,
  ResolvedPluginEchoAsyncOptions
>;
