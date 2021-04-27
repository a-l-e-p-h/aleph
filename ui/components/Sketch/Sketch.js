import { LitElement, html } from "lit";

import sketchStyles from "./sketchStyles";
import "../Flex/Flex";

class Sketch extends LitElement {
  static get properties() {
    return {
      isPlaying: { type: Boolean },
      sketchName: { type: String },
    };
  }

  static get styles() {
    return sketchStyles;
  }

  constructor() {
    super();
    this.isPlaying = false;
    this.sketchName = "";
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }

  render() {
    return html`
      <button class="sketch-button" @click=${this.togglePlay}>
        <aleph-flex align="center">
          <div class="transport-container">
            <div
              class="transport-indicator ${this.isPlaying
                ? "playing"
                : "paused"}"
            ></div>
          </div>
          <p>${this.sketchName}</p>
        </aleph-flex>
      </button>
    `;
  }
}

customElements.define("aleph-sketch", Sketch);

export default Sketch;
