import { describe, expect, it } from "vitest";
import { abstraction } from "../abstraction";
import { defineConfig } from "./define-config";

describe("defineConfig", () => {
  it("returns the same config object", () => {
    const config = defineConfig({
      root: abstraction("root"),
      baseUrl: "./src",
      files: ["**/*.ts"],
      ignores: ["**/dist/**"],
    });

    expect(config.baseUrl).toBe("./src");
    expect(config.root.name).toBe("root");
    expect(config.files).toEqual(["**/*.ts"]);
  });
});
