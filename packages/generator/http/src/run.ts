import { runGenerator } from "../../core/src/generator/run";
import type { ResolvedHttpGeneratorConfig } from "./config/types";
import { createKubbConfig } from "./kubb/create-kubb-config";

export interface RunHttpGeneratorOptions {
  config: ResolvedHttpGeneratorConfig;
  cwd?: string;
}

export async function runHttpGenerator({ config, cwd = process.cwd() }: RunHttpGeneratorOptions) {
  return runGenerator({
    config: createKubbConfig({ config, cwd }),
    cwd,
  });
}
