import type { Diagnostic } from "../rule/types";
import { mkdir, open, rename, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

export const applyAutofixes = async <T extends Diagnostic>(
  diagnostics: Array<T>,
): Promise<T[]> => {
  const stillRelevantDiagnostics = [];
  const fixableDiagnostics = [];

  for (const diagnostic of diagnostics) {
    const fixes = diagnostic.fixes;

    if (!fixes) {
      stillRelevantDiagnostics.push(diagnostic);
      continue;
    }

    fixableDiagnostics.push(diagnostic);
  }

  try {
    await Promise.all(fixableDiagnostics.map(tryToApplyFixes));
  } catch (error) {
    stillRelevantDiagnostics.push(...fixableDiagnostics);
    console.error(error);
  }

  return stillRelevantDiagnostics;
};

const tryToApplyFixes = async (diagnostic: Diagnostic) => {
  const fixes = diagnostic.fixes ?? [];

  return Promise.all(
    fixes.map((fix) => {
      switch (fix.type) {
        case "rename":
          return rename(fix.path, join(dirname(fix.path), fix.newName));
        case "create-file":
          return open(fix.path, "w").then((file) => {
            file.write(fix.content);
            return file.close();
          });
        case "create-folder":
          return mkdir(fix.path, { recursive: true });
        case "delete":
          return rm(fix.path, { recursive: true });
        case "modify-file":
          return open(fix.path, "w").then(async (file) => {
            await file.write(fix.content);
            return file.close();
          });
        default:
          return undefined;
      }
    }),
  );
};
