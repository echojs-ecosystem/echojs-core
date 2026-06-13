import type { BaseGeneratorConfig } from "./types";

export function defineGeneratorConfig<T extends BaseGeneratorConfig>(config: T): T {
  return config;
}
