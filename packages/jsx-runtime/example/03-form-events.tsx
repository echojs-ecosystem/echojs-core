/**
 * Example 3: Form Events with Modifiers
 * Demonstrates event modifiers (prevent, stop, etc.)
 */

import {
  createComponent,
  signal,
  mount,
  cleanup,
} from "@echojs-ecosystem/jsx-runtime";

const FormDemo = createComponent(
  () => {
    const name = signal("");
    const submitted = signal<string | null>(null);
    const counter = signal(0);

    // Cleanup timer on component dispose
    let timer: number | null = null;
    cleanup(() => {
      if (timer) clearInterval(timer);
    });

    return {
      name,
      submitted,
      counter,
      handleSubmit: (e: Event) => {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        submitted.set(`Submitted: ${formData.get("username")}`);
      },
      clearSubmitted: () => submitted.set(null),
      increment: () => counter.update((n) => n + 1),
    };
  },
  (vm) => (
    <div class="form-demo">
      <h2>Form Events with Modifiers</h2>

      <form on:submit:prevent={vm.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            value={vm.name}
            on:input={(e: Event) =>
              vm.name.set((e.target as HTMLInputElement).value)
            }
          />
        </label>
        <button type="submit">Submit (prevent default)</button>
      </form>

      {vm.submitted && (
        <div class="success">
          <p>{vm.submitted}</p>
          <button on:click={vm.clearSubmitted}>Clear</button>
        </div>
      )}

      <hr />

      <div class="click-demo">
        <h3>Event Modifiers Demo</h3>
        <div
          class="outer"
          on:click={() => alert("Outer clicked (should not fire with stop)")}
        >
          <button on:click:stop={() => alert("Button clicked (stopped)")}>
            Click me (stop propagation)
          </button>
        </div>

        <button on:click:once={() => alert("This only works once")}>
          Click once (once modifier)
        </button>
      </div>
    </div>
  )
);

const app = document.getElementById("app");
if (app) {
  mount(app, <FormDemo />);
}
