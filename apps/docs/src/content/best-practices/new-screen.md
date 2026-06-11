---
title: New Screen
description:
  Step-by-step workflow for adding a new screen — page slice, model, view,
  route, and navigation.
keywords: [workflow, pages, feature-first, echo-architect, new screen]
---

# New Screen

End-to-end workflow for adding a screen. Folder rules:
[Feature first](/docs/architecture/feature-first).

Example: add **Workspace settings** to an app.

## 1. Create the page slice

```
pages/workspace/settings/
  model/settings.model.ts
  ui/settings.view.ts
  ui/settings.view.styles.ts
  types/settings.types.ts
  workspace-settings.page.ts
```

## 2. Model

- Read `settingsPage.$params` / stores / `updateSettingsMutation`.
- Expose `isSaving()`, `formValues()`, `save()`.

## 3. View

- `SettingsView = createView((vm) => …)` — form fields call `vm.save`.
- Styles in `settings.view.styles.ts`.

## 4. Route

```ts
// workspace-settings.page.ts
export const workspaceSettingsPage = createRouteView({
  name: 'workspace-settings',
  view: () => createComponent(createSettingsModel, SettingsView)(),
})

// entities/__routes__/app.routes.ts
{ path: 'settings', name: 'settings', routeView: workspaceSettingsPage }
```

## 5. Navigation

```ts
NavLink({
  to: workspaceSettingsPage,
  class: navItem(),
  activeClass: navItemActive(),
  children: 'Settings',
})
```

## 6. Optional widget extraction

If settings appear in a drawer **and** a full page, move shared form to
`features/settings-form/` and import from both places.

## 7. CI

```bash
echo-architect lint
```

## Quick decision table

| Question | Answer |
| -------- | ------ |
| New UI used on one route only? | `pages/.../ui/` |
| Same block on 2+ routes? | `widgets/` or `features/` + `index.ts` |
| Where does fetch live? | `createQuery` / `beforeLoad`, never view |
| Where do clicks go? | `vm.action()` in model |
| How to link internally? | `NavLink({ to: page })` |
| How to style? | `*.view.styles.ts` + `tv` slots |
| How to export slice? | `index.ts` public API only |
| Route param changed? | New `createComponent(() => createModel(props), view)()` |

## Related

- [Routing](/docs/best-practices/routing) — routes and guards
- [Models](/docs/best-practices/models) — VM design
- [Views](/docs/best-practices/views) — composition
- [Conventions](/docs/guides/conventions) — naming tables
- [Overview](/docs/best-practices/overview)
