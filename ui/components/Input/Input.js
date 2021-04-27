import { LitElement, html } from "lit";

import inputStyles from "./inputStyles";

class Input extends LitElement {
  static get properties() {
    return {
      textContent: { type: String },
      isDisabled: { type: Boolean },
      placeholder: { type: String },
    };
  }

  static get styles() {
    return inputStyles;
  }

  constructor() {
    super();
    this.textContent = "";
    this.placeholder = "";
    this.isDisabled = false;
  }

  setTextContent(event) {
    this.textContent = event.target.value;
  }

  render() {
    return html`
      <input
        class="text-input"
        type="text"
        value=${this.textContent}
        @change=${this.setTextContent}
        ?disabled=${this.isDisabled}
        placeholder=${this.placeholder}
      />
    `;
  }
}

customElements.define("aleph-input", Input);

export default Input;
