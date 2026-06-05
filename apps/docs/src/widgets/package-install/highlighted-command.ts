import type { Child } from "@echojs/hyperdom";
import { code, span } from "@echojs/hyperdom";
import type { CommandToken, CommandTokenKind } from "@shared/home/install-commands.js";
import { packageInstallStyles } from "@widgets/package-install/ui/package-install.view.styles.js";

const styles = packageInstallStyles();

const tokenClass = (kind: CommandTokenKind): string => {
  switch (kind) {
    case "pm":
      return styles.tokenPm();
    case "verb":
      return styles.tokenVerb();
    case "pkg":
      return styles.tokenPkg();
    case "arg":
      return styles.tokenArg();
  }
};

export const HighlightedCommand = (tokens: CommandToken[]): Child =>
  code({ class: styles.command() }, tokens.map((t) => span({ class: tokenClass(t.kind) }, t.text)));
