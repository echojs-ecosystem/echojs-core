import { describe, expect, it } from "vitest";

import { getMessageByPath } from "./path";

describe("getMessageByPath", () => {
  it("resolves nested paths", () => {
    const messages = {
      common: { save: "Save" },
      users: { profile: { edit: "Edit profile" } },
    };

    expect(getMessageByPath(messages, "common.save")).toBe("Save");
    expect(getMessageByPath(messages, "users.profile.edit")).toBe("Edit profile");
    expect(getMessageByPath(messages, "missing")).toBeUndefined();
  });
});
