import { bench, describe } from "vitest";
import { serializeJsonBody } from "../../src/http/core/serialize-json-body";
import { buildNormalizedBody } from "../../src/http/core/body";
import type { RequestOptions } from "../../src/http/types/public";

describe("serializeJsonBody", () => {
  bench("serialize small object", () => {
    serializeJsonBody({ name: "John", age: 30 });
  });

  bench("serialize medium object", () => {
    serializeJsonBody({
      id: 123,
      name: "John Doe",
      email: "john@example.com",
      age: 30,
      address: {
        street: "123 Main St",
        city: "New York",
        zip: "10001",
      },
      tags: ["user", "premium", "verified"],
    });
  });

  bench("serialize large array", () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random(),
    }));
    serializeJsonBody(items);
  });

  bench("serialize nested object", () => {
    serializeJsonBody({
      level1: {
        level2: {
          level3: {
            level4: {
              data: "deep value",
              numbers: [1, 2, 3, 4, 5],
            },
          },
        },
      },
    });
  });
});

describe("buildNormalizedBody", () => {
  bench("build body from json option", () => {
    buildNormalizedBody({ json: { test: "value" } } as RequestOptions);
  });

  bench("build body from form option", () => {
    buildNormalizedBody({ form: new URLSearchParams({ key: "value" }) } as RequestOptions);
  });

  bench("build body from string", () => {
    buildNormalizedBody({ body: "plain text" } as RequestOptions);
  });

  bench("build empty body", () => {
    buildNormalizedBody({} as RequestOptions);
  });
});
