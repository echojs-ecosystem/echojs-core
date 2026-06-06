import type { ContentId } from "@core/content/types.js";

export type TestingAdvantage = {
  id: string;
  icon: string;
  title: string;
  summary: string;
  highlight: string;
  docId: ContentId;
};

export const testingModelExample = `import { describe, expect, it } from "vitest"
import { createCounterModel } from "./counter.model"

describe("CounterModel", () => {
  it("increments count", () => {
    const vm = createCounterModel()

    expect(vm.count()).toBe(0)
    vm.increment()
    expect(vm.count()).toBe(1)
  })

  it("resets to zero", () => {
    const vm = createCounterModel()
    vm.increment()
    vm.reset()

    expect(vm.count()).toBe(0)
  })
})`;

export const testingViewExample = `import { describe, expect, it } from "vitest"
import { render } from "@echojs-ecosystem/hyperdom"
import { CounterView } from "./counter.view"

describe("CounterView", () => {
  it("renders count from the VM", () => {
    const vm = { count: () => 3, increment: () => {} }
    const root = document.createElement("div")

    render(CounterView(vm), root)

    expect(root.textContent).toBe("3")
  })
})`;

export const testingHighlights = ["Vitest", "TypeScript", "No provider maze"] as const;

/** Landing-page digest — why model/view split makes testing straightforward. */
export const testingAdvantages: TestingAdvantage[] = [
  {
    id: "model-first",
    icon: "⚡",
    title: "Test models without mounting",
    summary:
      "Models are plain factories — call createXModel(), invoke actions, assert on accessors. No jsdom tree, no wrapper providers, no render cycle.",
    highlight: "Most unit tests never touch the DOM.",
    docId: "architecture/models",
  },
  {
    id: "thin-views",
    icon: "◫",
    title: "Views map VM → markup",
    summary:
      "createView receives a narrow VM and returns HyperDOM. Behavior stays in the model; views stay declarative and easy to snapshot.",
    highlight: "Mount a view only when UI wiring matters.",
    docId: "agents/model-and-view",
  },
  {
    id: "one-playbook",
    icon: "▦",
    title: "Same split at every layer",
    summary:
      "Pages, widgets, and features all use createModel + createView. One testing playbook from a counter to a full checkout flow.",
    highlight: "Vitest + TypeScript — no special test utils required.",
    docId: "architecture/models",
  },
  {
    id: "mock-vm",
    icon: "⎘",
    title: "Mock the VM, not the framework",
    summary:
      "Pass a stub VM into views for integration tests. Stub queries and stores at the model boundary — not inside HyperDOM.",
    highlight: "Predictable seams instead of deep component mocks.",
    docId: "agents/model-and-view",
  },
];

export type TestingCodePanel = {
  id: "model" | "view";
  label: string;
  file: string;
  badge: string;
  code: string;
  lang: "typescript";
  caption: string;
};

export const testingCodePanels: readonly TestingCodePanel[] = [
  {
    id: "model",
    label: "Model test",
    file: "counter.model.test.ts",
    badge: "Unit · no DOM",
    code: testingModelExample,
    lang: "typescript",
    caption: "Behavior first — signals, actions, and query state",
  },
  {
    id: "view",
    label: "View test",
    file: "counter.view.test.ts",
    badge: "Optional · render",
    code: testingViewExample,
    lang: "typescript",
    caption: "Thin view — stub VM, assert markup",
  },
] as const;
