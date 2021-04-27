import { LitElement, html } from "lit";

import windowButtonStyles from "./windowButtonStyles";

class WindowButton extends LitElement {
  static get properties() {
    return {
      type: { type: String },
    };
  }

  static get styles() {
    return windowButtonStyles;
  }

  constructor() {
    super();
    this.type = "";
  }

  render() {
    switch (this.type.toLowerCase()) {
      case "minimize":
        return html`
          <div class="button">
            <div class="minimize"></div>
          </div>
        `;
      case "maximize":
        return html`
          <div class="button">
            <div class="maximize"></div>
          </div>
        `;
      case "close":
        return html`
          <div class="button">
            <div class="close"></div>
          </div>
        `;
      default:
        throw new Error(
          "Invalid selection - must be one of: minimize, maximize, close"
        );
    }
  }
}

customElements.define("aleph-window-button", WindowButton);

export default WindowButton;
