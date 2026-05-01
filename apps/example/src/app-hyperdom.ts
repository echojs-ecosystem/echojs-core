import { createView, type Child } from "@echojs/hyperdom";
import { code, div, footer, h1, header, main, p } from "@echojs/hyperdom";
import { Example1Component } from "./example/example1/example1.component";

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
    main(null, Example1Component()),
    footer(null, p(null, "Built with signals — No VDOM — No JSX (temporarily)")),
  );
});
