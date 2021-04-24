import { LitElement, html } from "lit-element";
import { update, persistKey } from "@stoxy/core";
import { StoxyElement } from "@stoxy/element-mixin";
const { ipcRenderer } = require("electron");

import SketchWindowStyles from "./SketchWindowStyles";
import { mixBlendModes } from "./mixBlendModes";
import "../../components/Window/Window";
import "../../components/Flex/Flex";
import "../../components/Sketch/Sketch";
import "../../components/Dropdown/Dropdown";
import "../../components/Control/Knob/Knob";

class SketchWindow extends StoxyElement(LitElement) {
  static get stoxyProperties() {
    return {
      key: "sketches",
      state: {
        layers: [
          {
            index: 0,
            sketches: [],
            selectedSketch: "",
            isPlaying: true,
            blendMode: "normal",
            opacity: 100,
          },
          {
            index: 1,
            sketches: [],
            selectedSketch: "",
            isPlaying: true,
            blendMode: "normal",
            opacity: 100,
          },
          {
            index: 2,
            sketches: [],
            selectedSketch: "",
            isPlaying: true,
            blendMode: "normal",
            opacity: 100,
          },
        ],
      },
    };
  }

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
    this.layers = [];
  }

  connectedCallback() {
    super.connectedCallback();
    persistKey("sketches");
    ipcRenderer.send("request-sketches");
    // initialize layers and blend modes
    ipcRenderer.once("sketch-list", (e, sketches) => {
      update("sketches.layers", (layers) =>
        layers.map((layer) => {
          return {
            ...layer,
            sketches,
          };
        })
      ).then(() => this.setupBlendModes());
    });
  }

  setupBlendModes() {
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
    update("sketches.layers", (layers) => {
      const targetLayer = layers[layerIndex];

      // if changing to new sketch
      if (targetLayer.selectedSketch !== sketchName) {
        targetLayer.selectedSketch = sketchName;
        targetLayer.isPlaying = true;
      }
      // if toggling play state
      else {
        targetLayer.isPlaying = !targetLayer.isPlaying;
      }
      ipcRenderer.send(
        "sketch-changed",
        JSON.stringify({ layer: layers[layerIndex], layerIndex })
      );
      return layers;
    });
  }

  isSketchPlaying(sketch, layer) {
    return sketch === layer.selectedSketch && layer.isPlaying ? true : false;
  }

  async updateBlendMode(layerIndex, blendMode) {
    const {
      data: { layers: updatedLayers },
    } = await update("sketches.layers", (layers) => {
      const targetLayer = layers[layerIndex];
      targetLayer.blendMode = blendMode;
      return layers;
    });

    ipcRenderer.send(
      "mix-blend-mode-updated",
      JSON.stringify({ layer: updatedLayers[layerIndex] })
    );
  }

  async updateOpacity(opacity, layerIndex) {
    const {
      data: { layers: updatedLayers },
    } = await update("sketches.layers", (layers) => {
      const targetLayer = layers[layerIndex];
      targetLayer.opacity = opacity;
      return layers;
    });

    ipcRenderer.send(
      "layer-opacity-updated",
      JSON.stringify({ layer: updatedLayers[layerIndex] })
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
                  <aleph-flex align="center">
                    <aleph-dropdown
                      label="blend mode"
                      .items=${this.mixBlendModes[layer.index]}
                      .callback=${this.updateBlendMode}
                      .selectedItem=${this.mixBlendModes[layer.index].find(
                        (mode) => mode.text === layer.blendMode
                      )}
                    ></aleph-dropdown>
                    <aleph-knob
                      label="opacity"
                      .minValue=${0}
                      .maxValue=${100}
                      .width=${40}
                      .height=${40}
                      .strokeWidth=${6}
                      value=${layer.opacity}
                      .callback=${this.updateOpacity}
                      .callbackArgs=${[layer.index]}
                    ></aleph-knob>
                  </aleph-flex>
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
