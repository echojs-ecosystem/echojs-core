import { describe, expect, it } from "vitest";

import { online as createOnline } from "./online";

describe("online", () => {
  it("reflects navigator.onLine", () => {
    const online = createOnline();
    expect(online.value()).toBe(navigator.onLine);
    online.dispose();
  });
});
