import { defineCommand, runMain } from "citty";
import { version } from "./version";
import { commands } from "./commands";

const main = defineCommand({
  meta: {
    name: "echo-architect",
    version,
    description: "EchoJS architecture linter CLI",
  },
  subCommands: commands,
});

runMain(main);
