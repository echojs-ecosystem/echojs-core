import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import { resolveImport } from "./resolve-import";

describe("resolveImport", () => {
  it("resolves relative imports", async () => {
    const root = await mkdtemp(join(tmpdir(), "architect-resolve-"));
    const srcDir = join(root, "src");
    const sharedDir = join(srcDir, "shared");
    await mkdir(sharedDir, { recursive: true });

    const importer = join(srcDir, "features", "profile.ts");
    const target = join(sharedDir, "format.ts");
    await mkdir(join(srcDir, "features"), { recursive: true });
    await writeFile(importer, `import { format } from "../shared/format"`, "utf8");
    await writeFile(target, "export const format = () => null", "utf8");

    const resolved = resolveImport(
      "../shared/format",
      importer,
      { baseUrl: root, moduleResolution: "Bundler" },
      existsSync,
      existsSync,
    );

    expect(resolved).toBe(target);
  });

  it("resolves path aliases from tsconfig", async () => {
    const root = await mkdtemp(join(tmpdir(), "architect-alias-"));
    const srcDir = join(root, "src");
    const sharedDir = join(srcDir, "shared");
    await mkdir(sharedDir, { recursive: true });

    const importer = join(srcDir, "app.ts");
    const target = join(sharedDir, "index.ts");
    await writeFile(importer, `import { x } from "@/shared"`, "utf8");
    await writeFile(target, "export const x = 1", "utf8");
    await writeFile(
      join(root, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
          moduleResolution: "Bundler",
        },
      }),
      "utf8",
    );

    const resolved = resolveImport(
      "@/shared",
      importer,
      {
        baseUrl: root,
        paths: { "@/*": ["./src/*"] },
        moduleResolution: "Bundler",
      },
      existsSync,
      existsSync,
    );

    expect(resolved).toBe(target);
  });
});
