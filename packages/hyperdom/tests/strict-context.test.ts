import { describe, expect, it } from "vitest";
import { h } from "../src/h";
import { render } from "../src/render";
import { createView } from "../src/view";
import { setStrictContextChecks } from "../src/config";

describe("strictContextChecks", () => {
  it("бросает ошибку при h() вне view/render контекста", () => {
    setStrictContextChecks(true);
    expect(() => h("div", null, "x")).toThrow(/outside of view\/render context/i);
    setStrictContextChecks(false);
  });

  it("разрешает h() внутри createView()", () => {
    setStrictContextChecks(true);
    const View = createView(() => h("div", null, "ok"));
    const node = View(undefined as void) as HTMLElement;
    expect(node.textContent).toBe("ok");
    setStrictContextChecks(false);
  });

  it("разрешает h() во время render() (динамический регион)", () => {
    setStrictContextChecks(true);
    const container = document.createElement("div");
    render(() => h("div", null, () => h("span", null, "ok")), container);
    expect(container.textContent).toBe("ok");
    setStrictContextChecks(false);
  });
});

