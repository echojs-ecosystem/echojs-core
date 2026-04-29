/**
 * Example 2: Conditional Rendering
 * Demonstrates if/else and show directives
 */

import { createComponent, signal, mount } from "@echojs-ecosystem/jsx-runtime";

const ToggleDemo = createComponent(
  () => {
    const showA = signal(true);
    const visible = signal(true);

    return {
      showA,
      visible,
      toggleIf: () => showA.update((v) => !v),
      toggleShow: () => visible.update((v) => !v),
    };
  },
  (vm) => (
    <div class="toggle-demo">
      <h2>Conditional Rendering</h2>

      <section>
        <h3>if/else Directive (creates/removes DOM)</h3>
        <button on:click={vm.toggleIf}>Toggle if/else</button>
        <div class="panel">
          <p if={vm.showA}>Content A (if branch)</p>
          <p else>Content B (else branch)</p>
        </div>
      </section>

      <section>
        <h3>show Directive (toggles visibility)</h3>
        <button on:click={vm.toggleShow}>Toggle show</button>
        <div class="panel">
          <p show={vm.visible}>This paragraph toggles visibility with CSS display:none</p>
        </div>
      </section>
    </div>
  ),
);

const app = document.getElementById("app");
if (app) {
  mount(app, <ToggleDemo />);
}
