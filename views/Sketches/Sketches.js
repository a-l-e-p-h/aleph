import { LitElement, html } from "lit-element";
const { ipcRenderer } = require("electron");

import "../../components/Window/Window";
import "../../components/Flex/Flex";
import "../../components/Sketch/Sketch";

class SketchWindow extends LitElement {
  static get properties() {
    return {
      sketches: { type: Array },
      selectedSketch: { type: String },
    };
  }

  constructor() {
    super();
    this.sketches = [];
    this.selectedSketch = null;
  }

  connectedCallback() {
    super.connectedCallback();
    ipcRenderer.send("request-sketches");
    ipcRenderer.once("sketch-list", (event, sketchList) => {
      this.sketches = sketchList;
    });
  }

  setSelectedSketch(sketchName) {
    this.selectedSketch = sketchName;

    ipcRenderer.send("sketch-changed", this.selectedSketch);
  }

  render() {
    return html`
      <aleph-window title="sketches">
        <aleph-flex>
          ${this.sketches.map(
            (sketch) =>
              html`<aleph-sketch
                sketchName=${sketch}
                .isPlaying=${sketch === this.selectedSketch}
                @click=${() => this.setSelectedSketch(sketch)}
              ></aleph-sketch>`
          )}
        </aleph-flex>
      </aleph-window>
    `;
  }
}

customElements.define("sketch-window", SketchWindow);

export default SketchWindow;
