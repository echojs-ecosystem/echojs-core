import { createRouteView } from "@echojs-ecosystem/framework/router";
import { Sponsors } from "@entities/sponsors/index.js";
import { applySeo } from "@core/seo/apply-seo.js";

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
