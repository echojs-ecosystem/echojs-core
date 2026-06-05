import { createComponent } from "@echojs/hyperdom";
import { createRouteView } from "@echojs/router";
import { createHomeModel, HomeView } from "@pages/home/index.js";
import { applySeo } from "@shared/seo/apply-seo.js";

export const Home = createComponent(createHomeModel, HomeView, { name: "Home" });

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
