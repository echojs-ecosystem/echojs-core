import { describe, expect, it } from "vitest";

import { defineHttpGeneratorConfig } from "../config/define-http-generator-config";
import { resolveGeneratedName } from "./resolve-generated-name";

const naming = defineHttpGeneratorConfig({
  input: "./openapi.yaml",
  output: "./generated",
  client: { importPath: "./http.ts", exportName: "http", access: "variable" },
}).naming;

describe("resolveGeneratedName", () => {
  it("keeps PascalCase for generated types", () => {
    expect(resolveGeneratedName("createUser201", "type", naming)).toBe("CreateUser201");
    expect(resolveGeneratedName("user", "type", naming)).toBe("User");
  });

  it("uses kebab-case for model files", () => {
    expect(resolveGeneratedName("CreateUser", "file", naming)).toBe("create-user");
  });

  it("uses PascalCase for schema identifiers (Kubb resolves them as function type)", () => {
    expect(resolveGeneratedName("user", "function", naming)).toBe("User");
    expect(resolveGeneratedName("createUserRequest", "function", naming)).toBe("CreateUserRequest");
  });
});
