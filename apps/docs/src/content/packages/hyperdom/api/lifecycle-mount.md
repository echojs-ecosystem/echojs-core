---
title: lifecycle/mount
description: mount(fn) — after-insert lifecycle child with optional cleanup.
package: '@echojs-ecosystem/hyperdom'
keywords: [lifecycle/mount, hyperdom]
---

@echojs-ecosystem/hyperdom/lifecycle/mount

## Usage

```ts
import { mount } from '@echojs-ecosystem/hyperdom/lifecycle/mount'

type MountCleanup = void | (() => void)

function mount(fn: () => MountCleanup): Child
```

## Type Declarations

```ts
import { mount } from '@echojs-ecosystem/hyperdom/lifecycle/mount'

type MountCleanup = void | (() => void)

function mount(fn: () => MountCleanup): Child
```

## API

### Returns

`lifecycle/mount` — see Type Declarations for the full signature.
