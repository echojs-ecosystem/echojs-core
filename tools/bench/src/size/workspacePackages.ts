import { readdir } from "node:fs/promises";
import { join } from "node:path";

export type WorkspacePackage = {
  dirName: string;
  absPath: string;
  packageJsonPath: string;
};

export async function listWorkspacePackages(root: string): Promise<WorkspacePackage[]> {
  const packagesDir = join(root, "packages");
  const entries = await readdir(packagesDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => {
      const absPath = join(packagesDir, e.name);
      return {
        dirName: e.name,
        absPath,
        packageJsonPath: join(absPath, "package.json"),
      };
    });
}

