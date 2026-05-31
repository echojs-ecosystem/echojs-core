import { describe, expect, it } from "vitest";

import {
  isLocaleImporter,
  resolveLocaleModule,
  resolveLocaleModuleSync,
} from "./locale-source";

describe("locale-source", () => {
  it("detects importer vs eager object", () => {
    expect(isLocaleImporter({ hello: "world" })).toBe(false);
    expect(isLocaleImporter(async () => ({ hello: "world" }))).toBe(true);
  });

  it("resolves eager locale synchronously", () => {
    const messages = { ok: "yes" };
    expect(resolveLocaleModuleSync(messages)).toEqual(messages);
    expect(resolveLocaleModuleSync(async () => messages)).toBeUndefined();
  });

  it("resolves importer result", async () => {
    const messages = { from: "importer" };
    await expect(resolveLocaleModule(async () => messages)).resolves.toEqual(messages);
  });

  it("unwraps default export from importer", async () => {
    const messages = { from: "module" };
    await expect(
      resolveLocaleModule(async () => ({ default: messages })),
    ).resolves.toEqual(messages);
  });
});
