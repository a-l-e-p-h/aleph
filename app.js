import { LitElement, html } from "lit-element";

import "./components/Button/Button";
import "./components/Window/Window";
import "./components/Input/Input";

class App extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html`
      <aleph-window title="window">
        <aleph-button
          text="hello world"
          @click="${this.childClickHandler}"
        ></aleph-button>
        <aleph-button
          text="hello world"
          @click="${this.childClickHandler}"
        ></aleph-button>
        <aleph-button
          text="hello world"
          @click="${this.childClickHandler}"
        ></aleph-button>
        <aleph-button
          text="hello world"
          @click="${this.childClickHandler}"
          .isDisabled="${true}"
        ></aleph-button>
        <aleph-input placeholder="hello world"></aleph-input>
      </aleph-window>
    `;
  }
}
customElements.define("aleph-app", App);
