import { LitElement, html } from "lit-element";
const { ipcRenderer } = require("electron");

import SketchWindowStyles from "./SketchWindowStyles";
import { mixBlendModes } from "./mixBlendModes";
import "../../components/Window/Window";
import "../../components/Flex/Flex";
import "../../components/Sketch/Sketch";
import "../../components/Dropdown/Dropdown";

class SketchWindow extends LitElement {
  static get properties() {
    return {
      layers: { type: Array },
      mixBlendModes: { type: Array },
    };
  }

  static get styles() {
    return SketchWindowStyles;
  }

  constructor() {
    super();
    this.mixBlendModes = mixBlendModes;
    this.layers = [
      {
        index: 0,
        sketches: [],
        selectedSketch: null,
        isPlaying: true,
        blendMode: "normal",
      },
      {
        index: 1,
        sketches: [],
        selectedSketch: null,
        isPlaying: true,
        blendMode: "normal",
      },
      {
        index: 2,
        sketches: [],
        selectedSketch: null,
        isPlaying: true,
        blendMode: "normal",
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

    this.layers.forEach((_, idx) => {
      const lastSketch = JSON.parse(localStorage.getItem(`lastSketch${idx}`));
      if (lastSketch) {
        this.layers[idx].selectedSketch = lastSketch.sketch;
        this.layers[idx].isPlaying = lastSketch.isPlaying;
      }
    });

    // build up blendMode array per-layer
    this.mixBlendModes = this.layers.map((_, idx) => {
      return mixBlendModes.map((blendMode) => {
        return {
          key: idx,
          text: blendMode,
        };
      });
    });
  }

  setSelectedSketch(sketchName, layerIndex) {
    const layer = this.layers[layerIndex];
    // if changing to a new sketch
    if (layer.selectedSketch !== sketchName) {
      layer.selectedSketch = sketchName;
      layer.isPlaying = true;
    }
    // if toggling play state
    else {
      layer.isPlaying = !layer.isPlaying;
    }
    // update
    this.layers = [...this.layers];
    ipcRenderer.send("sketch-changed", JSON.stringify(this.layers));
  }

  isSketchPlaying(sketch, layer) {
    return sketch === layer.selectedSketch && layer.isPlaying ? true : false;
  }

  updateBlendMode(layerIndex, blendMode, layers) {
    // update layer
    const layer = layers[layerIndex];
    layer.blendMode = blendMode;
    layers = [...layers];
    // ipc to displayWindow
    ipcRenderer.send(
      "mix-blend-mode-updated",
      JSON.stringify({ layer: layerIndex, blendMode })
    );
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
                  <aleph-dropdown
                    .items=${this.mixBlendModes[layer.index]}
                    .callback=${this.updateBlendMode}
                    .callbackArgs=${this.layers}
                    .selectedItem=${this.mixBlendModes[layer.index].find(
                      (mode) => mode.text === layer.blendMode
                    )}
                  ></aleph-dropdown>
                </div>
                ${layer.sketches.map(
                  (sketch) => html`
                    <aleph-sketch
                      sketchName=${sketch}
                      .isPlaying=${this.isSketchPlaying(sketch, layer)}
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
