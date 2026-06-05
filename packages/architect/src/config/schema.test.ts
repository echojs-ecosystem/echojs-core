import { describe, expect, it } from "vitest";
import { abstraction } from "../abstraction";
import { rule } from "../rule/rule";
import { EvolutionConfigSchema } from "./schema";

describe("EvolutionConfigSchema", () => {
  it("accepts valid config", () => {
    const config = {
      root: abstraction({
        name: "src",
        children: {
          shared: abstraction("shared"),
        },
        rules: [rule("default/test")],
      }),
      baseUrl: "./",
    };

    expect(EvolutionConfigSchema.safeParse(config).success).toBe(true);
  });

  it("rejects config without root", () => {
    expect(EvolutionConfigSchema.safeParse({ baseUrl: "./" }).success).toBe(
      false,
    );
  });
});
