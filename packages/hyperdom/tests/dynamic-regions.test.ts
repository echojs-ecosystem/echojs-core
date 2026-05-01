import { describe, expect, it } from "vitest";
import { signal } from "@echojs-ecosystem/reactivity";
import { h } from "../src/h";
import { render } from "../src/render";

describe("dynamic regions", () => {
  it("удаляет/добавляет DOM внутри региона без затрагивания соседей", async () => {
    const container = document.createElement("div");
    const flag = signal(true);

    const view = h("div", null, [
      h("span", { id: "left" }, "L"),
      () => (flag.value() ? h("span", { id: "mid" }, "M") : null),
      h("span", { id: "right" }, "R"),
    ]);

    render(view, container);
    const root = container.firstElementChild as HTMLDivElement;

    expect(root.querySelector("#left")?.textContent).toBe("L");
    expect(root.querySelector("#mid")?.textContent).toBe("M");
    expect(root.querySelector("#right")?.textContent).toBe("R");

    flag.set(false);
    await Promise.resolve();
    expect(root.querySelector("#left")?.textContent).toBe("L");
    expect(root.querySelector("#mid")).toBe(null);
    expect(root.querySelector("#right")?.textContent).toBe("R");
  });

  it("обновление региона не накапливает маркеры", async () => {
    const container = document.createElement("div");
    const n = signal(0);

    const view = h("div", null, () => h("span", null, String(n.value())));
    render(view, container);

    const root = container.firstElementChild as HTMLDivElement;
    expect(root.textContent).toBe("0");

    n.set(1);
    await Promise.resolve();
    expect(root.textContent).toBe("1");

    n.set(2);
    await Promise.resolve();
    expect(root.textContent).toBe("2");

    // маркеры — это Comment nodes; проверяем, что их не становится больше со временем
    const commentCount = Array.from(root.childNodes).filter((x) => x.nodeType === Node.COMMENT_NODE)
      .length;
    expect(commentCount).toBeLessThanOrEqual(2);
  });
});

