import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getFlattenFiles } from "./get-flatten-files";
import { buildVfs, projectRoot } from "../testing/vfs-fixture";

describe("getFlattenFiles", () => {
  it("returns single file for file node", () => {
    const file = join(projectRoot(), "index.ts");
    const vfs = buildVfs(projectRoot(), [file]);

    expect(getFlattenFiles(vfs)).toEqual([{ type: "file", path: file }]);
  });

  it("flattens nested folders", () => {
    const root = projectRoot();
    const files = [
      join(root, "index.ts"),
      join(root, "shared", "a.ts"),
      join(root, "shared", "b.ts"),
    ];
    const vfs = buildVfs(root, files);

    expect(getFlattenFiles(vfs).map((file) => file.path).sort()).toEqual(
      files.sort(),
    );
  });
});
