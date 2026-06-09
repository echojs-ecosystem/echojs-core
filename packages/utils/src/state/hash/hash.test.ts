import { describe, expect, it } from "vitest";

import { hash as createHash } from "./hash";

describe("hash", () => {
  it("syncs with location hash", () => {
    const hash = createHash();
    hash.set("section");
    expect(hash.value()).toBe("section");
    expect(window.location.hash).toBe("#section");
    hash.dispose();
    window.location.hash = "";
  });

  it("strips leading hash when setting", () => {
    const hash = createHash();
    hash.set("#about");
    expect(hash.value()).toBe("about");
    expect(window.location.hash).toBe("#about");
    hash.dispose();
    window.location.hash = "";
  });

  it("reacts to hashchange events", () => {
    const hash = createHash();
    window.location.hash = "#contact";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    expect(hash.value()).toBe("contact");
    hash.dispose();
    window.location.hash = "";
  });
});
