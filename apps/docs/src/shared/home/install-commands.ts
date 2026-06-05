export const projectPlaceholder = "<project-name>";

export type PackageManagerId = "npm" | "yarn" | "pnpm" | "bun" | "deno";

export type CommandTokenKind = "pm" | "verb" | "pkg" | "arg";

export type CommandToken = {
  text: string;
  kind: CommandTokenKind;
};

export type PackageManager = {
  id: PackageManagerId;
  label: string;
  command: string;
  tokens: CommandToken[];
};

const tokensFor = (
  pm: string,
  verb: string,
  pkg: string,
  arg = "",
): CommandToken[] => [
  { text: pm, kind: "pm" },
  { text: verb, kind: "verb" },
  { text: pkg, kind: "pkg" },
  ...(arg ? [{ text: arg, kind: "arg" as const }] : []),
];

const pkg = "echojs@latest";
const scaffoldArg = ` ${projectPlaceholder}`;

/** Home hero — `npm create echojs@latest <project-name>`. */
export const projectScaffoldManagers: PackageManager[] = [
  {
    id: "npm",
    label: "npm",
    command: `npm create ${pkg}${scaffoldArg}`,
    tokens: tokensFor("npm", " create ", pkg, scaffoldArg),
  },
  {
    id: "yarn",
    label: "yarn",
    command: `yarn create echojs${scaffoldArg}`,
    tokens: tokensFor("yarn", " create ", "echojs", scaffoldArg),
  },
  {
    id: "pnpm",
    label: "pnpm",
    command: `pnpm create ${pkg}${scaffoldArg}`,
    tokens: tokensFor("pnpm", " create ", pkg, scaffoldArg),
  },
  {
    id: "bun",
    label: "bun",
    command: `bun create ${pkg}${scaffoldArg}`,
    tokens: tokensFor("bun", " create ", pkg, scaffoldArg),
  },
  {
    id: "deno",
    label: "deno",
    command: `deno run -A npm:create-echojs@latest${scaffoldArg}`,
    tokens: tokensFor("deno", " run -A ", "npm:create-echojs@latest", scaffoldArg),
  },
];

/** Package docs — `npm install @echojs/<name>`. */
export const addPackageManagers = (npmPackage: string): PackageManager[] => [
  {
    id: "bun",
    label: "bun",
    command: `bun add ${npmPackage}`,
    tokens: tokensFor("bun", " add ", npmPackage),
  },
  {
    id: "npm",
    label: "npm",
    command: `npm install ${npmPackage}`,
    tokens: tokensFor("npm", " install ", npmPackage),
  },
  {
    id: "pnpm",
    label: "pnpm",
    command: `pnpm add ${npmPackage}`,
    tokens: tokensFor("pnpm", " add ", npmPackage),
  },
  {
    id: "yarn",
    label: "yarn",
    command: `yarn add ${npmPackage}`,
    tokens: tokensFor("yarn", " add ", npmPackage),
  },
  {
    id: "deno",
    label: "deno",
    command: `deno add npm:${npmPackage}`,
    tokens: tokensFor("deno", " add ", `npm:${npmPackage}`),
  },
];

/** @deprecated Use {@link projectScaffoldManagers} */
export const packageManagers = projectScaffoldManagers;
