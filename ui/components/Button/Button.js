import { LitElement, html } from "lit-element";

import buttonStyles from "./buttonStyles";

class Button extends LitElement {
  static get properties() {
    return {
      text: { type: String },
      isDisabled: { type: Boolean },
    };
  }

  static get styles() {
    return buttonStyles;
  }

  constructor() {
    super();
    this.text = "";
    this.isDisabled = false;
  }

  clickHandler(event) {
    console.log("in child component: ", event.target);
  }

  render() {
    return html`
      <button @click="${this.clickHandler}" ?disabled=${this.isDisabled}>
        ${this.text}
      </button>
    `;
  }
}

customElements.define("aleph-button", Button);

export default Button;
