import { createQueryProvider } from "@echojs-ecosystem/query";

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: { staleTime: 60_000 },
  },
});
