import { echoTsupConfig } from "@echojs/oxc-config/tsup";

export default echoTsupConfig({
  entry: {
    index: "src/index.ts",
    button: "src/components/button/index.ts",
    "icon-button": "src/components/icon-button/index.ts",
    input: "src/components/input/index.ts",
    "input-mask": "src/components/input-mask/index.ts",
    "input-otp": "src/components/input-otp/index.ts",
    "input-tags": "src/components/input-tags/index.ts",
    textarea: "src/components/textarea/index.ts",
    label: "src/components/label/index.ts",
    field: "src/components/field/index.ts",
    checkbox: "src/components/checkbox/index.ts",
    provider: "src/providers/index.ts",
    theme: "src/theme/index.ts",
    core: "src/core/index.ts",
    utils: "src/utils/index.ts",
    primitives: "src/primitives/index.ts",
  },
});
