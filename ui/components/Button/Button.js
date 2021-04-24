import { LitElement, html } from "lit-element";

import buttonStyles from "./buttonStyles";

class Button extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      isDisabled: { type: Boolean },
      isActive: { type: Boolean },
    };
  }

  static get styles() {
    return buttonStyles;
  }

  constructor() {
    super();
    this.text = "";
    this.isDisabled = false;
    this.isActive = false;
  }

  render() {
    return html`
      <button
        class=${this.isActive ? "active" : null}
        ?disabled=${this.isDisabled}
      >
        ${this.text}
      </button>
    `;
  }
}

customElements.define("aleph-button", Button);

export default Button;
