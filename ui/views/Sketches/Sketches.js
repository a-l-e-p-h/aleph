import { LitElement, html } from "lit";
import { update, persistKey } from "@stoxy/core";
import { StoxyElement } from "@stoxy/element-mixin";
const { ipcRenderer } = require("electron");

import SketchWindowStyles from "./SketchWindowStyles";
import { mixBlendModes } from "./mixBlendModes";
import "../../components/Window/Window";
import "../../components/Flex/Flex";
import "../../components/Sketch/Sketch";
import "../../components/Button/Button";
import "../../components/Dropdown/Dropdown";
import "../../components/Control/Knob/Knob";

class SketchWindow extends StoxyElement(LitElement) {
  static get stoxyProperties() {
    return {
      key: "sketches",
      // init: true,
      state: {
        layers: [
          {
            index: 0,
            sketches: [],
            selectedSketch: () => {},
            isPlaying: true,
            isMuted: false,
            isSoloed: false,
            visibility: "visible",
            mixBlendMode: "normal",
            opacity: 100,
            type: "p5",
          },
          {
            index: 1,
            sketches: [],
            selectedSketch: () => {},
            isPlaying: true,
            isMuted: false,
            isSoloed: false,
            visibility: "visible",
            mixBlendMode: "normal",
            opacity: 100,
            type: "p5",
          },
          {
            index: 2,
            sketches: [],
            selectedSketch: "",
            isPlaying: true,
            isMuted: false,
            isSoloed: false,
            visibility: "visible",
            mixBlendMode: "normal",
            opacity: 100,
            type: "three",
          },
          {
            index: 3,
            sketches: [],
            selectedSketch: "",
            isPlaying: true,
            isMuted: false,
            isSoloed: false,
            visibility: "visible",
            mixBlendMode: "normal",
            opacity: 100,
            type: "three",
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
        layers.map((layer, idx) => {
          if (idx < 2) {
            return {
              ...layer,
              sketches: sketches.p5,
            };
          } else
            return {
              ...layer,
              sketches: sketches.three,
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
        `${targetLayer.type}-sketch-changed`,
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
      targetLayer.mixBlendMode = blendMode;
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
      JSON.stringify({
        layer: {
          ...updatedLayers[layerIndex],
          opacity: updatedLayers[layerIndex].opacity * 0.01,
        },
      })
    );
  }

  async muteLayer(layerIndex) {
    const {
      data: { layers: updatedLayers },
    } = await update("sketches.layers", (layers) => {
      const targetLayer = layers[layerIndex];

      targetLayer.isMuted
        ? (targetLayer.visibility = "visible")
        : (targetLayer.visibility = "hidden");

      targetLayer.isMuted = !targetLayer.isMuted;

      return layers;
    });

    ipcRenderer.send(
      "layer-muted",
      JSON.stringify({ layer: updatedLayers[layerIndex] })
    );
  }

  async soloLayer(layerIndex) {
    const {
      data: { layers: updatedLayers },
    } = await update("sketches.layers", (layers) => {
      const targetLayer = layers[layerIndex];

      // flip targetLayer's isSoloed/visibility
      targetLayer.isSoloed = !targetLayer.isSoloed;
      targetLayer.isSoloed ? (targetLayer.visibility = "visible") : null;

      const otherLayers = layers.filter((layer) => layer.index !== layerIndex);
      otherLayers.forEach((layer) => {
        // flip other layer's visibilities
        if (targetLayer.isSoloed) {
          layer.visibility = "hidden";
        } else if (!targetLayer.isSoloed && !layer.isMuted) {
          layer.visibility = "visible";
        }
        // de-solo any currently soloed layers
        if (layer.isSoloed) {
          layer.isSoloed = false;
        }
      });

      return layers;
    });

    ipcRenderer.send("layer-soloed", JSON.stringify({ layers: updatedLayers }));
  }

  render() {
    return html`
      <aleph-window title="sketches">
        <aleph-flex direction="row">
          ${this.layers.map(
            (layer) => html`
              <aleph-flex direction="column">
                <div class="layer-container">
                  <h3>layer ${layer.index + 1} (${layer.type})</h3>
                  <aleph-flex align="center">
                    <aleph-dropdown
                      label="blend mode"
                      .items=${this.mixBlendModes[layer.index]}
                      .callback=${this.updateBlendMode}
                      .selectedItem=${this.mixBlendModes[layer.index].find(
                        (mode) => mode.text === layer.mixBlendMode
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
                  <aleph-button
                    @click=${() => this.muteLayer(layer.index)}
                    .isActive=${layer.isMuted}
                    text="mute"
                  ></aleph-button>
                  <aleph-button
                    @click=${() => this.soloLayer(layer.index)}
                    .isActive=${layer.isSoloed}
                    text="solo"
                    >solo</aleph-button
                  >
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
