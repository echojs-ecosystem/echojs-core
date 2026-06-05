import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getNodesRecord } from "./get-nodes-record";
import { buildVfs, projectRoot } from "../testing/vfs-fixture";

describe("getNodesRecord", () => {
  it("indexes all files and folders", () => {
    const root = projectRoot();
    const file = join(root, "shared", "lib.ts");
    const vfs = buildVfs(root, [file]);
    const record = getNodesRecord(vfs);

    expect(Object.keys(record).sort()).toEqual(
      [join(root, "shared"), file].sort(),
    );
    expect(record[file]?.type).toBe("file");
    expect(record[join(root, "shared")]?.type).toBe("folder");
  });
});
