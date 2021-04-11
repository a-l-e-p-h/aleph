import { LitElement, html } from "lit-element";
const { ipcRenderer } = require("electron");

import SketchWindowStyles from "./SketchWindowStyles";
import "../../components/Window/Window";
import "../../components/Flex/Flex";
import "../../components/Sketch/Sketch";

class SketchWindow extends LitElement {
  static get properties() {
    return {
      layers: { type: Array },
    };
  }

  static get styles() {
    return SketchWindowStyles;
  }

  constructor() {
    super();
    this.layers = [
      {
        index: 0,
        sketches: [],
        selectedSketch: null,
      },
      {
        index: 1,
        sketches: [],
        selectedSketch: null,
      },
      {
        index: 2,
        sketches: [],
        selectedSketch: null,
      },
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    ipcRenderer.send("request-sketches");
    ipcRenderer.once("sketch-list", (e, sketches) => {
      this.layers = this.layers.map((layer) => {
        return {
          ...layer,
          sketches,
        };
      });
    });

    this.layers.forEach((layer, idx) => {
      const lastSketch = localStorage.getItem(`lastSketch${idx}`);
      if (lastSketch) this.layers[idx].selectedSketch = lastSketch;
    });
  }

  setSelectedSketch(sketchName, layerIndex) {
    this.layers[layerIndex].selectedSketch = sketchName;
    console.log(this.layers);
    ipcRenderer.send("sketch-changed", JSON.stringify(this.layers));
  }

  render() {
    return html`
      <aleph-window title="sketches">
        <aleph-flex direction="row">
          ${this.layers.map(
            (layer) => html`
              <aleph-flex direction="column">
                <div class="layer-container">
                  <h3>layer ${layer.index + 1}</h3>
                </div>
                ${layer.sketches.map(
                  (sketch) => html`
                    <aleph-sketch
                      sketchName=${sketch}
                      .isPlaying=${sketch === layer.selectedSketch}
                      @click=${() =>
                        this.setSelectedSketch(sketch, layer.index)}
                    ></aleph-sketch>
                  `
                )}
              </aleph-flex>
            `
          )}
        </aleph-flex>
      </aleph-window>
    `;
  }
}

customElements.define("sketch-window", SketchWindow);

export default SketchWindow;
