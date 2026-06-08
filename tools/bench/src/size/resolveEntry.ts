import { readFile } from "node:fs/promises";
import { join } from "node:path";

type ExportsField =
  | string
  | { default?: string; types?: string }
  | Record<string, unknown>
  | undefined;

export async function resolveEntry(opts: {
  root: string;
  packageDirName: string;
  from: "src" | "dist";
}): Promise<{ entry: string; absEntryPath: string }> {
  const { root, packageDirName, from } = opts;

  const pkgAbs = join(root, "packages", packageDirName);
  if (from === "src") {
    const absEntryPath = join(pkgAbs, "src", "index.ts");
    return { entry: `packages/${packageDirName}/src/index.ts`, absEntryPath };
  }

  const pkgJsonPath = join(pkgAbs, "package.json");
  const pkgJson = JSON.parse(await readFile(pkgJsonPath, "utf8")) as {
    exports?: Record<string, ExportsField>;
    main?: string;
    module?: string;
  };

  const exp = pkgJson.exports?.["."] as ExportsField;
  const guess =
    (typeof exp === "string" ? exp : typeof exp === "object" && exp ? (exp as { default?: string }).default : undefined) ??
    pkgJson.module ??
    pkgJson.main ??
    "./dist/index";

  const absEntryPath = join(pkgAbs, guess);
  return { entry: `packages/${packageDirName}/${guess.replace(/^\.\//, "")}`, absEntryPath };
}

