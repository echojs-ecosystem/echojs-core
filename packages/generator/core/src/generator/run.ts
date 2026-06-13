import { build, type UserConfig } from "@kubb/core";

export interface GeneratorRunOptions {
  config: UserConfig;
  cwd?: string;
}

export interface GeneratorRunResult {
  files: string[];
  failed: boolean;
  error?: Error;
}

export async function runGenerator({ config, cwd = process.cwd() }: GeneratorRunOptions): Promise<GeneratorRunResult> {
  const previousCwd = process.cwd();

  try {
    if (cwd !== previousCwd) {
      process.chdir(cwd);
    }

    const result = await build({ config });

    return {
      files: result.files.map((file) => file.path),
      failed: result.failedPlugins.size > 0 || Boolean(result.error),
      error: result.error,
    };
  } finally {
    if (cwd !== previousCwd) {
      process.chdir(previousCwd);
    }
  }
}
