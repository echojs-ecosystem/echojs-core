import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function resolveRuntimeDir(): string {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(moduleDir, "runtime"),
    path.resolve(moduleDir, "../runtime"),
    path.resolve(moduleDir, "../../runtime"),
  ];

  const match = candidates.find((candidate) => existsSync(path.join(candidate, "build-path.ts")));
  if (!match) {
    throw new Error("Echo HTTP generator runtime directory was not found.");
  }

  return match;
}

export function readBuildPathSource(): string {
  return readFileSync(path.join(resolveRuntimeDir(), "build-path.ts"), "utf8");
}
