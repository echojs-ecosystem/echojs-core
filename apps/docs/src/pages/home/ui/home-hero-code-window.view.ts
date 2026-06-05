import { createView, type Child } from "@echojs/hyperdom";
import { div, span } from "@echojs/hyperdom";
import { bootstrapExample } from "@pages/home/constants/home.constants.js";
import { homeStyles } from "@shared/styles/home.js";
import { CodeBlock } from "@widgets/code-block/index.js";

const home = homeStyles();

export const HomeHeroCodeWindowView = createView(
  (_vm: void): Child =>
    div({ class: home.codeWindow() }, [
      div({ class: home.codeWindowChrome() }, [
        span({ class: [home.codeDot(), home.codeDotRed()].join(" ") }),
        span({ class: [home.codeDot(), home.codeDotYellow()].join(" ") }),
        span({ class: [home.codeDot(), home.codeDotGreen()].join(" ") }),
        span({ class: home.codeWindowTitle() }, "src/app/bootstrap.ts"),
      ]),
      div({ class: home.codeWindowBody() }, [
        CodeBlock({ language: "typescript", code: bootstrapExample, bare: true }),
      ]),
    ]),
  "HomeHeroCodeWindowView",
);
