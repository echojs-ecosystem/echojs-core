---
title: Imperative Navigation
description: Programmatic navigation with page.go and router.go.
package: "@echojs-ecosystem/router"
---

# Imperative Navigation

Navigate from event handlers or model actions.

## Typed page objects

```ts
homePage.go();
userPage.go({ id: "42" }, { query: { tab: "profile" }, replace: true });
userPage.open({ id: "1" }); // alias for go
```

## Raw path strings

```ts
appRouter.go("/docs/packages/router/example");
appRouter.replace("/login");
appRouter.back();
```

## Resolve URLs without navigating

```ts
appRouter.resolve(userPage, { id: "1" }, { query: { tab: "a" } });
// → "/users/1?tab=a"
```

## Related

- [Navigation guide](/docs/packages/router/guides/navigation)
- [Router Lifecycle](/docs/packages/router/guides/router-lifecycle)
