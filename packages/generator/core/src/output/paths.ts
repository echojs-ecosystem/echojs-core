import path from "node:path";

export function resolveOutputRoot(cwd: string, output: string): string {
  return path.resolve(cwd, output);
}

export function joinOutputPath(root: string, ...segments: string[]): string {
  return path.join(root, ...segments);
}
