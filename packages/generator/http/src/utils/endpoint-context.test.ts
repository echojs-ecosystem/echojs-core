import { describe, expect, it } from "vitest";

import { buildClientExpression, resolveModuleImportPath } from "./endpoint-context";

describe("endpoint-context", () => {
  it("builds client expressions for variable and function access", () => {
    expect(buildClientExpression("variable", "http")).toBe("http");
    expect(buildClientExpression("function", "getHttpClient")).toBe("getHttpClient()");
  });

  it("resolves relative imports from generated endpoint files", () => {
    const importPath = resolveModuleImportPath(
      "/project/src/generated/api/endpoints/users/get-user.ts",
      "/project",
      "./src/core/http-client.ts",
    );

    expect(importPath).toBe("../../../../core/http-client");
  });

  it("keeps package imports unchanged", () => {
    expect(resolveModuleImportPath("/any/file.ts", "/project", "@echojs-ecosystem/network/http")).toBe(
      "@echojs-ecosystem/network/http",
    );
  });
});
