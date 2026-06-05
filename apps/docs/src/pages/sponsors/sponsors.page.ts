import { createComponent } from "@echojs/hyperdom";
import { createRouteView } from "@echojs/router";
import { createSponsorsModel, SponsorsView } from "@pages/sponsors/index.js";
import { applySeo } from "@shared/seo/apply-seo.js";

export const Sponsors = createComponent(createSponsorsModel, SponsorsView, { name: "Sponsors" });

export const sponsorsPage = createRouteView({
  name: "sponsors",
  view: () => {
    applySeo({
      title: "Sponsors · EchoJS",
      description: "Organizations and individuals supporting the EchoJS ecosystem.",
      path: "/sponsors",
    });
    return Sponsors();
  },
});