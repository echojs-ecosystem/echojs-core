import { runGenerator } from "../../core/src/generator/run";
import type { ResolvedHttpGeneratorConfig } from "./config/types";
import { createKubbConfig } from "./kubb/create-kubb-config";
import { runAfterGenerateHooks } from "./utils/run-after-generate";

export interface RunHttpGeneratorOptions {
  config: ResolvedHttpGeneratorConfig;
  cwd?: string;
}

export async function runHttpGenerator({ config, cwd = process.cwd() }: RunHttpGeneratorOptions) {
  const result = await runGenerator({
    config: createKubbConfig({ config, cwd }),
    cwd,
  });

  if (!result.failed && config.hooks.afterGenerate.length > 0) {
    await runAfterGenerateHooks(config.hooks.afterGenerate, cwd);
  }

  return result;
}
