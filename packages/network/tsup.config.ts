import { echoTsupConfig } from "@echojs-ecosystem/oxc-config/tsup";

export default echoTsupConfig({
  entry: {
    http: "src/http/index.ts",
    ws: "src/ws/index.ts",
    mock: "src/mock/index.ts",
    graphql: "src/graphql/index.ts",
  },
});
