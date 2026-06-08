# @echojs-ecosystem/network

Tree-shakeable network toolkit for EchoJS apps. Import only the submodule you need.

## Install

```bash
npm i @echojs-ecosystem/network
```

## Subpath imports

| Import | Description |
| --- | --- |
| `@echojs-ecosystem/network/http` | HTTP client |
| `@echojs-ecosystem/network/ws` | WebSocket client (stub) |
| `@echojs-ecosystem/network/mock` | Request mocking utilities (stub) |
| `@echojs-ecosystem/network/graphql` | GraphQL client (stub) |

Via the framework meta-package:

```ts
import { createHttpClient } from "@echojs-ecosystem/framework/network/http";
```

## HTTP quick start

```ts
import { createHttpClient } from "@echojs-ecosystem/network/http";

const client = createHttpClient({
  baseUrl: "https://api.example.com",
});

const { data } = await client.get("/users").json<User[]>();
```
