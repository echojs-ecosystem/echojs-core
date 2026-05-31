import { describe, expectTypeOf, it } from "vitest";
import { createStore } from "@echojs/store";

import { withMemoryStorage } from "../extensions/with-memory-storage";
import { persist, persistField } from "./persist-target";
import { createFakeField } from "../test-utils";

describe("persist-target types", () => {
  it("persist returns target with persist controller", () => {
    const field = createFakeField("");
    const result = persist(field, withMemoryStorage({ key: "draft" }));

    expectTypeOf(result.persist.hydrate).toBeFunction();
    expectTypeOf(result.persist.save).toBeFunction();
    expectTypeOf(result.persist.$hydrated.value()).toEqualTypeOf<boolean>();
  });

  it("persistField preserves field value type", () => {
    const field = createFakeField("");
    const result = persistField(field, withMemoryStorage({ key: "name" }));

    expectTypeOf(result.value()).toEqualTypeOf<string>();
    expectTypeOf(result.set).parameter(0).toEqualTypeOf<string>();
  });

  it("withMemoryStorage infers store value type", () => {
    const store = createStore({ count: 0 }).extend(
      withMemoryStorage({
        key: "counter",
      }),
    );

    expectTypeOf(store.value()).toEqualTypeOf<{ count: number }>();
    expectTypeOf(store.persist.key).toEqualTypeOf<string>();
  });
});
