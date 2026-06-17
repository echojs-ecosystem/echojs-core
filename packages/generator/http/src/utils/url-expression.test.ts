import { describe, expect, it } from "vitest";

import { buildUrlPathExpression, extractPathParamNames } from "./url-expression";

describe("url-expression", () => {
  it("returns a string literal for static paths", () => {
    expect(buildUrlPathExpression("/api/v1/users", [])).toBe('"/api/v1/users"');
  });

  it("builds template literals for path params", () => {
    expect(buildUrlPathExpression("/api/v1/media_tasks/{id}", ["id"])).toBe(
      "`/api/v1/media_tasks/${encodeURIComponent(String(params.id))}`",
    );
  });

  it("extracts path param names", () => {
    expect(extractPathParamNames("/users/{id}/posts/{postId}")).toEqual(["id", "postId"]);
  });
});
