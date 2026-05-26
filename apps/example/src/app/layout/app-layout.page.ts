import { createLayoutView } from "@echojs/router";
import type { Child } from "@echojs/hyperdom";
import { code, footer, header, h1, main, p } from "@echojs/hyperdom";

export const appLayoutPage = createLayoutView({
  name: "app-layout",
  view: ({ outlet }) =>
    [
      header(null, [
        h1(null, "EchoJS Hyperdom Examples"),
        p(null, [
          "FSD + ",
          code(null, "@echojs/router"),
          " — ",
          code(null, "app/router"),
        ]),
      ]),
      main(null, outlet()),
      footer(null, p(null, "Built with signals — No VDOM")),
    ],
});
