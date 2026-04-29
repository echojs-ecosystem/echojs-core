import { createComponent, createModel, createView, signal, type Signal } from "@echojs-ecosystem/core";

interface ConditionalVM {
  showA: Signal<boolean>;
  visible: Signal<boolean>;
  toggleIf: () => void;
  toggleShow: () => void;
}

const conditionalModel = createModel((): ConditionalVM => {
  const $showA = signal(true);
  const $visible = signal(true);

  return {
    showA: $showA,
    visible: $visible,
    toggleIf: () => $showA.update((v) => !v),
    toggleShow: () => $visible.update((v) => !v),
  };
});

const ConditionalView = createView((vm: ConditionalVM) => (
  <div class="conditional-demo">
    <h3>Conditional Rendering (New API)</h3>

    <div class="section">
      <h4>show (toggles visibility)</h4>
      <button on:click={vm.toggleShow}>Toggle Visibility</button>
      <div class="panel">
        <p show={vm.visible}>This paragraph uses CSS display:none</p>
      </div>
    </div>
  </div>
));

export const ConditionalComponent = createComponent(conditionalModel, ConditionalView);

