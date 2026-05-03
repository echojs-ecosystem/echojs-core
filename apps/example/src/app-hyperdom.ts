import { createView, type Child } from "@echojs/hyperdom";
import { code, div, footer, h1, header, main, p } from "@echojs/hyperdom";
import { Example1Component } from "./example/example1/example1.component";
import { Example3MiniFormsComponent } from "./example/example3-form-package/example3-mini-forms.component";
import { Example4NestedComponent } from "./example/example4-nested/example4-nested.component";

export const AppView = createView((): Child => {
  return div(
    { class: "app" },
    header(
      null,
      h1(null, "EchoJS Hyperdom Examples"),
      p(null, [
        "Временный режим без JSX: всё рендерится через ",
        code(null, "@echojs/hyperdom"),
        ".",
      ]),
    ),
    main(null, [Example1Component(), Example3MiniFormsComponent(), Example4NestedComponent()]),
    footer(null, p(null, "Built with signals — No VDOM — No JSX (temporarily)")),
  );
});
