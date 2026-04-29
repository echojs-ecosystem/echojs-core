import { createComponent, createModel, createView, signal, type Signal } from "@echojs-ecosystem/core";

interface FormVM {
  name: Signal<string>;
  submitted: Signal<string | null>;
  clickCount: Signal<number>;
  handleSubmit: () => void;
  clear: () => void;
  increment: () => void;
}

const formModel = createModel((): FormVM => {
  const name = signal("");
  const submitted = signal<string | null>(null);
  const clickCount = signal(0);

  return {
    name,
    submitted,
    clickCount,
    handleSubmit: () => {
      submitted.set("Hello, " + name.value() + "!");
    },
    clear: () => submitted.set(null),
    increment: () => clickCount.update((n) => n + 1),
  };
});

const FormView = createView((vm: FormVM) => {
  const handleInput = (e: Event) => {
    vm.name.set((e.target as HTMLInputElement).value);
  };

  return (
    <div class="form-demo">
      <h3>Form Demo (New API)</h3>

      <form>
        <label>
          Name:
          <input type="text" value={vm.name} onInput={handleInput} />
        </label>
        <button type="button" on:click={vm.handleSubmit}>
          Submit
        </button>
      </form>

      {() =>
        vm.submitted.value() ? (
          <div class="success-message">
            <p>{vm.submitted}</p>
            <button on:click={vm.clear}>Clear</button>
          </div>
        ) : null
      }

      <div class="click-section">
        <p>Clicks: {vm.clickCount}</p>
        <button on:click={vm.increment}>Click me</button>
      </div>
    </div>
  );
});

export const FormComponent = createComponent(formModel, FormView);

