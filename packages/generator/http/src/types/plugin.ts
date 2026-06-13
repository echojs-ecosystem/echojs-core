import type { Group, Output, PluginFactoryOptions } from "@kubb/core";
import type { Oas } from "@kubb/oas";

import type { HttpGrouping, ResolvedHttpGeneratorConfig } from "../config/types";

export interface PluginEchoHttpOptions {
  output?: Output<Oas>;
  group?: Group | false;
  client?: ResolvedHttpGeneratorConfig["client"];
  grouping?: HttpGrouping;
  naming?: ResolvedHttpGeneratorConfig["naming"];
}

export interface ResolvedPluginEchoHttpOptions {
  output: Output<Oas>;
  group: Group | false;
  client: ResolvedHttpGeneratorConfig["client"];
  grouping: HttpGrouping;
  naming: ResolvedHttpGeneratorConfig["naming"];
}

export type PluginEchoHttp = PluginFactoryOptions<
  "plugin-echo-http",
  PluginEchoHttpOptions,
  ResolvedPluginEchoHttpOptions
>;
