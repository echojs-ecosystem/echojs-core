import {
  batch,
  cleanup,
  computed,
  effect,
  readonly,
  scope,
  signal,
} from "@echojs-ecosystem/reactivity";
import type { ReadonlySignal, Signal } from "@echojs-ecosystem/reactivity";
import { createModel } from "@echojs-ecosystem/hyperdom";

import { timestamp, uid } from "@features/reactivity-lab/utils/reactivity-lab.utils.js";

export type TodoItem = { id: number; text: string; done: boolean };
export type CartLine = { sku: string; label: string; price: number; qty: number };
export type ProfileState = { name: string; role: string; tags: string[] };

export interface ReactivityLabVM {
  $count: Signal<number>;
  $firstName: Signal<string>;
  $lastName: Signal<string>;
  $fullName: ReadonlySignal<string>;
  $greeting: ReadonlySignal<string>;

  $batchA: Signal<number>;
  $batchB: Signal<number>;
  $batchEffectRuns: Signal<number>;

  $profile: Signal<ProfileState>;
  $todoDraft: Signal<string>;
  $todos: Signal<TodoItem[]>;
  $doneCount: ReadonlySignal<number>;

  $peekTarget: Signal<number>;
  $peekEffectRuns: Signal<number>;

  $writable: Signal<number>;
  $readonlyView: ReadonlySignal<number>;

  $clockEnabled: Signal<boolean>;
  $clock: Signal<number>;

  $cart: Signal<CartLine[]>;
  $cartTotal: ReadonlySignal<number>;
  $cartItemsCount: ReadonlySignal<number>;

  $logs: Signal<string[]>;

  increment: () => void;
  decrement: () => void;
  resetCount: () => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;

  runBatchUpdate: () => void;
  runSequentialUpdate: () => void;
  resetBatch: () => void;

  renameProfile: (name: string) => void;
  setProfileRole: (role: string) => void;
  addProfileTag: () => void;
  removeLastTag: () => void;

  setTodoDraft: (value: string) => void;
  addTodo: () => void;
  toggleTodo: (id: number) => void;
  clearDoneTodos: () => void;

  bumpPeekTarget: () => void;
  resetPeekDemo: () => void;

  bumpWritable: () => void;
  tryMutateReadonly: () => void;

  toggleClock: () => void;
  resetClock: () => void;

  addCartItem: (sku: string) => void;
  changeCartQty: (sku: string, delta: number) => void;
  clearCart: () => void;

  clearLogs: () => void;
}

const CART_CATALOG: Record<string, { label: string; price: number }> = {
  cpu: { label: "CPU kit", price: 420 },
  ram: { label: "RAM 32GB", price: 180 },
  ssd: { label: "NVMe 2TB", price: 240 },
};

