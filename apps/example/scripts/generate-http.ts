import path from "node:path";
import { fileURLToPath } from "node:url";

import { runHttpGenerator } from "@echojs-ecosystem/generator/http";

import config from "../echo-http.generator.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const result = await runHttpGenerator({ config, cwd: root });

if (result.failed) {
  console.error(result.error);
  process.exit(1);
}

console.log(`Generated ${result.files.length} files into ${config.output}`);
