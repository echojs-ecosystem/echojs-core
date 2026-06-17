import { createHttpClient } from "@echojs-ecosystem/network/http";

export const http = createHttpClient({
  baseUrl: "https://api.example.com",
  headers: {
    accept: "application/json",
  },
});
