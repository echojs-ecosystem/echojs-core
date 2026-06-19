import type { AsyncGeneratorQueryDefaults } from "./async-types";

const validDefaults: AsyncGeneratorQueryDefaults = {
  staleTime: 60_000,
  keepPreviousData: true,
  refetchOnMount: "stale",
  retry: false,
};

void validDefaults;

const invalidDefaults: AsyncGeneratorQueryDefaults = {
  // @ts-expect-error — unknown query default key
  unknownOption: true,
};

void invalidDefaults;
