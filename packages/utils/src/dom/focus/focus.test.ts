import { describe, expect, it } from "vitest";

import { signal } from "@echojs-ecosystem/reactivity";

import { focus as createFocus } from "./focus";

describe("focus", () => {
  it("tracks focus state", () => {
    const input = document.createElement("input");
    document.body.appendChild(input);
    const focus = createFocus(signal(input));
    input.focus();
    expect(focus.focused()).toBe(true);
    input.blur();
    expect(focus.focused()).toBe(false);
    focus.dispose();
    document.body.removeChild(input);
  });
});
