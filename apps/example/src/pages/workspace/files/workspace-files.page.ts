import { createRouteView } from "@echojs/router";
import { div, h4, p, strong } from "@echojs/hyperdom";

export const filesPage = createRouteView({
  name: "files",
  view: ({ params }: { params: { "*": string } }) =>
    div({ class: "router-page" }, [
      h4(null, "Wildcard /files/*"),
      p(null, [strong(null, () => params["*"] || "(пусто)")]),
      p(null, "Пример: /workspace/files/docs/readme.md"),
    ]),
});

