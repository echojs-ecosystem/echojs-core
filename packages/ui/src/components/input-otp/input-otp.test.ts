// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { InputOtp } from "./index";

describe("InputOtp", () => {
  it("renders OTP cells", () => {
    const node = InputOtp({ length: 4, value: "12" }) as HTMLDivElement;
    const inputs = node.querySelectorAll("input");
    expect(inputs.length).toBe(4);
    expect(inputs[0]?.value).toBe("1");
    expect(inputs[1]?.value).toBe("2");
  });
});
