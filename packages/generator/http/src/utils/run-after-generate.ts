import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function runAfterGenerateHooks(commands: string[], cwd: string): Promise<void> {
  for (const command of commands) {
    const { stderr, stdout } = await execAsync(command, { cwd, env: process.env });
    if (stdout.trim()) {
      console.log(stdout.trimEnd());
    }
    if (stderr.trim()) {
      console.error(stderr.trimEnd());
    }
  }
}
