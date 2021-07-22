const { ipcRenderer } = require("electron");
const path = require("path");

class ThreeManager {
  constructor(canvas, index) {
    this.layer = index;
    this.camera = null;
    this.renderer = null;
    this.cameraParams = null;
    this.sketches = {};
    this.selectedSketch = null;
    this.canvas = canvas;
  }

  init() {
    this.loadSketches();
    this.setupRenderer(this.canvas);
    this.onSceneChange();
    this.cssListeners();
  }

  loadSketches() {
    ipcRenderer.send("request-sketches");

    ipcRenderer.once("sketch-list", (e, sketches) => {
      sketches.three.forEach((sketch) => {
        const sketchName = path.basename(sketch);
        this.sketches[sketchName] = require(sketch);
      });
      // check for cached layer data
      const layerCache = JSON.parse(localStorage.getItem(`layer${this.layer}`));

      if (layerCache && layerCache.isPlaying) {
        this.selectedSketch = this.selectScene(layerCache.selectedSketch);
      }
      // apply cached css properties
      if (layerCache) {
        this.canvas.style.mixBlendMode = layerCache.blendMode;
        // this.canvas.style.opacity = layerCache.opacity;
        this.canvas.style.visibility = layerCache.visibility;
      }
    });
  }

  setupRenderer(canvas) {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  onSceneChange() {
    ipcRenderer.on("three-sketch-changed", (e, sketchUpdate) => {
      const { layer, layerIndex: updateLayer } = JSON.parse(sketchUpdate);

      if (this.layer === updateLayer) {
        const newSketch = this.sketches[layer.selectedSketch];

        if (!layer.isPlaying) {
          this.stop();
          this.selectedSketch = null;
        } else if (this.selectedSketch !== newSketch) {
          this.selectScene(layer.selectedSketch);
        }
        localStorage.setItem(`layer${updateLayer}`, JSON.stringify(layer));
      }
    });
  }

  selectScene(sceneName) {
    if (this.sketches[sceneName]) {
      if (this.selectedSketch) this.stop();
      this.selectedSketch = new this.sketches[sceneName](
        this.renderer,
        this.camera
      );
      this.render();
    }
  }

  stop() {
    const scene = this.selectedSketch.scene;
    scene.remove.apply(scene, scene.children);
  }

  render() {
    this.selectedSketch.draw(this.renderer, this.camera);
  }

  updateCss(updateType, layerUpdate, currentLayer) {
    const layer =
      typeof layerUpdate === "string"
        ? JSON.parse(layerUpdate).layer
        : layerUpdate;

    if (layer.index === currentLayer) {
      this.canvas.style[updateType] = layer[updateType];
      localStorage.setItem(`layer${currentLayer}`, JSON.stringify(layer));
    }
  }

  cssListeners() {
    ipcRenderer.on("mix-blend-mode-updated", (_, serializedLayer) => {
      this.updateCss("mixBlendMode", serializedLayer, this.layer);
    });

    ipcRenderer.on("layer-opacity-updated", (_, serializedLayer) => {
      this.updateCss("opacity", serializedLayer, this.layer);
    });

    ipcRenderer.on("layer-muted", (_, serializedLayer) => {
      this.updateCss("visibility", serializedLayer, this.layer);
    });

    ipcRenderer.on("layer-soloed", (_, serializedLayers) => {
      const { layers } = JSON.parse(serializedLayers);

      layers.forEach((layer) =>
        this.updateCss("visibility", layer, this.layer)
      );
    });
  }
}

const threeCanvases = document.querySelectorAll(".three-canvas");

threeCanvases.forEach((canvas, index) => {
  // offset index by 2 (the two p5 canvases)
  const three = new ThreeManager(canvas, index + 2);
  three.init();
});
