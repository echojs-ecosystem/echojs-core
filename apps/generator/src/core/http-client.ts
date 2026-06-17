import { createHttpClient } from "@echojs-ecosystem/network/http";

export const http = createHttpClient({
  headers: {
    accept: "application/json",
  },
});

