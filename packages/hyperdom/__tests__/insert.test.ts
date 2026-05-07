import { describe, expect, it } from "vitest";
import { clearBetween } from "../src/dom/clear-between";
import { collectBetween } from "../src/dom/collect-between";
import { insertNode } from "../src/dom/insert-node";
import { removeNode } from "../src/dom/remove-node";

describe("dom/insert", () => {
  it("insertNode inserts before a reference node", () => {
    const parent = document.createElement("div");
    const a = document.createElement("span");
    a.textContent = "a";
    const b = document.createElement("span");
    b.textContent = "b";

    parent.appendChild(a);
    insertNode(parent, b, a);

    expect(parent.childNodes[0]).toBe(b);
    expect(parent.childNodes[1]).toBe(a);
  });

  it("insertNode appends when before is null", () => {
    const parent = document.createElement("div");
    const a = document.createElement("span");
    const b = document.createElement("span");

    insertNode(parent, a, null);
    insertNode(parent, b, null);

    expect(parent.childNodes[0]).toBe(a);
    expect(parent.childNodes[1]).toBe(b);
  });

  it("removeNode is a no-op when node has no parent", () => {
    const n = document.createElement("div");
    expect(() => removeNode(n)).not.toThrow();
  });

  it("clearBetween removes siblings between markers (exclusive)", () => {
    const parent = document.createElement("div");
    const start = document.createComment("start");
    const end = document.createComment("end");
    const mid1 = document.createElement("span");
    const mid2 = document.createTextNode("x");

    parent.append(start, mid1, mid2, end);

    clearBetween(start, end);

    expect(parent.childNodes.length).toBe(2);
    expect(parent.childNodes[0]).toBe(start);
    expect(parent.childNodes[1]).toBe(end);
  });

  it("collectBetween collects siblings between markers (exclusive)", () => {
    const parent = document.createElement("div");
    const start = document.createComment("start");
    const end = document.createComment("end");
    const mid1 = document.createElement("span");
    const mid2 = document.createTextNode("x");

    parent.append(start, mid1, mid2, end);

    expect(collectBetween(start, end)).toEqual([mid1, mid2]);
  });
});

