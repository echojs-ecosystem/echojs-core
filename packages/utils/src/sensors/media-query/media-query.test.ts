import { describe, expect, it } from "vitest";

import { mockMatchMedia } from "../../test-utils";
import { mediaQuery as createMediaQuery } from "./media-query";

describe("mediaQuery", () => {
  it("tracks media query matches", () => {
    const mql = mockMatchMedia(false);
    const mq = createMediaQuery("(prefers-color-scheme: dark)");
    expect(mq.matches()).toBe(false);

    mql.dispatch(true);
    expect(mq.matches()).toBe(true);
    mq.dispose();
  });
});
