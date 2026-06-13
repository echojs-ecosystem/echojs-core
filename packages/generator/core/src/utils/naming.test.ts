import { describe, expect, it } from "vitest";

import { camelCase, kebabCase, operationNameFromPath, pascalCase, resolveOperationName } from "./naming";

describe("naming", () => {
  it("converts strings to camelCase", () => {
    expect(camelCase("get_user")).toBe("getUser");
    expect(camelCase("GetUser")).toBe("getUser");
  });

  it("converts strings to pascalCase", () => {
    expect(pascalCase("user_profile")).toBe("UserProfile");
  });

  it("converts strings to kebabCase", () => {
    expect(kebabCase("getUser")).toBe("get-user");
  });

  it("derives operation names from path when operationId is missing", () => {
    expect(operationNameFromPath("get", "/users/{id}")).toBe("getUser");
    expect(operationNameFromPath("post", "/users")).toBe("createUser");
    expect(operationNameFromPath("delete", "/users/{id}")).toBe("deleteUser");
  });

  it("prefers operationId over path fallback", () => {
    expect(resolveOperationName("getUser", "get", "/users/{id}")).toBe("getUser");
    expect(resolveOperationName(undefined, "get", "/users/{id}")).toBe("getUser");
  });
});
