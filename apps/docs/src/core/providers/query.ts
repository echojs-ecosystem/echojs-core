import { createQueryProvider } from "@echojs-ecosystem/framework/query";

export const queryProvider = createQueryProvider({
  defaultOptions: {
    queries: { staleTime: 60_000 },
  },
});
