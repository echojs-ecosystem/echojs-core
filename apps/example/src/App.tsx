import { CounterComponent } from "./examples/counter";
import { ConditionalComponent } from "./examples/conditional";
import { FormComponent } from "./examples/form";
import { TodoListComponent } from "./examples/todo";
import { StyleComponent } from "./examples/styles";
import { createView } from "@echojs-ecosystem/core";

export const App = createView(() => (
  <div class="app">
    <header>
      <h1>EchoJS Examples</h1>
      <p>Fine-grained reactive UI with createModel / createView API</p>
    </header>

    <main>
      <CounterComponent />
      <ConditionalComponent />
      <FormComponent />
      <TodoListComponent />
      <StyleComponent />
    </main>

    <footer>
      <p>Built with signals - No VDOM - No diffing</p>
    </footer>
  </div>
))

