import { echoTsupConfig } from "@echojs-ecosystem/oxc-config/tsup";

export default echoTsupConfig({
  entry: {
    core: "core/src/index.ts",
    http: "http/src/index.ts",
  },
  platform: "node",
  onSuccess:
    "mkdir -p dist/templates dist/runtime && cp http/src/templates/*.hbs dist/templates/ && cp http/src/runtime/*.ts dist/runtime/",
});
