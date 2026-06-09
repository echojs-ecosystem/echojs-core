import { describe, expect, it } from "vitest";

import { documentTitle as createDocumentTitle } from "./document-title";

describe("documentTitle", () => {
  it("sets and restores document title", () => {
    const previous = document.title;
    const title = createDocumentTitle("EchoJS");
    expect(title.value()).toBe("EchoJS");
    expect(document.title).toBe("EchoJS");

    title.set("Updated");
    expect(document.title).toBe("Updated");

    title.dispose();
    expect(document.title).toBe(previous);
  });
});