export const createReactivityLabModel = createModel((): ReactivityLabVM => {
  const $count = signal(0);
  const $firstName = signal("Echo");
  const $lastName = signal("JS");
  const $fullName = computed(() => `${$firstName.value().trim()} ${$lastName.value().trim()}`.trim());
  const $greeting = computed(() => {
    const name = $fullName.value();
    return name.length > 12 ? `Длинное имя: ${name}` : `Привет, ${name || "гость"}!`;
  });

  const $batchA = signal(0);
  const $batchB = signal(0);
  const $batchEffectRuns = signal(0);

  const $profile = signal<ProfileState>({
    name: "Vova",
    role: "engineer",
    tags: ["signals", "hyperdom"],
  });

  const $todoDraft = signal("");
  const $todos = signal<TodoItem[]>([
    { id: uid(), text: "Изучить signal()", done: true },
    { id: uid(), text: "Попробовать computed", done: false },
    { id: uid(), text: "Сравнить batch vs sequential", done: false },
  ]);
  const $doneCount = computed(() => $todos.value().filter((t) => t.done).length);

  const $peekTarget = signal(0);
  const $peekEffectRuns = signal(0);

  const $writable = signal(1);
  const $readonlyView = readonly($writable);

  const $clockEnabled = signal(false);
  const $clock = signal(0);

  const $cart = signal<CartLine[]>([
    { sku: "cpu", label: "CPU kit", price: 420, qty: 1 },
    { sku: "ram", label: "RAM 32GB", price: 180, qty: 2 },
  ]);
  const $cartTotal = computed(() =>
    $cart.value().reduce((sum, line) => sum + line.price * line.qty, 0),
  );
  const $cartItemsCount = computed(() =>
    $cart.value().reduce((sum, line) => sum + line.qty, 0),
  );

  const $logs = signal<string[]>(["Лаборатория reactivity готова."]);

  const pushLog = (message: string): void => {
    $logs.update((entries) => [...entries.slice(-24), `[${timestamp()}] ${message}`]);
  };

  effect(() => {
    void $batchA.value();
    void $batchB.value();
    $batchEffectRuns.update((n) => n + 1);
  });

  effect(() => {
    $peekTarget.peek();
    $peekEffectRuns.update((n) => n + 1);
  });

  scope(() => {
    effect(() => {
      if (!$clockEnabled.value()) return;
      const id = window.setInterval(() => {
        $clock.update((n) => n + 1);
      }, 1000);
      cleanup(() => window.clearInterval(id));
      pushLog("clock effect: interval started");
    });
  });

  $count.subscribe(() => pushLog(`subscribe count → ${$count.peek()}`));
  $fullName.subscribe(() => pushLog(`subscribe fullName → "${$fullName.peek()}"`));
  $cartTotal.subscribe(() => pushLog(`subscribe cartTotal → ${$cartTotal.peek()} ₽`));

  return {
    $count,
    $firstName,
    $lastName,
    $fullName,
    $greeting,
    $batchA,
    $batchB,
    $batchEffectRuns,
    $profile,
    $todoDraft,
    $todos,
    $doneCount,
    $peekTarget,
    $peekEffectRuns,
    $writable,
    $readonlyView,
    $clockEnabled,
    $clock,
    $cart,
    $cartTotal,
    $cartItemsCount,
    $logs,

    increment: () => $count.update((n) => n + 1),
    decrement: () => $count.update((n) => n - 1),
    resetCount: () => $count.set(0),

    setFirstName: (value) => $firstName.set(value),
    setLastName: (value) => $lastName.set(value),

    runBatchUpdate: () => {
      pushLog("batch(() => { a++; b++; })");
      batch(() => {
        $batchA.update((n) => n + 1);
        $batchB.update((n) => n + 1);
      });
    },
    runSequentialUpdate: () => {
      pushLog("sequential a++; b++;");
      $batchA.update((n) => n + 1);
      $batchB.update((n) => n + 1);
    },
    resetBatch: () => {
      batch(() => {
        $batchA.set(0);
        $batchB.set(0);
        $batchEffectRuns.set(0);
      });
      pushLog("batch counters reset");
    },

    renameProfile: (name) => {
      $profile.update((prev) => ({ ...prev, name }));
    },
    setProfileRole: (role) => {
      $profile.update((prev) => ({ ...prev, role }));
    },
    addProfileTag: () => {
      $profile.update((prev) => ({
        ...prev,
        tags: [...prev.tags, `tag-${prev.tags.length + 1}`],
      }));
    },
    removeLastTag: () => {
      $profile.update((prev) => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
      }));
    },

    setTodoDraft: (value) => $todoDraft.set(value),
    addTodo: () => {
      const text = $todoDraft.value().trim();
      if (!text) return;
      $todos.update((items) => [...items, { id: uid(), text, done: false }]);
      $todoDraft.set("");
    },
    toggleTodo: (id) => {
      $todos.update((items) =>
        items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
      );
    },
    clearDoneTodos: () => {
      $todos.update((items) => items.filter((item) => !item.done));
    },

    bumpPeekTarget: () => {
      $peekTarget.update((n) => n + 1);
      pushLog(`peekTarget set → ${$peekTarget.peek()} (effect runs: ${$peekEffectRuns.peek()})`);
    },
    resetPeekDemo: () => {
      $peekTarget.set(0);
      $peekEffectRuns.set(0);
    },

    bumpWritable: () => $writable.update((n) => n + 1),
    tryMutateReadonly: () => {
      pushLog("readonly view — только .value(), без .set()");
    },

    toggleClock: () => {
      $clockEnabled.update((enabled) => !enabled);
      pushLog(`clock ${$clockEnabled.peek() ? "enabled" : "disabled"}`);
    },
    resetClock: () => $clock.set(0),

    addCartItem: (sku) => {
      const meta = CART_CATALOG[sku];
      if (!meta) return;
      $cart.update((lines) => {
        const existing = lines.find((line) => line.sku === sku);
        if (existing) {
          return lines.map((line) =>
            line.sku === sku ? { ...line, qty: line.qty + 1 } : line,
          );
        }
        return [...lines, { sku, label: meta.label, price: meta.price, qty: 1 }];
      });
    },
    changeCartQty: (sku, delta) => {
      $cart.update((lines) =>
        lines
          .map((line) =>
            line.sku === sku ? { ...line, qty: Math.max(0, line.qty + delta) } : line,
          )
          .filter((line) => line.qty > 0),
      );
    },
    clearCart: () => $cart.set([]),

    clearLogs: () => $logs.set([]),
  };
}, "ReactivityLabModel");
