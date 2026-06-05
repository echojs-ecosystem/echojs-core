import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import { parseDependenciesMap } from "./parse";
import { buildVfs } from "../testing/vfs-fixture";

describe("parseDependenciesMap", () => {
  it("builds dependency graph from real imports", async () => {
    const root = await mkdtemp(join(tmpdir(), "architect-deps-"));
    const src = join(root, "src");
    const sharedDir = join(src, "shared");
    const featuresDir = join(src, "features");
    await mkdir(sharedDir, { recursive: true });
    await mkdir(featuresDir, { recursive: true });

    const sharedFile = join(sharedDir, "format.ts");
    const featureFile = join(featuresDir, "profile.ts");

    await writeFile(sharedFile, "export const format = () => 'ok'", "utf8");
    await writeFile(
      featureFile,
      `import { format } from "../shared/format"`,
      "utf8",
    );
    await writeFile(
      join(root, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          moduleResolution: "Bundler",
        },
      }),
      "utf8",
    );

    const vfs = buildVfs(src, [sharedFile, featureFile]);
    const map = await parseDependenciesMap(vfs);

    expect([...map.dependencies[featureFile]!]).toEqual([sharedFile]);
    expect([...map.dependencyFor[sharedFile]!]).toEqual([featureFile]);
  });
});
