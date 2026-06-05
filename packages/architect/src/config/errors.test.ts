import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  ConfigurationInvalidError,
  ConfigurationNotFoundError,
} from "./errors";

describe("config errors", () => {
  it("ConfigurationNotFoundError includes cwd", () => {
    const error = new ConfigurationNotFoundError();
    expect(error.message).toContain("Configuration not found");
  });

  it("ConfigurationInvalidError formats zod error", () => {
    const schema = z.object({ root: z.string() });
    const parsed = schema.safeParse({});

    if (parsed.success) {
      throw new Error("expected validation failure");
    }

    const error = new ConfigurationInvalidError(
      parsed.error,
      "/tmp/architect.config.ts",
    );

    expect(error.message).toContain("Invalid configuration");
    expect(error.error.issues.length).toBeGreaterThan(0);
  });
});
