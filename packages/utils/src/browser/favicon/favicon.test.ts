import { describe, expect, it } from "vitest";

import { favicon as createFavicon } from "./favicon";

describe("favicon", () => {
  it("updates favicon link", () => {
    const favicon = createFavicon("/favicon.svg");
    const link = document.querySelector<HTMLLinkElement>('link[rel*="icon"]');
    expect(link?.href).toContain("/favicon.svg");

    favicon.set("/dark.svg");
    expect(link?.href).toContain("/dark.svg");
    favicon.dispose();
  });
});
