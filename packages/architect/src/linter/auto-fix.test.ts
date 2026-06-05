import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { describe, expect, it } from "vitest";
import { applyAutofixes } from "./auto-fix";
import type { Diagnostic } from "../rule/types";

describe("applyAutofixes", () => {
  it("creates folder and file fixes", async () => {
    const root = await mkdtemp(join(tmpdir(), "architect-autofix-"));
    const folderPath = join(root, "new-folder");
    const filePath = join(root, "new-file.ts");

    const diagnostics: Diagnostic[] = [
      {
        message: "missing folder",
        location: { path: folderPath },
        fixes: [{ type: "create-folder", path: folderPath }],
      },
      {
        message: "missing file",
        location: { path: filePath },
        fixes: [{ type: "create-file", path: filePath, content: "export {}" }],
      },
    ];

    const remaining = await applyAutofixes(diagnostics);

    expect(remaining).toHaveLength(0);
    await access(folderPath);
    expect(await readFile(filePath, "utf8")).toBe("export {}");
  });

  it("returns diagnostics without fixes unchanged", async () => {
    const diagnostic: Diagnostic = {
      message: "manual fix required",
      location: { path: "/tmp/manual.ts" },
    };

    const remaining = await applyAutofixes([diagnostic]);
    expect(remaining).toEqual([diagnostic]);
  });

  it("modifies existing file content", async () => {
    const root = await mkdtemp(join(tmpdir(), "architect-modify-"));
    const filePath = join(root, "module.ts");
    await writeFile(filePath, "old", "utf8");

    const remaining = await applyAutofixes([
      {
        message: "update file",
        location: { path: filePath },
        fixes: [{ type: "modify-file", path: filePath, content: "new" }],
      },
    ]);

    expect(remaining).toHaveLength(0);
    expect(await readFile(filePath, "utf8")).toBe("new");
  });

  it("keeps diagnostics when fix fails", async () => {
    const root = await mkdtemp(join(tmpdir(), "architect-fail-"));
    await mkdir(root, { recursive: true });
    const missingParent = join(root, "missing", "file.ts");

    const diagnostic: Diagnostic = {
      message: "cannot create",
      location: { path: missingParent },
      fixes: [{ type: "create-file", path: missingParent, content: "x" }],
    };

    const remaining = await applyAutofixes([diagnostic]);
    expect(remaining).toHaveLength(1);
  });
});
