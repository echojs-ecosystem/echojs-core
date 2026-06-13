export type NamingStyle = "camelCase" | "pascalCase" | "kebabCase" | "snakeCase";

export interface GeneratorNamingConfig {
  operation?: NamingStyle;
  models?: NamingStyle;
  files?: NamingStyle;
}

export interface BaseGeneratorConfig {
  input: string;
  output: string;
  naming?: GeneratorNamingConfig;
}
