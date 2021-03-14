import { LitElement, html } from "lit-element";
const { ipcRenderer } = require("electron");

import "../../components/Window/Window";
import "../../components/Flex/Flex";
import "../../components/Sketch/Sketch";

class SketchWindow extends LitElement {
  static get properties() {
    return {
      sketches: { type: Array },
    };
  }

  constructor() {
    super();
    this.sketches = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.sketches = JSON.parse(localStorage.getItem("sketches")) || [];

    ipcRenderer.on("sketch-list", (event, sketchList) => {
      this.sketches = sketchList;
      localStorage.setItem("sketches", JSON.stringify(sketchList));
    });
  }

  render() {
    return html`
      <aleph-window title="sketches">
        <aleph-flex>
          ${this.sketches.map(
            (sketch) => html`<aleph-sketch sketchName=${sketch}></aleph-sketch>`
          )}
        </aleph-flex>
      </aleph-window>
    `;
  }
}

customElements.define("sketch-window", SketchWindow);

export default SketchWindow;
