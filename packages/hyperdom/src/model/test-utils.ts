import { createComponent } from "../component/create-component";
import { createModel } from "./create-model";
import { createView } from "../view/create-view";
import { h } from "../hyperscript/h";
import type { Child } from "../core/types";
import { render } from "../render/render";

export const renderModel = <VM>(
  factory: () => VM,
  view: (vm: VM) => Child = () => h("div", { "data-testid": "root" }, "ok"),
  modelName = "TestModel",
): { container: HTMLDivElement; dispose: () => void } => {
  const makeModel = createModel(factory, modelName);
  const Component = createComponent(makeModel, createView(view, "TestView"));
  const container = document.createElement("div");
  const dispose = render(Component(), container);
  return { container, dispose };
};
