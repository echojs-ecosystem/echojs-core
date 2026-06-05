import { createRouteView } from "@echojs-ecosystem/router";
import { Home } from "@entities/home/index.js";
import { applySeo } from "@core/seo/apply-seo.js";

export const homePage = createRouteView({
  name: "home",
  view: () => {
    applySeo({
      title: "EchoJS Documentation",
      description: "Signal-first framework for building scalable web applications.",
      path: "/",
    });
    return Home();
  },
});
